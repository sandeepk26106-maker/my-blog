# Test Cases: Blog Website Homepage

> Stack: React · Page: `BLOG/index.html` · Auth tests → `BLOG/auth/test-cases.md`

## 1. Header

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| H01 | Logo is visible | Load the page | "MyBlog" wordmark appears top-left, links to homepage |
| H02 | Nav links visible | Inspect header | Home, Blog, About, Contact visible |
| H03 | Nav links navigate | Click each link | Correct page/anchor reached |
| H04 | Search icon present | Inspect header | Search icon/button visible |
| H05 | Search input opens | Click search icon | Input with "Search posts…" appears |
| H06 | Subscribe CTA works | Click Subscribe | Scrolls to newsletter section |
| H07 | Sticky header | Scroll down | Header stays fixed/sticky |
| H08 | Theme toggle | Click moon/sun | Theme switches light ↔ dark, persists on reload |
| H09 | Login link (logged out) | Load page logged out | Header shows "Login" → `auth/auth.html` |
| H10 | Greeting link (logged in) | Load page logged in | Header shows "Hi, {first name}" → `auth/dashboard.html` |

## 2. Hero

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| HE01 | Hero renders | Load the page | Title + tagline + CTA visible |
| HE02 | Hero CTA works | Click Start Reading | Scrolls to posts grid |

## 3. Blog Posts Grid

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| L01 | 10 posts render | Load the page | Exactly 10 cards in grid |
| L02 | Card fields correct | Inspect a card | Cover, title, excerpt, author, date, category visible |
| L03 | Images have alt text | Inspect images | Each cover has non-empty alt |
| L04 | Search filters | Type "React" in search | Grid shows only matching titles |
| L05 | Empty state | Type "zzzz" in search | "No posts match your search." shown |
| L06 | Clear search | Remove query | All 10 cards return |

## 4. Newsletter

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| N01 | Newsletter visible | Scroll to newsletter | Heading + email input + button visible |
| N02 | Valid email | Enter valid email, submit | "Subscribed successfully!" shown |
| N03 | Invalid email | Enter invalid email, submit | "Enter a valid email address." shown |

## 6. About & Contact (homepage)

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| A01 | About section renders | Load page, scroll below posts | "About MyBlog" section visible |
| A02 | Stats tiles | Inspect stats | 4 tiles: 10 Articles, 7 Topics, 5 Authors, 100% Free |
| A03 | Topic chips | Inspect chips | 7 topics listed |
| A04 | Author cards | Inspect authors | 5 cards with initials, name, role, bio |
| A05 | Contact card | Inspect contact | HIGH BLOGGING, 6306260243, Ghurwara Raebareli (UP), 229125 |
| A06 | Phone link | Inspect phone | `href="tel:+916306260243"` |
| A07 | About page CTA | Click "Full about page →" | `about/about.html` opens |

## 7. Footer

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| F01 | Footer visible | Scroll to bottom | Footer with link columns appears |
| F02 | Footer links work | Click each link | Correct destination or placeholder |
| F03 | Copyright present | Inspect footer | "© 2026 HIGH BLOGGING. All rights reserved." visible |
| F04 | Footer auth link | Click "Login / Sign up" | Auth page opens |
| F05 | Footer contact | Inspect footer | Phone + address + pin code shown |

## 8. Responsive

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| R01 | Mobile 375px | Resize to 375px width | 1-column grid, no horizontal scroll |
| R02 | Tablet 768px | Resize to 768px width | 2-column grid, layout adapts |
| R03 | Desktop 1280px | Resize to 1280px width | 3-column grid |
| R04 | Nav collapses on mobile | Resize to 375px | Nav links hidden, header still usable |
