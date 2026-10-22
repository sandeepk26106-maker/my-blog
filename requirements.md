# Requirements: Blog Website Homepage

> **Status:** Draft
> **Date:** 2026-10-22
> **Author:** OpenCode Agent

## 1. Overview

A homepage for a blog website built with React. It includes a sticky header
with navigation, a hero section, a **10-post** blog grid, a newsletter signup,
and a footer, with light + dark mode support. Login / Signup live in the
separate `BLOG/auth/` feature (see `BLOG/auth/requirements.md`).

## 2. Goals

- Present blog brand and navigation clearly via a sticky header
- Showcase latest blog posts (10 posts grid)
- Provide hero introduction to the blog
- Capture emails via newsletter section
- Support light + dark mode and responsive mobile-first layout
- Link to the auth feature (`BLOG/auth/`) and show the signed-in user

## 3. Non-Goals (Out of Scope)

- Backend / CMS / real blog API (use mock/static post data)
- Post detail page and comments (homepage only)
- Payment / subscription processing
- Auth implementation (handled in the `BLOG/auth/` feature folder)

## 4. Page Sections

### 4.1 Header

| Item | Details |
| ---- | ------- |
| Logo / Brand | "MyBlog" wordmark top-left (link → homepage) |
| Navigation links | Home, Blog, About, Contact |
| Search | Search icon → input, filters the 10-post grid by title |
| CTA button | Subscribe (scrolls to newsletter section) |
| Auth link | Logged out → "Login"; logged in → "Hi, {first name}" → dashboard |
| Theme toggle | Moon / sun button, persists in `localStorage` |
| Sticky behaviour | Sticky / fixed on scroll |

### 4.2 Hero

| Item | Details |
| ---- | ------- |
| Content | Blog title, tagline, CTA (e.g. Start Reading) |
| Layout | Full-width centered hero below header |

### 4.3 Blog Posts Grid

| Item | Details |
| ---- | ------- |
| What is listed | Blog posts (mock data, **10 posts**) |
| Fields per item | Cover image, title, excerpt, author, date, category |
| Layout | Grid: 3 cols desktop / 2 tablet / 1 mobile |
| Pagination strategy | None for v1 (fixed 10 posts; load-more out of scope) |
| Filters / Search | Header search filters grid by title, empty state "No posts match your search." |

### 4.4 Newsletter

| Item | Details |
| ---- | ------- |
| Content | Heading + email input + Subscribe button |
| Behaviour | Validate email, show success/error message (frontend only) |

### 4.5 About & Contact (homepage section)

| Item | Details |
| ---- | ------- |
| Position | Posts grid ke baad, newsletter se pehle |
| Content | Heading "About MyBlog", intro + mission, 4 stat tiles, 7 topic chips, 5 author cards, contact card |
| Contact card | Owner **HIGH BLOGGING**, phone **6306260243** (`tel:+916306260243`), address **Ghurwara Raebareli (UP)**, pin code **229125**, email |
| CTA | "Full about page →" → `about/about.html` |
| Data source | `assets/site.js` → `window.SITE` |

### 4.6 Footer

| Item | Details |
| ---- | ------- |
| Link columns | About (full about page link), Categories, Contact (phone) |
| Copyright | © 2026 HIGH BLOGGING. All rights reserved. |
| Newsletter | Covered in newsletter section above (no duplicate in footer) |
| Contact info | HIGH BLOGGING · 6306260243 · Ghurwara Raebareli (UP) · 229125 |

## 5. Design & UX

| Item | Details |
| ---- | ------- |
| Colour scheme | > **TODO:** confirm brand colours; default minimal white (light) + slate (dark) |
| Typography | System / Inter (React default) |
| Theme (light/dark) | Light + dark mode toggle in header |
| Reference sites | None provided |

## 6. Technical Constraints

| Item | Details |
| ---- | ------- |
| Framework / stack | React 18 via CDN, no build step, shared styles in `assets/theme.css` |
| Shared modules | `assets/theme.css`, `assets/auth.js` (`window.AuthStore`) |
| Responsive approach | Mobile-first, breakpoints ~375px / 768px / 1280px |
| Accessibility level | Basic: semantic HTML, alt text, keyboard focus, contrast in both themes |
| Existing design system | `assets/theme.css` (CSS variables, light + dark) |

## 7. Related Features

| Feature | Folder | Docs |
| ------- | ------ | ---- |
| Login / Signup + Dashboard | `BLOG/auth/` | `BLOG/auth/requirements.md`, `BLOG/auth/test-cases.md` |
| 10 full articles + reader page | `BLOG/blog-posts/` | `BLOG/blog-posts/requirements.md`, `BLOG/blog-posts/test-cases.md` |
| About page + contact details | `BLOG/about/` | `BLOG/about/requirements.md`, `BLOG/about/test-cases.md` |

| Item | Details |
| ---- | ------- |
| Card click | Opens `post.html?slug=<slug>` — full article, TOC, cover, related posts |
| Content source | `BLOG/blog-posts/posts.js` → `window.BLOG_POSTS` (shared by homepage + reader) |
| Search | Filters by title, excerpt, category ya author |

## 8. Open Questions

- [x] Brand name → "MyBlog" (placeholder, easy to change)
- [x] Real post data source → static mock array in `index.html` (OK for now)
- [x] Search → filters grid by title
- [ ] Footer links and copyright text confirmation?
- [ ] Brand colours confirmation?
