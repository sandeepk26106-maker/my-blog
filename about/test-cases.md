# Test Cases: Blog Website — About Page & Contact Details

> Branch: `feature/about-contact` · Pages: `index.html`, `about/about.html`

## 1. Contact details (owner)

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| C01 | Owner name | Open homepage About section | "HIGH BLOGGING" shown |
| C02 | Phone visible | Inspect contact card | "6306260243" shown |
| C03 | Phone is a link | Inspect phone element | `href="tel:+916306260243"` |
| C04 | Address visible | Inspect contact card | "Ghurwara Raebareli (UP)" shown |
| C05 | Pin code visible | Inspect contact card | "229125" shown |
| C06 | Consistent everywhere | Check homepage, about, post, dashboard footers | Same name, phone, address, pin code |
| C07 | Single source | Edit `assets/site.js` | All pages update from `window.SITE` |
| C08 | Brand unchanged | Inspect logo/header | Still "MyBlog" (not renamed) |

## 2. Homepage About section

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| A01 | Section renders | Load homepage, scroll down | "About MyBlog" section visible above newsletter |
| A02 | Mission text | Inspect section | Mission line + explanation present |
| A03 | Stats | Inspect stat tiles | 4 tiles: 10 Articles, 7 Topics, 5 Authors, 100% Free |
| A04 | Topics chips | Inspect chip list | 7 chips: React, CSS, JavaScript, UX, SEO, DevOps, Writing |
| A05 | Author cards | Inspect author grid | 5 cards with avatar initials, name, role, bio |
| A06 | Contact card | Inspect contact card | Phone, address, pin code, email rows |
| A07 | CTA to about page | Click "Full about page →" | `about/about.html` opens |
| A08 | Section order | Inspect page flow | Posts → About → Newsletter → Footer |

## 3. About page

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| B01 | Page loads | Open `about/about.html` | Hero "About MyBlog" + intro visible |
| B02 | Who we are | Inspect section | 2 paragraphs + mission |
| B03 | Topics list | Inspect bullets | 7 topics explained one line each |
| B04 | By the numbers | Inspect stats | Same 4 stat tiles as homepage |
| B05 | Meet the authors | Inspect author grid | 5 author cards |
| B06 | Contact card | Inspect contact card | All 4 contact rows + form |
| B07 | Form validation — name | Submit with short name | Error "Enter your name." |
| B08 | Form validation — email | Submit with invalid email | Error "Enter a valid email address." |
| B09 | Form validation — message | Submit with short message | Error "Message thoda detail me likho (10+ characters)." |
| B10 | Form success | Fill valid details, submit | Green success message, fields cleared |
| B11 | Articles CTA | Click "Latest articles padhein" | Homepage posts section |
| B12 | Header link | Click "About" in header | Same about page (no reload loop) |

## 4. Navigation from other pages

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| N01 | Post reader | Open an article, click header "About" | About page opens |
| N02 | Dashboard | Click "About" in dashboard header | About page opens |
| N03 | Auth page | Click "About" in auth header | About page opens |
| N04 | Footer link | Click "Full about page" in any footer | About page opens |
| N05 | Back home | Click logo on about page | Homepage opens |

## 5. Theme + Responsive

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| T01 | Dark mode | Toggle theme on about page | Cards, chips, stats, contact rows all readable |
| T02 | Theme persistence | Reload after toggle | Theme stays |
| R01 | Mobile 375px | Resize to 375px | Stats 2-col, authors 1-col, no horizontal scroll |
| R02 | Desktop | Resize to 1280px | Stats 4-col, authors auto-fit row |
| R03 | Contact form mobile | Fill form at 375px | Fields full width, button full width |
