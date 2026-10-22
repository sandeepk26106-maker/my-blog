// @ts-check
const { test, expect, goto, logoutAndOpenAuth } = require('./fixtures');

const HOME = '/index.html';
const ABOUT = '/about/about.html';

test.describe('Contact details', () => {
  test('C01 - the owner name is shown on the homepage', async ({ page }) => {
    await goto(page, HOME);
    await expect(page.locator('.about .contact-owner')).toHaveText('HIGH BLOGGING');
  });

  test('C02 - the phone number is visible', async ({ page }) => {
    await goto(page, ABOUT);
    await expect(page.locator('.contact-card').getByText('6306260243')).toBeVisible();
  });

  test('C03 - the phone number is a tel link', async ({ page }) => {
    await goto(page, ABOUT);
    await expect(page.locator('.contact-card a[href^="tel:"]')).toHaveAttribute('href', 'tel:+916306260243');
  });

  test('C04 - the address is shown', async ({ page }) => {
    await goto(page, ABOUT);
    await expect(page.locator('.contact-card').getByText('Ghurwara Raebareli (UP)')).toBeVisible();
  });

  test('C05 - the pin code is shown', async ({ page }) => {
    await goto(page, ABOUT);
    await expect(page.locator('.contact-card').getByText('229125')).toBeVisible();
  });

  test('C06 - the same details appear in the footer of every page', async ({ page }) => {
    for (const path of [HOME, ABOUT, '/post.html?slug=css-grid-in-10-minutes']) {
      await goto(page, path);
      const footer = page.locator('.footer');
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toContainText('HIGH BLOGGING');
      await expect(footer).toContainText('6306260243');
      await expect(footer).toContainText('Ghurwara Raebareli (UP)');
      await expect(footer).toContainText('229125');
    }
  });
});

test.describe('Homepage about section', () => {
  test.beforeEach(async ({ page }) => {
    await goto(page, HOME);
    await page.locator('.about').scrollIntoViewIfNeeded();
  });

  test('A01 - the about section shows heading and mission', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About MyBlog' })).toBeVisible();
    await expect(page.locator('.about')).toContainText('Mission');
  });

  test('A02 - four stat tiles are shown', async ({ page }) => {
    await expect(page.locator('.about .stat')).toHaveCount(4);
  });

  test('A03 - seven topic chips are shown', async ({ page }) => {
    await expect(page.locator('.about .chip')).toHaveCount(7);
  });

  test('A04 - five author cards are shown', async ({ page }) => {
    await expect(page.locator('.about .author-card')).toHaveCount(5);
  });

  test('A05 - the contact card lists all contact rows', async ({ page }) => {
    const card = page.locator('.about .contact-card');
    await expect(card.locator('.contact-row')).toHaveCount(4);
  });

  test('A06 - the about page CTA opens the about page', async ({ page }) => {
    await page.locator('.about').getByRole('link', { name: /Full about page/ }).click();
    await page.waitForURL('**/about/about.html');
    await expect(page.getByRole('heading', { name: 'About MyBlog' })).toBeVisible();
  });
});

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await goto(page, ABOUT);
  });

  test('B01 - the about page renders its hero', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About MyBlog' })).toBeVisible();
    await expect(page.locator('.about-hero')).toContainText('HIGH BLOGGING');
  });

  test('B02 - the who-we-are section explains the mission', async ({ page }) => {
    const block = page.locator('.about-block').first();
    await expect(block.getByRole('heading', { name: 'Who we are' })).toBeVisible();
    await expect(block).toContainText('mission');
  });

  test('B03 - every topic is explained in a bullet list', async ({ page }) => {
    const bullets = page.locator('.about-block ul li');
    expect(await bullets.count()).toBeGreaterThanOrEqual(7);
  });

  test('B04 - the stats block is present', async ({ page }) => {
    await expect(page.locator('.about-block .stat')).toHaveCount(4);
  });

  test('B05 - all five authors are listed', async ({ page }) => {
    await expect(page.locator('.about-block .author-card')).toHaveCount(5);
  });

  test('B06 - the contact card shows four rows and a form', async ({ page }) => {
    await expect(page.locator('.contact-card .contact-row')).toHaveCount(4);
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
  });

  test('B07 - the contact form rejects a short name', async ({ page }) => {
    await page.getByLabel('Name').fill('A');
    await page.getByLabel('Email').fill('a@b.com');
    await page.getByLabel('Message').fill('Hello there, this is a long enough message.');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText('Enter your name.')).toBeVisible();
  });

  test('B08 - the contact form rejects an invalid email', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('nope');
    await page.getByLabel('Message').fill('Hello there, this is a long enough message.');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  });

  test('B09 - the contact form rejects a short message', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('a@b.com');
    await page.getByLabel('Message').fill('hi');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText(/Message thoda detail me likho/)).toBeVisible();
  });

  test('B10 - a valid contact form submission shows a success message', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('tester@example.com');
    await page.getByLabel('Message').fill('Hello there, this is a long enough message.');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText(/Thanks! Message mil gaya/)).toBeVisible();
    await expect(page.getByLabel('Name')).toHaveValue('');
  });
});

test.describe('Navigation', () => {
  test('N01 - the post reader links to the about page', async ({ page }) => {
    await goto(page, '/post.html?slug=css-grid-in-10-minutes');
    await page.locator('.footer').getByRole('link', { name: 'Full about page' }).click();
    await page.waitForURL('**/about/about.html');
  });

  test('N02 - the dashboard links to the about page', async ({ page }) => {
    await goto(page, '/auth/dashboard.html');
    await page.waitForURL('**/auth/auth.html');
    await page.locator('.header').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForURL('**/about/about.html');
  });

  test('N03 - the auth page links to the about page', async ({ page }) => {
    await goto(page, '/auth/auth.html');
    await page.locator('.header').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForURL('**/about/about.html');
  });

  test('N04 - the about page links back to the homepage', async ({ page }) => {
    await goto(page, ABOUT);
    await page.locator('.header').getByRole('link', { name: 'MyBlog', exact: true }).click();
    await page.waitForURL(/\/index\.html/);
  });

  test('N05 - the about page links to the latest articles', async ({ page }) => {
    await goto(page, ABOUT);
    await page.getByRole('link', { name: /Latest articles padhein/ }).click();
    await page.waitForURL(/\/index\.html/);
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
  });
});

test.describe('Theme and responsive', () => {
  test('T01 - the about page supports dark mode', async ({ page }) => {
    await goto(page, ABOUT);
    await page.locator('.header button[title="Toggle theme"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('.contact-card')).toBeVisible();
  });

  test('T02 - the theme survives a reload', async ({ page }) => {
    await goto(page, ABOUT);
    await page.locator('.header button[title="Toggle theme"]').click();
    await page.reload(); await page.waitForSelector('#root > *', { timeout: 20000 });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('R01 - mobile stacks the stats in two columns without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await goto(page, ABOUT);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
    const cols = await page.locator('.stat-grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(' ')).toHaveLength(2);
  });

  test('R02 - desktop shows four stat columns', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await goto(page, ABOUT);
    const cols = await page.locator('.stat-grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(' ')).toHaveLength(4);
  });
});
