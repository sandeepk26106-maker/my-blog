# Test Cases: Blog Website Homepage

> Stack: React · Route: `/` (homepage)

## 1. Header

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| H01 | Logo is visible | Load the page | Logo/brand appears top-left |
| H02 | Nav links visible | Inspect header | Home, Blog, About, Contact visible |
| H03 | Nav links navigate | Click each link | Correct page/anchor reached |
| H04 | Search icon present | Inspect header | Search icon/button visible |
| H05 | Subscribe CTA works | Click Subscribe | Scrolls to newsletter section |
| H06 | Sticky header | Scroll down | Header stays fixed/sticky |

## 2. Hero

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| HE01 | Hero renders | Load the page | Title + tagline + CTA visible |
| HE02 | Hero CTA works | Click Start Reading | Scrolls to posts grid |

## 3. Blog Posts Grid

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| L01 | 6 posts render | Load the page | Exactly 6 cards in grid |
| L02 | Card fields correct | Inspect a card | Cover, title, excerpt, author, date, category visible |
| L03 | Images have alt text | Inspect images | Each cover has non-empty alt |
| L04 | Search filters (if implemented) | Type query in search | Grid filters by title, empty state if no match |

## 4. Newsletter

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| N01 | Newsletter visible | Scroll to newsletter | Heading + email input + button visible |
| N02 | Valid email | Enter valid email, submit | Success message shown |
| N03 | Invalid email | Enter invalid email, submit | Error message shown |

## 5. Footer

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| F01 | Footer visible | Scroll to bottom | Footer with link columns appears |
| F02 | Footer links work | Click each link | Correct destination or placeholder |
| F03 | Copyright present | Inspect footer | Copyright text visible |

## 6. Theme + Responsive

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| T01 | Dark mode toggle | Click theme toggle | Theme switches light <-> dark, persists if specified |
| R01 | Mobile 375px | Resize to 375px width | 1-column grid, no horizontal scroll |
| R02 | Tablet 768px | Resize to 768px width | 2-column grid, layout adapts |
| R03 | Desktop 1280px | Resize to 1280px width | 3-column grid |
