# MyBlog

A modern blog website built with **React** (no build step — React 18 via CDN).
Homepage with a 10-post grid, plus a full **Login / Signup** flow with a
protected dashboard.

🔗 Live repo: https://github.com/sandeepk26106-maker/my-blog

## Features

- **Sticky header** — logo, navigation, search, theme toggle, auth link, Subscribe CTA
- **Hero** — blog title, tagline, "Start Reading" CTA
- **10-post grid** — cover image, title, excerpt, author, date, category, read time
  (3 cols desktop / 2 tablet / 1 mobile)
- **Search** — filters the grid by title, excerpt, category ya author, with an empty state
- **Post reader page** (`post.html?slug=…`) — cover, meta, auto table of contents,
  full article, related posts
- **10 full articles** — Hinglish, long-form, code examples, tables (780–1400 words each)
- **Detailed About section** on the homepage — mission, stats, topic chips, author cards
- **About page** (`about/about.html`) — who we are, what we write about, authors, stats,
  contact details + validated contact form
- **Newsletter** — client-side email validation + success/error states
- **Light + dark mode** — CSS variables, toggle persists in `localStorage`
- **Login / Signup** — single page with tabs, email + password, full validation
- **Protected dashboard** — redirects anonymous visitors to the auth page
- **Responsive** — mobile-first, no horizontal scroll at 375px

## Contact

| Field | Value |
| ----- | ----- |
| Name | **HIGH BLOGGING** |
| Phone | **6306260243** |
| Address | **Ghurwara Raebareli (UP)** |
| Pin code | **229125** |

Sab contact details `assets/site.js` me hain — ek jagah badlo, har page update ho jayega.

## Folder structure

```
BLOG/
├── index.html            # Homepage (React, 10 posts + About section)
├── post.html             # Post reader page (?slug=…)
├── requirements.md       # Homepage requirement spec
├── test-cases.md         # Homepage acceptance tests
├── playwright.config.js  # Playwright config (desktop + mobile projects)
├── package.json          # npm scripts (serve / test / evidence / vendor)
├── assets/
│   ├── theme.css         # Shared light + dark theme, components, prose styles
│   ├── site.js           # Site info: owner, contact, topics, authors, stats
│   └── auth.js           # Shared AuthStore (localStorage mock)
├── about/
│   ├── about.html        # About page + contact form
│   ├── requirements.md   # About spec
│   └── test-cases.md     # About tests
├── blog-posts/
│   ├── posts.js          # All 10 articles (window.BLOG_POSTS)
│   ├── requirements.md   # Content + reader spec
│   └── test-cases.md     # Content + reader tests
├── auth/
│   ├── auth.html         # Login + Signup (tabbed single page)
│   ├── dashboard.html    # Protected dashboard
│   ├── requirements.md   # Auth requirement spec
│   └── test-cases.md     # Auth acceptance tests
├── tests/                # Playwright specs + evidence reporter
│   ├── fixtures.js       # Shared fixtures (CDN interception, goto helper)
│   ├── serve.js          # Static server on :8099
│   ├── fetch-vendor.js   # Caches the CDN libs for offline/fast test runs
│   ├── evidence-reporter.js
│   ├── homepage.spec.js  auth.spec.js  posts.spec.js  about.spec.js
└── evidence/             # QA evidence pack (committed)
    ├── evidence.md       # Master report — every case with screenshot + video
    ├── homepage/evidence.md
    ├── auth/evidence.md
    ├── posts/evidence.md
    ├── about/evidence.md
    ├── screens/*.png     # 244 screenshots
    └── videos/*.webm     # 244 videos
```

## QA & Evidence

Har test case ka apna screenshot aur video Playwright automatically capture
karta hai, aur `tests/evidence-reporter.js` unhe `evidence/` me pack kar deta hai.

```bash
npm run vendor   # CDN libs cache karo (ek baar)
npm run serve    # static server on :8099 (doosre terminal me)
npm test         # poora suite + evidence pack regenerate
npm run report   # HTML report kholo
```

**Latest run:** 244 executed · 243 passed · 0 failed · 1 skipped
(desktop-chromium + mobile-chromium) — `evidence/evidence.md` me poora report.

| Feature | Spec | Cases | Evidence |
| ------- | ---- | ----- | -------- |
| Homepage | `tests/homepage.spec.js` | 70 | [evidence/homepage/evidence.md](evidence/homepage/evidence.md) |
| Login / Signup / Dashboard | `tests/auth.spec.js` | 58 | [evidence/auth/evidence.md](evidence/auth/evidence.md) |
| Articles & Reader | `tests/posts.spec.js` | 54 | [evidence/posts/evidence.md](evidence/posts/evidence.md) |
| About & Contact | `tests/about.spec.js` | 62 | [evidence/about/evidence.md](evidence/about/evidence.md) |

**Test run offline bhi chalta hai** — `tests/fixtures.js` CDN requests ko
`tests/vendor/` ke local copies se serve karta hai, isliye run fast aur
deterministic rehta hai. Site khud CDN se load karta hai.

## The 10 articles

| # | Title | Category | Author |
| - | ----- | -------- | ------ |
| 1 | Getting Started with React | React | Aarav Sharma |
| 2 | CSS Grid in 10 Minutes | CSS | Diya Sharma |
| 3 | JavaScript ES2026 Features | JavaScript | Kabir Nair |
| 4 | Dark Mode Done Right | UX | Meera Iyer |
| 5 | Blog SEO Basics | SEO | Aarav Sharma |
| 6 | Deploy React for Free | DevOps | Rohan Verma |
| 7 | Mastering Flexbox Layouts | CSS | Diya Sharma |
| 8 | React Hooks Cheat Sheet | React | Kabir Nair |
| 9 | Writing Tech Posts That Get Read | Writing | Meera Iyer |
| 10 | Git Workflow for Solo Devs | DevOps | Rohan Verma |

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8099
# → http://127.0.0.1:8099/index.html
```

> The pages load React from a CDN, so an internet connection is required.

## Test accounts

Auth is a **front-end mock** — users are stored in `localStorage`.

| Field | Rule |
| ----- | ---- |
| Name | ≥ 2 characters |
| Email | valid email format, must be unique |
| Password | ≥ 6 characters, must match confirmation |

Sign up from the **Sign up** tab and you are signed in automatically.

> ⚠️ Passwords are demo-hashed only. Never use this pattern in production.

## Tech stack

| Layer | Choice |
| ----- | ------ |
| UI | React 18 (UMD via CDN), function components, `useState` / `useEffect` / `useMemo` |
| Styling | Hand-written CSS with custom properties, light + dark themes |
| State | React hooks + `localStorage` (no backend) |
| Tooling | None required — no bundler, no dependencies |

## Notes

- `AGENTS.md` holds the project conventions (all blog data lives in this folder).
- Docs follow the `create-rfp` skill: `requirements.md` + `test-cases.md` per feature.
