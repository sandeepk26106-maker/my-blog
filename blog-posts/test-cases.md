# Test Cases: Blog Website — 10 Articles & Reader Page

> Pages: `index.html`, `post.html?slug=<slug>` · Content: `blog-posts/posts.js`

## 1. Content file

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| C01 | 10 posts load | Open homepage, inspect `window.BLOG_POSTS` | Array of 10 post objects |
| C02 | Unique slugs | Compare all slugs | No duplicates, all kebab-case |
| C03 | Unique ids | Compare all ids | 1–10, no duplicates |
| C04 | Required fields | Check every post | id, slug, title, excerpt, author, date, category, readTime, cover, body present |
| C05 | Body not empty | Check every body | Each body > 500 words with multiple `<h2>` |
| C06 | Valid HTML | Inspect body markup | Only known tags (p, h2, h3, ul, ol, li, pre, code, strong, em, blockquote, table) |
| C07 | No broken escaping | Search file for raw `` ` `` or `${` inside body strings | Escaped correctly, file parses without syntax error |

## 2. Homepage cards

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| L01 | 10 cards render | Load homepage | Exactly 10 post cards |
| L02 | Card fields | Inspect a card | Cover, category, title, excerpt, author · date · read time visible |
| L03 | Card is a link | Hover/inspect card | `href="post.html?slug=<slug>"` |
| L04 | Heading count | Inspect "Latest posts" heading | Shows `(10)` when no filter |
| L05 | Search by title | Type "React" | Matching posts only |
| L06 | Search by category | Type "DevOps" | Deploy + Git posts shown |
| L07 | Search by author | Type "Diya" | Diya ke posts shown |
| L08 | Empty state | Type "zzzz" | "No posts match your search." |

## 3. Reader page — open & render

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| R01 | Card → article | Click a card | `post.html?slug=...` opens, correct article shown |
| R02 | Title | Inspect H1 | Matches post title |
| R03 | Meta | Inspect meta row | Author, date, read time visible |
| R04 | Category badge | Inspect header | Post category shown |
| R05 | Cover image | Inspect cover | Image loads, alt text = title |
| R06 | Body renders | Inspect article | Paragraphs, H2 sections, lists, code blocks rendered |
| R07 | Code blocks styled | Inspect `pre` | Dark background, monospace, horizontal scroll on overflow |
| R08 | Table renders | Open SEO post | Table shows header row + borders |
| R09 | Blockquote | Inspect quote blocks | Left accent border, italic, muted text |
| R10 | Document title | Open any post | Tab title = "<Post title> — MyBlog" |
| R11 | Meta description | Inspect head | Description = post excerpt |

## 4. Table of contents

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| T01 | TOC present | Open a post | "On this page" summary visible |
| T02 | TOC entries | Expand TOC | One link per H2 in the article |
| T03 | Anchor works | Click a TOC link | Scrolls to that H2 |
| T04 | Highlight offset | Click a TOC link | Heading not hidden behind sticky header |
| T05 | Collapsible | Click summary | TOC collapses/expands |

## 5. Navigation & related posts

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| N01 | Back link | Click "All posts" | Homepage with posts section |
| N02 | Newsletter link | Click "Subscribe to newsletter" | Homepage newsletter section |
| N03 | Related posts | Scroll to bottom | 3 other posts shown as cards |
| N04 | Related click | Click a related card | That article opens |
| N05 | Post nav | Click "← Back" | Homepage posts grid |

## 6. Edge cases

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| E01 | Unknown slug | Open `post.html?slug=does-not-exist` | "Post not found" + link back to all posts |
| E02 | No slug | Open `post.html` | "Post not found" message |
| E03 | Direct load | Paste article URL in a new tab | Article renders fully (not blank) |
| E04 | Back navigation | Article → back → forward | Article still renders correctly |

## 7. Theme + Responsive

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| U01 | Theme toggle | Click moon/sun on reader | Theme switches, prose readable in both |
| U02 | Code blocks in dark | Switch to dark | Code blocks remain legible |
| U03 | Mobile 375px | Resize to 375px | Prose fills width, code blocks scroll inside, no page-level horizontal scroll |
| U04 | Desktop | Resize to 1280px | Prose centred at 760px, cover at 900px |
