/**
 * Downloads the CDN libraries (React, ReactDOM, Babel standalone) into
 * tests/vendor/ so the Playwright run is fast, deterministic and works offline.
 *
 * The site itself keeps loading the libraries from unpkg — during the test run
 * these requests are intercepted and served from the local copies
 * (see tests/fixtures.js).
 *
 * Usage: npm run vendor
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const VENDOR = path.join(__dirname, 'vendor');

const FILES = [
  ['https://unpkg.com/react@18/umd/react.production.min.js', 'react.production.min.js'],
  ['https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
  ['https://unpkg.com/@babel/standalone/babel.min.js', 'babel.min.js'],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'myblog-vendor-script' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`${url} -> HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
      })
      .on('error', reject);
  });
}

(async () => {
  fs.mkdirSync(VENDOR, { recursive: true });
  for (const [url, name] of FILES) {
    const dest = path.join(VENDOR, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`skip  ${name} (already cached)`);
      continue;
    }
    process.stdout.write(`get   ${name} … `);
    await download(url, dest);
    console.log(`${(fs.statSync(dest).size / 1024).toFixed(0)} KB`);
  }
  console.log('vendor ready →', VENDOR);
})().catch((err) => {
  console.error('vendor download failed:', err.message);
  process.exit(1);
});
