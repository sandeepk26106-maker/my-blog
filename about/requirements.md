# Requirements: Blog Website — About Page & Contact Details

> **Status:** Draft
> **Date:** 2026-10-22
> **Author:** OpenCode Agent
> **Folder:** `BLOG/about/`
> **Branch:** `feature/about-contact` (not merged to `main` yet)

## 1. Overview

A detailed **About page** plus a detailed **About section** on the homepage, and
the real contact details of the blog owner (HIGH BLOGGING) across the site.

| Item | Path |
| ---- | ---- |
| About page | `BLOG/about/about.html` |
| About section | Homepage (`BLOG/index.html`) |
| Shared contact data | `BLOG/assets/site.js` → `window.SITE` |

## 2. Goals

- About page par poori detail — mission, topics, authors, stats, contact
- Homepage pe bhi summarized About section (bina alag page khole)
- Contact details ek jagah se control ho (site.js)
- Owner details har page ke footer me consistent dikhein

## 3. Non-Goals (Out of Scope)

- Contact form ka real backend / email sending (front-end mock)
- Social media links (add later when handles are decided)
- Team member photos (initials avatars use ho rahe hain)
- About page ka CMS / editing UI

## 4. Contact Details (owner)

| Field | Value |
| ----- | ----- |
| Name / owner | **HIGH BLOGGING** |
| Phone | **6306260243** (link: `tel:+916306260243`) |
| Address | **Ghurwara Raebareli (UP)** |
| Pin code | **229125** |
| Email | hello@myblog.test (placeholder) |
| Brand name | MyBlog (site ka naam change nahi kiya) |

**Where contact details appear:**

| Page | Location |
| ---- | -------- |
| Homepage | About section "Get in touch" card + footer |
| About page | Contact card (rows + form) + footer |
| Post reader | Footer |
| Dashboard | Footer |
| Auth page | Header "About" link (details on about page) |

## 5. Shared Data (`assets/site.js`)

`window.SITE` holds:

| Key | Contents |
| --- | -------- |
| `name`, `tagline` | Brand basics |
| `owner`, `phone`, `phoneHref`, `address`, `pincode`, `city`, `email` | Contact |
| `topics[]` | 7 topic chips (React, CSS, JavaScript, UX, SEO, DevOps, Writing) |
| `authors[]` | 5 authors — name, role, initials, bio |
| `stats[]` | 4 stats — 10 Articles, 7 Topics, 5 Authors, 100% Free & ad-free |

## 6. About Section (homepage)

| Item | Details |
| ---- | ------- |
| Position | Posts grid ke baad, newsletter se pehle |
| Heading | "About MyBlog" |
| Intro | 2 short paragraphs — what the blog is + mission |
| Stats | 4 tiles (value + label) |
| Topics | Chip list of all 7 topics |
| Authors | 5 cards — avatar initials, name, role, bio |
| Contact | Card with phone (clickable), address, pin code, email |
| CTA | "Full about page →" → `about/about.html` |

## 7. About Page (`about/about.html`)

| Item | Details |
| ---- | ------- |
| Hero | "About MyBlog" + 2-line intro (owner name mentioned) |
| Who we are | 2 paragraphs — team, mission |
| What we write about | Chips + 7 bullet points per topic |
| By the numbers | 4 stat tiles |
| Meet the authors | 5 author cards |
| Contact | Full contact card + **contact form** (name, email, message) |
| Form validation | Name ≥ 2 chars, valid email, message ≥ 10 chars |
| Form success | Green message, fields cleared |
| CTA | "Latest articles padhein" → homepage posts |
| Header/Footer | Same header/footer pattern, "About" nav link active |

## 8. Design & UX

| Item | Details |
| ---- | ------- |
| Section style | Top border, 48px vertical padding, muted intro text |
| Stats | Accent-colored numbers, muted labels, 4 cols → 2 on mobile |
| Chips | Accent-soft pill background, accent text |
| Author cards | Card surface, circular accent avatar with initials |
| Contact rows | Icon chip + label + value, bottom borders, clickable phone/email |
| Theme | Light + dark, all new components theme-aware |
| Responsive | Stats 4→2 cols, authors auto-fit minmax(200px) |

## 9. Technical Constraints

| Item | Details |
| ---- | ------- |
| Stack | React 18 CDN, no build step, plain CSS in `assets/theme.css` |
| Data flow | All contact/author/topic text comes from `window.SITE` |
| Links | About page lives at `about/about.html` (relative paths differ per page) |
| Accessibility | Labels on form fields, `role="alert"` on messages, focus styles, `tel:` link |

## 10. Open Questions

- [ ] Social media links add karne hain (handles decide karne hain)?
- [ ] Real contact form backend (email service)?
- [ ] Owner ki photo / logo instead of initials avatar?
- [ ] Hindi (Devanagari) version of the about page?
