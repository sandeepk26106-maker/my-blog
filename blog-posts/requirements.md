# Requirements: Blog Website — 10 Articles & Reader Page

> **Status:** Draft
> **Date:** 2026-10-22
> **Author:** OpenCode Agent
> **Folder:** `BLOG/blog-posts/`

## 1. Overview

Full article content for all 10 blog posts, plus a **post reader page** that
opens a single article from its card. Content is stored centrally in
`blog-posts/posts.js` and shared by the homepage (cards) and the reader
(full article).

| Item | Path |
| ---- | ---- |
| Content source | `BLOG/blog-posts/posts.js` → `window.BLOG_POSTS` |
| Reader page | `BLOG/post.html?slug=<slug>` |
| Homepage cards | `BLOG/index.html` → links to the reader |

## 2. Goals

- Har post ka full, readable article content (long-form)
- Ek shared content file — homepage aur reader dono same data use karein
- Card click → full article with TOC, cover, meta aur related posts
- Hinglish tone (Hindi + English mix, Roman script)
- Article structure: multiple H2 sections, code examples, lists, tables

## 3. Non-Goals (Out of Scope)

- Markdown parsing / MDX (content is HTML strings)
- Comments, reactions, share buttons
- Search inside an article
- Reading-time auto calculation (value is written in the data)
- Author profile pages, categories archive pages

## 4. Content Model

Each entry in `window.BLOG_POSTS`:

| Field | Type | Notes |
| ----- | ---- | ----- |
| `id` | number | 1–10, unique, stable |
| `slug` | string | kebab-case, URL-safe, unique |
| `title` | string | Reader heading (H1) |
| `excerpt` | string | Card summary, 1–2 lines |
| `author` | string | Display name |
| `date` | string | `YYYY-MM-DD` |
| `category` | string | React, CSS, JavaScript, UX, SEO, DevOps, Writing |
| `readTime` | number | Minutes |
| `cover` | string | Cover image URL |
| `body` | string | HTML string — `<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<pre><code>`, `<blockquote>`, `<table>` |

## 5. The 10 Articles

| # | Slug | Title | Category | Author |
| - | ---- | ----- | -------- | ------ |
| 1 | `getting-started-with-react` | Getting Started with React | React | Aarav Sharma |
| 2 | `css-grid-in-10-minutes` | CSS Grid in 10 Minutes | CSS | Diya Sharma |
| 3 | `javascript-es2026-features` | JavaScript ES2026 Features | JavaScript | Kabir Nair |
| 4 | `dark-mode-done-right` | Dark Mode Done Right | UX | Meera Iyer |
| 5 | `blog-seo-basics` | Blog SEO Basics | SEO | Aarav Sharma |
| 6 | `deploy-react-for-free` | Deploy React for Free | DevOps | Rohan Verma |
| 7 | `mastering-flexbox-layouts` | Mastering Flexbox Layouts | CSS | Diya Sharma |
| 8 | `react-hooks-cheat-sheet` | React Hooks Cheat Sheet | React | Kabir Nair |
| 9 | `writing-tech-posts-that-get-read` | Writing Tech Posts That Get Read | Writing | Meera Iyer |
| 10 | `git-workflow-for-solo-devs` | Git Workflow for Solo Devs | DevOps | Rohan Verma |

Each article: ~800–1400 words, 9–12 H2 sections, code samples, lists,
practical examples aur ek closing summary + related-post link.

## 6. Reader Page (`post.html`)

| Item | Details |
| ---- | ------- |
| Routing | `?slug=<slug>` query param, no router library |
| Header | Category, H1 title, author · date · read time, cover image (2:1) |
| Table of contents | Auto-built from H2s, collapsible `<details>`, anchor links |
| Body | Prose styling — 760px max width, code blocks, tables, blockquotes |
| Prev/next nav | Back to all posts + newsletter link |
| Related posts | 3 other posts as cards |
| Not found | "Post not found" message + link back to all posts |
| Title/meta | `document.title` and meta description update per post |
| Scroll | Article loads scrolled to top |

## 7. Homepage Integration

| Item | Details |
| ---- | ------- |
| Data source | `window.BLOG_POSTS` (shared file) |
| Card | Cover, category, title, excerpt, author · date · read time |
| Card click | Navigates to `post.html?slug=<slug>` |
| Search | Filters by title, excerpt, category ya author |
| Count | Heading shows filtered post count |

## 8. Design & UX

| Item | Details |
| ---- | ------- |
| Prose | 17px, line-height 1.75, max-width 760px |
| Headings | H2 26px, H3 20px, scroll-margin for anchor offset |
| Code blocks | Dark background (#0f172a), light text, horizontal scroll |
| Theme | Light + dark, code blocks stay dark in both themes |
| Tables | Full width, header row highlighted |
| Responsive | Mobile-first, prose 16px on small screens, TOC collapsible |

## 9. Technical Constraints

| Item | Details |
| ---- | ------- |
| Framework / stack | React 18 CDN, no build step |
| Content format | JS file with HTML strings (no markdown parser needed) |
| Escaping | `\`` and `${` must be escaped inside body template literals |
| Accessibility | Landmarks (`<article>`), heading order h1 → h2 → h3, alt text, skip-link friendly |
| Performance | Content file ~85KB, loaded once and cached |

## 10. Open Questions

- [ ] Comments / reactions add karne hain?
- [ ] Category archive pages (e.g. all "React" posts)?
- [ ] Author pages?
- [ ] Hindi (Devanagari) version of posts?
