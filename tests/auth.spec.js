// @ts-check
const { test, expect, goto, logoutAndOpenAuth } = require('./fixtures');

const AUTH = '/auth/auth.html';
const DASH = '/auth/dashboard.html';

test.describe('Auth page — tabs', () => {
  test('A01 - auth page renders both tabs', async ({ page }) => {
    await goto(page, AUTH);
    await expect(page.getByRole('tab', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Sign up' })).toBeVisible();
  });

  test('A02 - login tab is active by default', async ({ page }) => {
    await goto(page, AUTH);
    await expect(page.getByRole('tab', { name: 'Login' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('A03 - switching to sign up shows the signup fields', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Confirm password')).toBeVisible();
  });

  test('A04 - switching tabs clears the error message', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByLabel('Email').fill('bad');
    await page.getByLabel('Password', { exact: true }).fill('x');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.msg-err')).toBeVisible();
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await expect(page.locator('.msg-err')).toHaveCount(0);
  });

  test('A05 - cross-link opens the sign up tab', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByRole('button', { name: 'Create an account' }).click();
    await expect(page.getByRole('tab', { name: 'Sign up' })).toHaveAttribute('aria-selected', 'true');
  });

  test('A06 - cross-link returns to the login tab', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page.getByRole('tab', { name: 'Login' })).toHaveAttribute('aria-selected', 'true');
  });

  test('A07 - back to home link returns to the homepage', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByRole('link', { name: '← Back to home' }).click();
    await page.waitForURL('**/index.html');
    await expect(page.getByRole('heading', { name: 'Welcome to MyBlog' })).toBeVisible();
  });
});

test.describe('Signup validation', () => {
  test.beforeEach(async ({ page }) => {
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
  });

  test('S01 - empty name is rejected', async ({ page }) => {
    await page.getByLabel('Email').fill('a@b.com');
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Enter your name (at least 2 characters).')).toBeVisible();
  });

  test('S02 - invalid email is rejected', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  });

  test('S03 - short password is rejected', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('a@b.com');
    await page.getByLabel('Password', { exact: true }).fill('123');
    await page.getByLabel('Confirm password').fill('123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Password must be at least 6 characters.')).toBeVisible();
  });

  test('S04 - mismatched passwords are rejected', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('a@b.com');
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret999');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
  });

  test('S05 - valid signup succeeds and redirects to the dashboard', async ({ page }) => {
    const email = `signup${Date.now()}@example.com`;
    await page.getByLabel('Name').fill('Evidence User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Account created! Redirecting…')).toBeVisible();
    await page.waitForURL('**/auth/dashboard.html');
  });

  test('S06 - the new user is stored', async ({ page }) => {
    const email = `stored${Date.now()}@example.com`;
    await page.getByLabel('Name').fill('Store User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');
    const users = await page.evaluate(() => JSON.parse(localStorage.getItem('myblog_users') || '[]'));
    expect(users.some((u) => u.email === email)).toBeTruthy();
  });

  test('S07 - duplicate email is blocked', async ({ page }) => {
    const email = `dup${Date.now()}@example.com`;
    for (let i = 0; i < 2; i++) {
      await logoutAndOpenAuth(page, AUTH);
      await page.getByRole('tab', { name: 'Sign up' }).click();
      await page.getByLabel('Name').fill('Dup User');
      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password', { exact: true }).fill('secret123');
      await page.getByLabel('Confirm password').fill('secret123');
      await page.getByRole('button', { name: 'Sign up' }).click();
      if (i === 0) await page.waitForURL('**/auth/dashboard.html');
    }
    await logoutAndOpenAuth(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Dup User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('An account with this email already exists.')).toBeVisible();
  });

  test('S08 - signup logs the user in automatically', async ({ page }) => {
    const email = `auto${Date.now()}@example.com`;
    await page.getByLabel('Name').fill('Auto User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');
    const session = await page.evaluate(() => JSON.parse(localStorage.getItem('myblog_session') || 'null'));
    expect(session).toBeTruthy();
    expect(session.email).toBe(email);
  });
});

test.describe('Login', () => {
  test('L01 - invalid email is rejected', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByLabel('Email').fill('nope');
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  });

  test('L02 - empty password is rejected', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByLabel('Email').fill('someone@example.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Enter your password.')).toBeVisible();
  });

  test('L03 - wrong password is rejected', async ({ page }) => {
    const email = `wrong${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Wrong User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');

    await logoutAndOpenAuth(page, AUTH);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('wrongpass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid email or password.')).toBeVisible();
  });

  test('L04 - unknown user is rejected', async ({ page }) => {
    await goto(page, AUTH);
    await page.getByLabel('Email').fill(`ghost${Date.now()}@example.com`);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid email or password.')).toBeVisible();
  });

  test('L05 - valid login opens the dashboard', async ({ page }) => {
    const email = `login${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Login User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');

    await logoutAndOpenAuth(page, AUTH);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Signed in successfully!')).toBeVisible();
    await page.waitForURL('**/auth/dashboard.html');
  });

  test('L06 - session is stored after login', async ({ page }) => {
    const email = `session${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Session User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');
    const session = await page.evaluate(() => JSON.parse(localStorage.getItem('myblog_session') || 'null'));
    expect(session).toBeTruthy();
    expect(session.userId).toBeTruthy();
    expect(session.loginAt).toBeTruthy();
  });

  test('L07 - already signed-in users see a notice', async ({ page }) => {
    const email = `notice${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Notice User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');

    await goto(page, AUTH);
    await expect(page.getByText(/You are already signed in as/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Go to dashboard' })).toBeVisible();
  });
});

test.describe('Dashboard (protected)', () => {
  test('D01 - anonymous visitors are redirected to the auth page', async ({ page }) => {
    await goto(page, DASH);
    await page.waitForURL('**/auth/auth.html');
    await expect(page.getByRole('tab', { name: 'Login' })).toBeVisible();
  });

  test('D02 - dashboard greets the signed-in user', async ({ page }) => {
    const email = `dash${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Dash User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');
    await expect(page.getByRole('heading', { name: /Welcome, Dash User/ })).toBeVisible();
  });

  test('D03 - profile rows show name, email, sign-in time and saved posts', async ({ page }) => {
    const email = `prof${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Prof User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');
    const rows = page.locator('.dash-row');
    await expect(rows).toHaveCount(4);
    await expect(page.locator('.dash-card').first()).toContainText(email);
    await expect(page.locator('.dash-card').first()).toContainText('Saved posts');
  });

  test('D04 - quick action opens the latest posts', async ({ page }) => {
    const email = `quick${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Quick User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');
    await page.getByRole('link', { name: 'Read latest posts' }).click();
    await page.waitForURL(/\/index\.html/);
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
  });

  test('D05 - logout clears the session and returns home', async ({ page }) => {
    const email = `out${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Out User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');

    await page.locator('.dash-card').getByRole('button', { name: 'Log out' }).click();
    await page.waitForURL('**/index.html');
    const session = await page.evaluate(() => localStorage.getItem('myblog_session'));
    expect(session).toBeNull();
  });

  test('D06 - the header logout button also clears the session', async ({ page }) => {
    const email = `hdr${Date.now()}@example.com`;
    await goto(page, AUTH);
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByLabel('Name').fill('Header User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('secret123');
    await page.getByLabel('Confirm password').fill('secret123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForURL('**/auth/dashboard.html');

    await page.locator('.header').getByRole('button', { name: 'Log out' }).click();
    await page.waitForURL('**/index.html');
    const session = await page.evaluate(() => localStorage.getItem('myblog_session'));
    expect(session).toBeNull();
  });

  test('D07 - going back does not reopen the protected dashboard', async ({ page }) => {
    await goto(page, DASH);
    await page.waitForURL('**/auth/auth.html');
    await page.goBack();
    await page.waitForTimeout(500);
    await expect(page).not.toHaveURL(/dashboard\.html/);
  });
});
