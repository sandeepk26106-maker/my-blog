// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const VENDOR = path.join(__dirname, 'tests', 'vendor');

/**
 * The pages load React + Babel from unpkg (CDN). During tests we intercept those
 * requests and serve the locally cached copies from tests/vendor/ — the test run
 * becomes fast, deterministic and works without internet.
 */
const VENDOR_MAP = {
  'react.production.min.js': 'react.production.min.js',
  'react-dom.production.min.js': 'react-dom.production.min.js',
  'babel.min.js': 'babel.min.js',
};

/**
 * Playwright config for MyBlog.
 *
 * Evidence: every test records a video and a post-test screenshot; the custom
 * reporter (tests/evidence-reporter.js) collects them into ./evidence with
 * a master evidence.md plus one evidence.md per feature folder.
 *
 * Run with `npm run serve` (port 8099) in one terminal, `npm test` in another.
 */
module.exports = defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 60000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [require.resolve('./tests/evidence-reporter.js'), { outputDir: 'evidence' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:8099',
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'on'
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } }
  ],
  webServer: {
    command: 'node tests/serve.js',
    url: 'http://127.0.0.1:8099/index.html',
    reuseExistingServer: true,
    timeout: 30000
  }
});
