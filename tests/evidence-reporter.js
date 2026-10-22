// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * Playwright reporter that produces a per-test evidence pack for MyBlog.
 *
 * For every executed test it copies the automatic screenshot and video that
 * Playwright captured (config: screenshot: 'on', video: 'on') into
 * `evidence/screens/` and `evidence/videos/`, then writes:
 *
 *   evidence/evidence.md          — master report (all features)
 *   evidence/<feature>/evidence.md — one report per feature
 *
 * Feature = the spec file the test came from (homepage, auth, posts, about).
 */
function slug(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'test';
}

function statusLabel(status) {
  switch (status) {
    case 'passed': return '✅ PASS';
    case 'failed': return '❌ FAIL';
    case 'timedOut': return '⏱️ TIMEOUT';
    case 'skipped': return '⏭️ SKIP';
    case 'interrupted': return '⚠️ INTERRUPTED';
    default: return status;
  }
}

const FEATURES = {
  'homepage.spec.js': { name: 'homepage', title: 'Homepage', desc: 'Homepage — header, 10-post grid, about section, newsletter, footer, responsive' },
  'auth.spec.js': { name: 'auth', title: 'Login / Signup / Dashboard', desc: 'Auth — signup, login, validation, protected dashboard' },
  'posts.spec.js': { name: 'posts', title: 'Articles & Reader Page', desc: 'Content — 10 articles, reader page, table of contents, related posts' },
  'about.spec.js': { name: 'about', title: 'About Page & Contact', desc: 'About — about section, about page, contact details, contact form' }
};

class EvidenceReporter {
  constructor(options = {}) {
    this.outputDir = path.resolve(options.outputDir || 'evidence');
    this.rows = [];
  }

  onBegin(config, suite) {
    this.startedAt = new Date();
    this.total = suite.allTests().length;
  }

  onTestEnd(test, result) {
    const project = test.parent && test.parent.project && test.parent.project()
      ? test.parent.project().name
      : 'default';
    const attachments = result.attachments || [];
    const shot = attachments.find((a) => a.name === 'screenshot' && a.path);
    const video = attachments.find((a) => a.name === 'video' && a.path);

    this.rows.push({
      project,
      file: path.basename(test.location.file),
      line: test.location.line,
      title: test.title,
      fullTitle: test.titlePath().filter(Boolean).join(' › '),
      status: result.status,
      duration: result.duration,
      shotPath: shot ? shot.path : null,
      videoPath: video ? video.path : null
    });
  }

  async onEnd(result) {
    const screensDir = path.join(this.outputDir, 'screens');
    const videosDir = path.join(this.outputDir, 'videos');
    fs.mkdirSync(screensDir, { recursive: true });
    fs.mkdirSync(videosDir, { recursive: true });

    const used = new Set();
    for (const row of this.rows) {
      const base = slug(row.project + '-' + row.title);
      let unique = base;
      let n = 2;
      while (used.has(unique)) unique = `${base}-${n++}`;
      used.add(unique);

      if (row.shotPath && fs.existsSync(row.shotPath)) {
        const file = path.join(screensDir, unique + '.png');
        fs.copyFileSync(row.shotPath, file);
        row.shotRel = 'screens/' + unique + '.png';
      }
      if (row.videoPath && fs.existsSync(row.videoPath)) {
        const file = path.join(videosDir, unique + '.webm');
        fs.copyFileSync(row.videoPath, file);
        row.videoRel = 'videos/' + unique + '.webm';
      }
    }

    const passed = this.rows.filter((r) => r.status === 'passed').length;
    const failed = this.rows.filter((r) => r.status === 'failed' || r.status === 'timedOut').length;
    const skipped = this.rows.filter((r) => r.status === 'skipped').length;
    const projects = [...new Set(this.rows.map((r) => r.project))];
    const duration = ((Date.now() - this.startedAt.getTime()) / 1000).toFixed(1);

    this.rows.sort((a, b) =>
      (a.file + a.title).localeCompare(b.file + b.title, 'en', { numeric: true })
    );

    const fmt = (ms) => (ms / 1000).toFixed(1) + 's';

    const buildTable = (rows, prefix) => {
      const table = rows
        .map((r, i) => [
          i + 1,
          r.title,
          statusLabel(r.status),
          fmt(r.duration),
          r.shotRel ? `[screenshot](${prefix}${r.shotRel})` : '—',
          r.videoRel ? `[video](${prefix}${r.videoRel})` : '—',
          `\`${r.file}:${r.line}\``
        ].join(' | '))
        .map((line) => `| ${line} |`)
        .join('\n');

      return `| # | Test case | Status | Duration | Screenshot | Video | Source |
| - | --------- | ------ | -------- | ---------- | ----- | ------ |
${table}
`;
    };

    const buildSections = (rows, prefix) => projects.map((project) => {
      const prows = rows.filter((r) => r.project === project);
      if (!prows.length) return '';
      const p = prows.filter((r) => r.status === 'passed').length;
      const f = prows.filter((r) => r.status === 'failed' || r.status === 'timedOut').length;
      const s = prows.filter((r) => r.status === 'skipped').length;
      return `### ${project} — ${p} passed, ${f} failed, ${s} skipped

${buildTable(prows, prefix)}`;
    }).join('\n');

    const failures = this.rows.filter((r) => r.status === 'failed' || r.status === 'timedOut');
    const failureSection = failures.length
      ? `## Failed cases\n\n${failures
          .map((r) => `- **${r.project} › ${r.title}** (${r.file}:${r.line}) — ${r.shotRel ? `[screenshot](${r.shotRel})` : 'no screenshot'}`)
          .join('\n')}\n`
      : '## Failed cases\n\nNone — every executed case passed. 🎉\n';

    // ---------- master report ----------
    const featureRows = Object.keys(FEATURES)
      .map((file) => {
        const rows = this.rows.filter((r) => r.file === file);
        if (!rows.length) return '';
        const p = rows.filter((r) => r.status === 'passed').length;
        const f = rows.filter((r) => r.status === 'failed' || r.status === 'timedOut').length;
        const s = rows.filter((r) => r.status === 'skipped').length;
        return `| [${FEATURES[file].title}](${FEATURES[file].name}/evidence.md) | \`${file}\` | ${rows.length} | ${p} | ${f} | ${s} |`;
      })
      .filter(Boolean)
      .join('\n');

    const md = `# Playwright Evidence — MyBlog

> **Generated:** ${new Date().toISOString()}
> **Command:** \`npx playwright test\`
> **Config:** \`playwright.config.js\` (screenshot: on, video: on, trace: retain-on-failure)
> **Base URL:** http://127.0.0.1:8099
> **App under test:** \`index.html\` · \`post.html\` · \`about/about.html\` · \`auth/\`
> **Owner:** HIGH BLOGGING · 6306260243 · Ghurwara Raebareli (UP) — 229125

## Run summary

| Metric | Value |
| ------ | ----- |
| Total executed | ${this.rows.length} |
| Passed | ${passed} |
| Failed | ${failed} |
| Skipped | ${skipped} |
| Wall time | ${duration}s |
| Projects | ${projects.join(', ')} |

Every test below has its own browser screenshot and video captured automatically
by Playwright during the run — no separate script was used.

## Features

| Feature | Spec file | Tests | Passed | Failed | Skipped |
| ------- | --------- | ----- | ------ | ------ | ------- |
${featureRows}

## All test cases

${buildSections(this.rows, '')}
${failureSection}
## How to reproduce

\`\`\`bash
npm run serve              # static server on :8099 (run in another terminal)
npm test                   # runs all cases, writes this evidence pack
npm run report             # opens the interactive HTML report
\`\`\`
`;

    fs.writeFileSync(path.join(this.outputDir, 'evidence.md'), '\uFEFF' + md, 'utf8');

    // ---------- per-feature reports ----------
    for (const [file, meta] of Object.entries(FEATURES)) {
      const rows = this.rows.filter((r) => r.file === file);
      if (!rows.length) continue;
      const dir = path.join(this.outputDir, meta.name);
      fs.mkdirSync(dir, { recursive: true });

      const p = rows.filter((r) => r.status === 'passed').length;
      const f = rows.filter((r) => r.status === 'failed' || r.status === 'timedOut').length;
      const s = rows.filter((r) => r.status === 'skipped').length;

      const featureMd = `# Playwright Evidence — ${meta.title}

> **Generated:** ${new Date().toISOString()}
> **Feature:** ${meta.desc}
> **Spec file:** \`tests/${file}\`
> **Base URL:** http://127.0.0.1:8099
> **Projects:** ${projects.join(', ')}

## Summary

| Metric | Value |
| ------ | ----- |
| Total executed | ${rows.length} |
| Passed | ${p} |
| Failed | ${f} |
| Skipped | ${s} |

Screenshots aur videos shared folder me hain: \`../screens/\` aur \`../videos/\`.

${buildSections(rows, '../')}
${failures.length ? `## Failed cases\n\n${failures.filter((r) => r.file === file).map((r) => `- **${r.project} › ${r.title}** (${r.file}:${r.line})`).join('\n')}\n` : '## Failed cases\n\nNone — every executed case passed. 🎉\n'}
[← Back to master evidence](../evidence.md)
`;

      fs.writeFileSync(path.join(dir, 'evidence.md'), '\uFEFF' + featureMd, 'utf8');
    }

    console.log(`\n📦 Evidence: ${this.rows.length} cases → ${path.join(this.outputDir, 'evidence.md')}`);
    console.log(`   screens: ${screensDir}`);
    console.log(`   videos : ${videosDir}`);
    for (const meta of Object.values(FEATURES)) {
      const dir = path.join(this.outputDir, meta.name);
      if (fs.existsSync(path.join(dir, 'evidence.md'))) {
        console.log(`   feature: ${path.join(dir, 'evidence.md')}`);
      }
    }
  }
}

module.exports = EvidenceReporter;
