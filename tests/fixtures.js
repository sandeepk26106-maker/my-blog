// @ts-check
const base = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/**
 * Shared test fixtures for MyBlog.
 *
 * The site loads React / ReactDOM / Babel from unpkg. During tests we intercept
 * those CDN requests and fulfil them from the locally cached copies in
 * tests/vendor/ — the test run is fast, deterministic and works offline.
 */
const VENDOR = path.join(__dirname, 'vendor');

const VENDOR_MAP = [
  ['react@18/umd/react.production.min.js', 'react.production.min.js'],
  ['react-dom@18/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
  ['@babel/standalone/babel.min.js', 'babel.min.js'],
];

const test = base.test.extend({
  page: async ({ page }, use) => {
    await page.route('https://unpkg.com/**', async (route) => {
      const url = route.request().url();
      for (const [needle, file] of VENDOR_MAP) {
        if (url.includes(needle)) {
          const local = path.join(VENDOR, file);
          if (fs.existsSync(local)) {
            return route.fulfill({
              status: 200,
              contentType: 'text/javascript; charset=utf-8',
              body: fs.readFileSync(local),
            });
          }
        }
      }
      return route.continue();
    });
    await use(page);
  },
});

/**
 * Navigate and wait until React has actually rendered the page.
 * Plain page.goto() resolves on "load", but the app renders after Babel has
 * parsed the inline script — assertions right after goto() can be flaky.
 */
async function goto(page, url) {
  await page.goto(url);
  await page.waitForSelector('#root > *', { timeout: 20000 });
  await page.waitForTimeout(120);
  return page;
}

/** Log the current user out (keeps the stored user) and open the auth page. */
async function logoutAndOpenAuth(page, authUrl) {
  await page.evaluate(() => localStorage.removeItem('myblog_session'));
  await goto(page, authUrl);
  return page;
}

module.exports = { test, expect: base.expect, goto, logoutAndOpenAuth };
