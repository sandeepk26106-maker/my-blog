// @ts-check
const { test, expect, goto, logoutAndOpenAuth } = require('./fixtures');

const HOME = '/index.html';
const ARTICLE = '/post.html?slug=react-hooks-cheat-sheet';

test.describe('Content data', () => {
  test('C01 - all 10 articles are loaded', async ({ page }) => {
    await goto(page, HOME);
    const posts = await page.evaluate(() => window.BLOG_POSTS || []);
    expect(posts).toHaveLength(10);
  });

  test('C02 - slugs are unique and kebab-case', async ({ page }) => {
    await goto(page, HOME);
    const slugs = await page.evaluate(() => (window.BLOG_POSTS || []).map((p) => p.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  test('C03 - every article has the required fields', async ({ page }) => {
    await goto(page, HOME);
    const missing = await page.evaluate(() =>
      (window.BLOG_POSTS || [])
        .filter((p) =>
          !p.id || !p.slug || !p.title || !p.excerpt || !p.author || !p.date ||
          !p.category || !p.readTime || !p.cover || !p.body
        )
        .map((p) => p.slug)
    );
    expect(missing).toEqual([]);
  });

  test('C04 - every article body is long-form with several sections', async ({ page }) => {
    await goto(page, HOME);
    const stats = await page.evaluate(() =>
      (window.BLOG_POSTS || []).map((p) => ({
        slug: p.slug,
        words: p.body.split(/\s+/).length,
        h2: (p.body.match(/<h2>/g) || []).length,
      }))
    );
    for (const s of stats) {
      expect(s.words, s.slug).toBeGreaterThan(500);
      expect(s.h2, s.slug).toBeGreaterThan(4);
    }
  });
});

test.describe('Homepage cards', () => {
  test.beforeEach(async ({ page }) => {
    await goto(page, HOME);
    await page.waitForSelector('[data-testid="post-card"]');
  });

  test('L01 - 10 cards render', async ({ page }) => {
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
  });

  test('L02 - cards show read time and author', async ({ page }) => {
    await expect(page.locator('[data-testid="post-card"] .meta').first()).toContainText('min read');
  });

  test('L03 - every card links to the reader page', async ({ page }) => {
    const hrefs = await page.locator('[data-testid="post-card"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('href'))
    );
    expect(hrefs).toHaveLength(10);
    for (const href of hrefs) expect(href).toMatch(/^post\.html\?slug=/);
  });
});

test.describe('Reader page', () => {
  test('R01 - clicking a card opens the matching article', async ({ page }) => {
    await goto(page, HOME);
    await page.waitForSelector('[data-testid="post-card"]');
    await page.locator('[data-testid="post-card"]').first().click();
    await page.waitForURL('**/post.html?slug=*');
    await expect(page.locator('.post-head h1')).toBeVisible();
  });

  test('R02 - the article title matches the data', async ({ page }) => {
    await goto(page, ARTICLE);
    const title = await page.evaluate(() => window.BLOG_POSTS.find((p) => p.slug === 'react-hooks-cheat-sheet').title);
    await expect(page.locator('.post-head h1')).toHaveText(title);
  });

  test('R03 - author, date and read time are shown', async ({ page }) => {
    await goto(page, ARTICLE);
    const meta = page.locator('.post-meta');
    await expect(meta).toContainText('Kabir Nair');
    await expect(meta).toContainText('2026-10-02');
    await expect(meta).toContainText('min read');
  });

  test('R04 - the cover image is visible with alt text', async ({ page }) => {
    await goto(page, ARTICLE);
    const img = page.locator('.post-cover img');
    await expect(img).toBeVisible();
    const alt = await img.getAttribute('alt');
    expect(alt && alt.length).toBeTruthy();
  });

  test('R05 - the article body renders all its sections', async ({ page }) => {
    await goto(page, ARTICLE);
    await expect(page.locator('.prose h2')).toHaveCount(12);
    await expect(page.locator('.prose p').first()).toBeVisible();
  });

  test('R06 - code blocks render as preformatted code', async ({ page }) => {
    await goto(page, ARTICLE);
    const blocks = page.locator('.prose pre');
    expect(await blocks.count()).toBeGreaterThan(5);
    await expect(blocks.first()).toBeVisible();
  });

  test('R07 - tables render with header cells', async ({ page }) => {
    await goto(page, ARTICLE);
    await expect(page.locator('.prose table')).toHaveCount(1);
    await expect(page.locator('.prose th')).toHaveCount(3);
  });

  test('R08 - the document title follows the article', async ({ page }) => {
    await goto(page, ARTICLE);
    await expect(page).toHaveTitle('React Hooks Cheat Sheet — MyBlog');
  });

  test('R09 - the meta description follows the article', async ({ page }) => {
    await goto(page, ARTICLE);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toContain('useState');
  });
});

test.describe('Table of contents', () => {
  test.beforeEach(async ({ page }) => {
    await goto(page, ARTICLE);
  });

  test('T01 - the table of contents is visible', async ({ page }) => {
    await expect(page.locator('.toc summary')).toContainText('On this page');
  });

  test('T02 - one entry per H2 section', async ({ page }) => {
    const items = await page.locator('.toc li').count();
    const h2 = await page.locator('.prose h2').count();
    expect(items).toBe(h2);
  });

  test('T03 - clicking an entry jumps to that section', async ({ page }) => {
    await page.locator('.toc li a').nth(2).click();
    await page.waitForTimeout(600);
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toMatch(/^#sec-/);
  });

  test('T04 - the table of contents collapses', async ({ page }) => {
    await page.locator('.toc summary').click();
    await expect(page.locator('.toc')).not.toHaveAttribute('open', '');
  });
});

test.describe('Reader navigation', () => {
  test('N01 - back link returns to the posts grid', async ({ page }) => {
    await goto(page, ARTICLE);
    await page.locator('.post-nav').getByRole('link', { name: 'All posts' }).click();
    await page.waitForURL(/\/index\.html/);
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
  });

  test('N02 - the newsletter link jumps to the newsletter section', async ({ page }) => {
    await goto(page, ARTICLE);
    await page.locator('.post-nav').getByRole('link', { name: 'Subscribe to newsletter' }).click();
    await page.waitForURL(/\/index\.html/);
    await expect(page.locator('#newsletter')).toBeVisible();
    expect(page.url()).toContain('#newsletter');
  });

  test('N03 - three related posts are shown', async ({ page }) => {
    await goto(page, ARTICLE);
    await expect(page.locator('.related .card')).toHaveCount(3);
  });

  test('N04 - a related card opens another article', async ({ page }) => {
    await goto(page, ARTICLE);
    await page.locator('.related .card').first().click();
    await page.waitForURL('**/post.html?slug=*');
    await expect(page.locator('.post-head h1')).toBeVisible();
  });
});

test.describe('Edge cases', () => {
  test('E01 - an unknown slug shows the not-found state', async ({ page }) => {
    await goto(page, '/post.html?slug=does-not-exist');
    await expect(page.getByRole('heading', { name: 'Post not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← All posts' })).toBeVisible();
  });

  test('E02 - no slug at all shows the not-found state', async ({ page }) => {
    await goto(page, '/post.html');
    await expect(page.getByRole('heading', { name: 'Post not found' })).toBeVisible();
  });

  test('E03 - a direct article URL renders fully', async ({ page }) => {
    await goto(page, ARTICLE);
    await expect(page.locator('.prose h2').first()).toBeVisible();
    await expect(page.locator('.related .card')).toHaveCount(3);
  });
});
