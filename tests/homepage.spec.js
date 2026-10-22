// @ts-check
const { test, expect, goto, logoutAndOpenAuth } = require('./fixtures');

const PAGE = '/index.html';

test.beforeEach(async ({ page }) => {
  await goto(page, PAGE);
  await page.waitForSelector('[data-testid="post-card"]');
});

test.describe('Header', () => {
  test('H01 - logo/brand is visible in the header', async ({ page }) => {
    await expect(page.locator('.header').getByRole('link', { name: 'MyBlog', exact: true })).toBeVisible();
  });

  test('H02 - navigation links are visible', async ({ page, viewport }) => {
    test.skip(viewport.width < 900, 'the nav is collapsed below 900px');
    const nav = page.locator('.header .nav');
    for (const label of ['Home', 'Blog', 'About']) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
  });

  test('H03 - navigation links point to valid targets', async ({ page }) => {
    const hrefs = await page.locator('.header .nav a').evaluateAll((els) =>
      els.map((e) => e.getAttribute('href'))
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      expect(href).toMatch(/^(#|index\.html|about\/)/);
    }
  });

  test('H04 - search icon is present', async ({ page }) => {
    await expect(page.locator('.header button[title="Search posts"]')).toBeVisible();
  });

  test('H05 - search input opens and accepts text', async ({ page }) => {
    await page.locator('.header button[title="Search posts"]').click();
    const input = page.getByPlaceholder('Search posts…');
    await expect(input).toBeVisible();
    await input.fill('react');
    await expect(input).toHaveValue('react');
  });

  test('H06 - subscribe CTA scrolls to the newsletter section', async ({ page }) => {
    await page.locator('.header').getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.locator('#newsletter')).toBeInViewport();
  });

  test('H07 - header is sticky', async ({ page }) => {
    const position = await page.locator('.header').evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('sticky');
  });

  test('H08 - theme toggle switches to dark and persists', async ({ page }) => {
    await page.locator('.header button[title="Toggle theme"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload(); await page.waitForSelector('#root > *', { timeout: 20000 });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('H09 - signed-out header shows a login link', async ({ page }) => {
    const link = page.locator('.header a[href="auth/auth.html"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveText('Login');
  });

  test('H10 - signed-in header greets the user', async ({ page }) => {
    await goto(page, '/auth/auth.html');
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Evidence User');
    await page.getByLabel('Email').fill(`e${Date.now()}@example.com`);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');

    await goto(page, PAGE);
    const greeting = page.locator('.header a[href="auth/dashboard.html"]');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText(/Hi,/);
  });
});

test.describe('Post grid', () => {
  test('L01 - exactly 10 post cards render', async ({ page }) => {
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
  });

  test('L02 - each card shows cover, category, title, excerpt, author, date and read time', async ({ page }) => {
    const card = page.locator('[data-testid="post-card"]').first();
    await expect(card.locator('img')).toBeVisible();
    await expect(card.locator('.cat')).toBeVisible();
    await expect(card.locator('h3')).toBeVisible();
    await expect(card.locator('p')).toBeVisible();
    await expect(card.locator('.meta')).toContainText('min read');
  });

  test('L03 - cover images have alt text', async ({ page }) => {
    const alts = await page.locator('[data-testid="post-card"] img').evaluateAll((els) =>
      els.map((e) => e.getAttribute('alt'))
    );
    expect(alts).toHaveLength(10);
    for (const alt of alts) expect(alt && alt.length).toBeTruthy();
  });

  test('L04 - search filters the grid by title', async ({ page }) => {
    await page.locator('.header button[title="Search posts"]').click();
    await page.getByPlaceholder('Search posts…').fill('React');
    const cards = page.locator('[data-testid="post-card"]');
    await expect(cards).toHaveCount(3);
    await expect(cards.first().locator('h3')).toContainText('React');
  });

  test('L05 - search filters by category', async ({ page }) => {
    await page.locator('.header button[title="Search posts"]').click();
    await page.getByPlaceholder('Search posts…').fill('DevOps');
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(2);
  });

  test('L06 - empty state shows when nothing matches', async ({ page }) => {
    await page.locator('.header button[title="Search posts"]').click();
    await page.getByPlaceholder('Search posts…').fill('zzzzz');
    await expect(page.getByText('No posts match your search.')).toBeVisible();
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(0);
  });

  test('L07 - clearing the search restores all 10 cards', async ({ page }) => {
    await page.locator('.header button[title="Search posts"]').click();
    const input = page.getByPlaceholder('Search posts…');
    await input.fill('zzz');
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(0);
    await input.fill('');
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
  });
});

test.describe('Newsletter', () => {
  test('N01 - newsletter section is visible with input and button', async ({ page }) => {
    const section = page.locator('#newsletter');
    await expect(section).toBeVisible();
    await expect(section.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(section.getByRole('button', { name: 'Subscribe' })).toBeVisible();
  });

  test('N02 - valid email shows a success message', async ({ page }) => {
    const section = page.locator('#newsletter');
    await section.getByPlaceholder('you@example.com').fill('reader@example.com');
    await section.getByRole('button', { name: 'Subscribe' }).click();
    await expect(section.getByText('Subscribed successfully!')).toBeVisible();
  });

  test('N03 - invalid email shows an error message', async ({ page }) => {
    const section = page.locator('#newsletter');
    await section.getByPlaceholder('you@example.com').fill('not-an-email');
    await section.getByRole('button', { name: 'Subscribe' }).click();
    await expect(section.getByText('Enter a valid email address.')).toBeVisible();
  });
});

test.describe('About section', () => {
  test('A01 - about section renders below the posts', async ({ page }) => {
    const about = page.locator('.about');
    await expect(about).toBeVisible();
    await expect(about.getByRole('heading', { name: 'About MyBlog' })).toBeVisible();
  });

  test('A02 - stats show 4 tiles', async ({ page }) => {
    const stats = page.locator('.about .stat');
    await expect(stats).toHaveCount(4);
    await expect(stats.first()).toContainText('10');
  });

  test('A03 - 7 topic chips are listed', async ({ page }) => {
    await expect(page.locator('.about .chip')).toHaveCount(7);
  });

  test('A04 - 5 author cards are listed', async ({ page }) => {
    const authors = page.locator('.about .author-card');
    await expect(authors).toHaveCount(5);
    await expect(authors.first().locator('.avatar')).toBeVisible();
  });

  test('A05 - contact card shows owner, phone, address and pin code', async ({ page }) => {
    const card = page.locator('.about .contact-card');
    await expect(card.locator('.contact-owner')).toHaveText('HIGH BLOGGING');
    await expect(card.getByText('6306260243')).toBeVisible();
    await expect(card.getByText('Ghurwara Raebareli (UP)')).toBeVisible();
    await expect(card.getByText('229125')).toBeVisible();
  });

  test('A06 - phone is a clickable tel link', async ({ page }) => {
    const phone = page.locator('.about .contact-card a[href^="tel:"]');
    await expect(phone).toHaveAttribute('href', 'tel:+916306260243');
  });

  test('A07 - about page CTA opens the about page', async ({ page }) => {
    await page.locator('.about').getByRole('link', { name: /Full about page/ }).click();
    await page.waitForURL('**/about/about.html');
    await expect(page.getByRole('heading', { name: 'About MyBlog' })).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('F01 - footer is visible with link columns', async ({ page }) => {
    await page.locator('.footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.footer').getByRole('link', { name: 'Full about page' })).toBeVisible();
  });

  test('F02 - copyright mentions the owner', async ({ page }) => {
    await page.locator('.footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.footer')).toContainText('© 2026 HIGH BLOGGING. All rights reserved.');
  });

  test('F03 - footer shows contact details', async ({ page }) => {
    const footer = page.locator('.footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByText('6306260243')).toBeVisible();
    await expect(footer.getByText('Ghurwara Raebareli (UP)')).toBeVisible();
    await expect(footer.getByText('229125')).toBeVisible();
  });

  test('F04 - footer login link opens the auth page', async ({ page }) => {
    await page.locator('.footer').getByRole('link', { name: 'Login / Sign up' }).click();
    await page.waitForURL('**/auth/auth.html');
    await expect(page.getByRole('tab', { name: 'Login' })).toBeVisible();
  });
});

test.describe('Responsive', () => {
  test('R01 - mobile shows a single column and no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.locator('[data-testid="post-card"]').first()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
    const cols = await page.locator('.grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(' ')).toHaveLength(1);
  });

  test('R02 - tablet shows two columns', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    const cols = await page.locator('.grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(' ')).toHaveLength(2);
  });

  test('R03 - desktop shows three columns', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const cols = await page.locator('.grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(' ')).toHaveLength(3);
  });

  test('R04 - the nav is collapsed on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.locator('.header .nav')).toBeHidden();
    await expect(page.locator('.header .logo')).toBeVisible();
  });
});
