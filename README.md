# MyBlog

A modern blog website built with **React** (no build step — React 18 via CDN).
Homepage with a 10-post grid, plus a full **Login / Signup** flow with a
protected dashboard.

🔗 Live repo: https://github.com/sandeepk26106-maker/my-blog

## Features

- **Sticky header** — logo, navigation, search, theme toggle, auth link, Subscribe CTA
- **Hero** — blog title, tagline, "Start Reading" CTA
- **10-post grid** — cover image, title, excerpt, author, date, category
  (3 cols desktop / 2 tablet / 1 mobile)
- **Search** — filters the grid by post title, with an empty state
- **Newsletter** — client-side email validation + success/error states
- **Light + dark mode** — CSS variables, toggle persists in `localStorage`
- **Login / Signup** — single page with tabs, email + password, full validation
- **Protected dashboard** — redirects anonymous visitors to the auth page
- **Responsive** — mobile-first, no horizontal scroll at 375px

## Folder structure

```
BLOG/
├── index.html            # Homepage (React, 10 posts)
├── requirements.md       # Homepage requirement spec
├── test-cases.md         # Homepage acceptance tests
├── assets/
│   ├── theme.css         # Shared light + dark theme, components, responsive
│   └── auth.js           # Shared AuthStore (localStorage mock)
└── auth/
    ├── auth.html         # Login + Signup (tabbed single page)
    ├── dashboard.html    # Protected dashboard
    ├── requirements.md   # Auth requirement spec
    └── test-cases.md     # Auth acceptance tests
```

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
