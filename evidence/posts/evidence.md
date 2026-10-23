# Playwright Evidence — Articles & Reader Page

> **Generated:** 2026-10-22T08:21:06.560Z
> **Feature:** Content — 10 articles, reader page, table of contents, related posts
> **Spec file:** `tests/posts.spec.js`
> **Base URL:** http://127.0.0.1:8099
> **Projects:** desktop-chromium, mobile-chromium

## Summary

| Metric | Value |
| ------ | ----- |
| Total executed | 54 |
| Passed | 54 |
| Failed | 0 |
| Skipped | 0 |

Screenshots aur videos shared folder me hain: `../screens/` aur `../videos/`.

### desktop-chromium — 27 passed, 0 failed, 0 skipped

| # | Test case | Status | Duration | Screenshot | Video | Source |
| - | --------- | ------ | -------- | ---------- | ----- | ------ |
| 1 | C01 - all 10 articles are loaded | ✅ PASS | 2.2s | [screenshot](../screens/desktop-chromium-c01-all-10-articles-are-loaded.png) | [video](../videos/desktop-chromium-c01-all-10-articles-are-loaded.webm) | `posts.spec.js:8` |
| 2 | C02 - slugs are unique and kebab-case | ✅ PASS | 2.1s | [screenshot](../screens/desktop-chromium-c02-slugs-are-unique-and-kebab-case.png) | [video](../videos/desktop-chromium-c02-slugs-are-unique-and-kebab-case.webm) | `posts.spec.js:14` |
| 3 | C03 - every article has the required fields | ✅ PASS | 2.4s | [screenshot](../screens/desktop-chromium-c03-every-article-has-the-required-fields.png) | [video](../videos/desktop-chromium-c03-every-article-has-the-required-fields.webm) | `posts.spec.js:21` |
| 4 | C04 - every article body is long-form with several sections | ✅ PASS | 2.5s | [screenshot](../screens/desktop-chromium-c04-every-article-body-is-long-form-with-several-sections.png) | [video](../videos/desktop-chromium-c04-every-article-body-is-long-form-with-several-sections.webm) | `posts.spec.js:34` |
| 5 | E01 - an unknown slug shows the not-found state | ✅ PASS | 1.8s | [screenshot](../screens/desktop-chromium-e01-an-unknown-slug-shows-the-not-found-state.png) | [video](../videos/desktop-chromium-e01-an-unknown-slug-shows-the-not-found-state.webm) | `posts.spec.js:193` |
| 6 | E02 - no slug at all shows the not-found state | ✅ PASS | 1.8s | [screenshot](../screens/desktop-chromium-e02-no-slug-at-all-shows-the-not-found-state.png) | [video](../videos/desktop-chromium-e02-no-slug-at-all-shows-the-not-found-state.webm) | `posts.spec.js:199` |
| 7 | E03 - a direct article URL renders fully | ✅ PASS | 2.2s | [screenshot](../screens/desktop-chromium-e03-a-direct-article-url-renders-fully.png) | [video](../videos/desktop-chromium-e03-a-direct-article-url-renders-fully.webm) | `posts.spec.js:204` |
| 8 | L01 - 10 cards render | ✅ PASS | 2.3s | [screenshot](../screens/desktop-chromium-l01-10-cards-render.png) | [video](../videos/desktop-chromium-l01-10-cards-render.webm) | `posts.spec.js:56` |
| 9 | L02 - cards show read time and author | ✅ PASS | 2.4s | [screenshot](../screens/desktop-chromium-l02-cards-show-read-time-and-author.png) | [video](../videos/desktop-chromium-l02-cards-show-read-time-and-author.webm) | `posts.spec.js:60` |
| 10 | L03 - every card links to the reader page | ✅ PASS | 2.6s | [screenshot](../screens/desktop-chromium-l03-every-card-links-to-the-reader-page.png) | [video](../videos/desktop-chromium-l03-every-card-links-to-the-reader-page.webm) | `posts.spec.js:64` |
| 11 | N01 - back link returns to the posts grid | ✅ PASS | 2.8s | [screenshot](../screens/desktop-chromium-n01-back-link-returns-to-the-posts-grid.png) | [video](../videos/desktop-chromium-n01-back-link-returns-to-the-posts-grid.webm) | `posts.spec.js:164` |
| 12 | N02 - the newsletter link jumps to the newsletter section | ✅ PASS | 3.0s | [screenshot](../screens/desktop-chromium-n02-the-newsletter-link-jumps-to-the-newsletter-section.png) | [video](../videos/desktop-chromium-n02-the-newsletter-link-jumps-to-the-newsletter-section.webm) | `posts.spec.js:171` |
| 13 | N03 - three related posts are shown | ✅ PASS | 2.5s | [screenshot](../screens/desktop-chromium-n03-three-related-posts-are-shown.png) | [video](../videos/desktop-chromium-n03-three-related-posts-are-shown.webm) | `posts.spec.js:179` |
| 14 | N04 - a related card opens another article | ✅ PASS | 2.7s | [screenshot](../screens/desktop-chromium-n04-a-related-card-opens-another-article.png) | [video](../videos/desktop-chromium-n04-a-related-card-opens-another-article.webm) | `posts.spec.js:184` |
| 15 | R01 - clicking a card opens the matching article | ✅ PASS | 2.8s | [screenshot](../screens/desktop-chromium-r01-clicking-a-card-opens-the-matching-article.png) | [video](../videos/desktop-chromium-r01-clicking-a-card-opens-the-matching-article.webm) | `posts.spec.js:74` |
| 16 | R02 - the article title matches the data | ✅ PASS | 2.3s | [screenshot](../screens/desktop-chromium-r02-the-article-title-matches-the-data.png) | [video](../videos/desktop-chromium-r02-the-article-title-matches-the-data.webm) | `posts.spec.js:82` |
| 17 | R03 - author, date and read time are shown | ✅ PASS | 2.0s | [screenshot](../screens/desktop-chromium-r03-author-date-and-read-time-are-shown.png) | [video](../videos/desktop-chromium-r03-author-date-and-read-time-are-shown.webm) | `posts.spec.js:88` |
| 18 | R04 - the cover image is visible with alt text | ✅ PASS | 2.0s | [screenshot](../screens/desktop-chromium-r04-the-cover-image-is-visible-with-alt-text.png) | [video](../videos/desktop-chromium-r04-the-cover-image-is-visible-with-alt-text.webm) | `posts.spec.js:96` |
| 19 | R05 - the article body renders all its sections | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-r05-the-article-body-renders-all-its-sections.png) | [video](../videos/desktop-chromium-r05-the-article-body-renders-all-its-sections.webm) | `posts.spec.js:104` |
| 20 | R06 - code blocks render as preformatted code | ✅ PASS | 2.1s | [screenshot](../screens/desktop-chromium-r06-code-blocks-render-as-preformatted-code.png) | [video](../videos/desktop-chromium-r06-code-blocks-render-as-preformatted-code.webm) | `posts.spec.js:110` |
| 21 | R07 - tables render with header cells | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-r07-tables-render-with-header-cells.png) | [video](../videos/desktop-chromium-r07-tables-render-with-header-cells.webm) | `posts.spec.js:117` |
| 22 | R08 - the document title follows the article | ✅ PASS | 1.8s | [screenshot](../screens/desktop-chromium-r08-the-document-title-follows-the-article.png) | [video](../videos/desktop-chromium-r08-the-document-title-follows-the-article.webm) | `posts.spec.js:123` |
| 23 | R09 - the meta description follows the article | ✅ PASS | 2.2s | [screenshot](../screens/desktop-chromium-r09-the-meta-description-follows-the-article.png) | [video](../videos/desktop-chromium-r09-the-meta-description-follows-the-article.webm) | `posts.spec.js:128` |
| 24 | T01 - the table of contents is visible | ✅ PASS | 2.3s | [screenshot](../screens/desktop-chromium-t01-the-table-of-contents-is-visible.png) | [video](../videos/desktop-chromium-t01-the-table-of-contents-is-visible.webm) | `posts.spec.js:140` |
| 25 | T02 - one entry per H2 section | ✅ PASS | 2.0s | [screenshot](../screens/desktop-chromium-t02-one-entry-per-h2-section.png) | [video](../videos/desktop-chromium-t02-one-entry-per-h2-section.webm) | `posts.spec.js:144` |
| 26 | T03 - clicking an entry jumps to that section | ✅ PASS | 2.9s | [screenshot](../screens/desktop-chromium-t03-clicking-an-entry-jumps-to-that-section.png) | [video](../videos/desktop-chromium-t03-clicking-an-entry-jumps-to-that-section.webm) | `posts.spec.js:150` |
| 27 | T04 - the table of contents collapses | ✅ PASS | 2.6s | [screenshot](../screens/desktop-chromium-t04-the-table-of-contents-collapses.png) | [video](../videos/desktop-chromium-t04-the-table-of-contents-collapses.webm) | `posts.spec.js:157` |

### mobile-chromium — 27 passed, 0 failed, 0 skipped

| # | Test case | Status | Duration | Screenshot | Video | Source |
| - | --------- | ------ | -------- | ---------- | ----- | ------ |
| 1 | C01 - all 10 articles are loaded | ✅ PASS | 2.1s | [screenshot](../screens/mobile-chromium-c01-all-10-articles-are-loaded.png) | [video](../videos/mobile-chromium-c01-all-10-articles-are-loaded.webm) | `posts.spec.js:8` |
| 2 | C02 - slugs are unique and kebab-case | ✅ PASS | 2.6s | [screenshot](../screens/mobile-chromium-c02-slugs-are-unique-and-kebab-case.png) | [video](../videos/mobile-chromium-c02-slugs-are-unique-and-kebab-case.webm) | `posts.spec.js:14` |
| 3 | C03 - every article has the required fields | ✅ PASS | 2.5s | [screenshot](../screens/mobile-chromium-c03-every-article-has-the-required-fields.png) | [video](../videos/mobile-chromium-c03-every-article-has-the-required-fields.webm) | `posts.spec.js:21` |
| 4 | C04 - every article body is long-form with several sections | ✅ PASS | 2.4s | [screenshot](../screens/mobile-chromium-c04-every-article-body-is-long-form-with-several-sections.png) | [video](../videos/mobile-chromium-c04-every-article-body-is-long-form-with-several-sections.webm) | `posts.spec.js:34` |
| 5 | E01 - an unknown slug shows the not-found state | ✅ PASS | 2.0s | [screenshot](../screens/mobile-chromium-e01-an-unknown-slug-shows-the-not-found-state.png) | [video](../videos/mobile-chromium-e01-an-unknown-slug-shows-the-not-found-state.webm) | `posts.spec.js:193` |
| 6 | E02 - no slug at all shows the not-found state | ✅ PASS | 2.0s | [screenshot](../screens/mobile-chromium-e02-no-slug-at-all-shows-the-not-found-state.png) | [video](../videos/mobile-chromium-e02-no-slug-at-all-shows-the-not-found-state.webm) | `posts.spec.js:199` |
| 7 | E03 - a direct article URL renders fully | ✅ PASS | 2.1s | [screenshot](../screens/mobile-chromium-e03-a-direct-article-url-renders-fully.png) | [video](../videos/mobile-chromium-e03-a-direct-article-url-renders-fully.webm) | `posts.spec.js:204` |
| 8 | L01 - 10 cards render | ✅ PASS | 2.4s | [screenshot](../screens/mobile-chromium-l01-10-cards-render.png) | [video](../videos/mobile-chromium-l01-10-cards-render.webm) | `posts.spec.js:56` |
| 9 | L02 - cards show read time and author | ✅ PASS | 2.0s | [screenshot](../screens/mobile-chromium-l02-cards-show-read-time-and-author.png) | [video](../videos/mobile-chromium-l02-cards-show-read-time-and-author.webm) | `posts.spec.js:60` |
| 10 | L03 - every card links to the reader page | ✅ PASS | 2.4s | [screenshot](../screens/mobile-chromium-l03-every-card-links-to-the-reader-page.png) | [video](../videos/mobile-chromium-l03-every-card-links-to-the-reader-page.webm) | `posts.spec.js:64` |
| 11 | N01 - back link returns to the posts grid | ✅ PASS | 2.9s | [screenshot](../screens/mobile-chromium-n01-back-link-returns-to-the-posts-grid.png) | [video](../videos/mobile-chromium-n01-back-link-returns-to-the-posts-grid.webm) | `posts.spec.js:164` |
| 12 | N02 - the newsletter link jumps to the newsletter section | ✅ PASS | 2.6s | [screenshot](../screens/mobile-chromium-n02-the-newsletter-link-jumps-to-the-newsletter-section.png) | [video](../videos/mobile-chromium-n02-the-newsletter-link-jumps-to-the-newsletter-section.webm) | `posts.spec.js:171` |
| 13 | N03 - three related posts are shown | ✅ PASS | 1.8s | [screenshot](../screens/mobile-chromium-n03-three-related-posts-are-shown.png) | [video](../videos/mobile-chromium-n03-three-related-posts-are-shown.webm) | `posts.spec.js:179` |
| 14 | N04 - a related card opens another article | ✅ PASS | 2.5s | [screenshot](../screens/mobile-chromium-n04-a-related-card-opens-another-article.png) | [video](../videos/mobile-chromium-n04-a-related-card-opens-another-article.webm) | `posts.spec.js:184` |
| 15 | R01 - clicking a card opens the matching article | ✅ PASS | 2.9s | [screenshot](../screens/mobile-chromium-r01-clicking-a-card-opens-the-matching-article.png) | [video](../videos/mobile-chromium-r01-clicking-a-card-opens-the-matching-article.webm) | `posts.spec.js:74` |
| 16 | R02 - the article title matches the data | ✅ PASS | 2.5s | [screenshot](../screens/mobile-chromium-r02-the-article-title-matches-the-data.png) | [video](../videos/mobile-chromium-r02-the-article-title-matches-the-data.webm) | `posts.spec.js:82` |
| 17 | R03 - author, date and read time are shown | ✅ PASS | 2.5s | [screenshot](../screens/mobile-chromium-r03-author-date-and-read-time-are-shown.png) | [video](../videos/mobile-chromium-r03-author-date-and-read-time-are-shown.webm) | `posts.spec.js:88` |
| 18 | R04 - the cover image is visible with alt text | ✅ PASS | 2.4s | [screenshot](../screens/mobile-chromium-r04-the-cover-image-is-visible-with-alt-text.png) | [video](../videos/mobile-chromium-r04-the-cover-image-is-visible-with-alt-text.webm) | `posts.spec.js:96` |
| 19 | R05 - the article body renders all its sections | ✅ PASS | 2.6s | [screenshot](../screens/mobile-chromium-r05-the-article-body-renders-all-its-sections.png) | [video](../videos/mobile-chromium-r05-the-article-body-renders-all-its-sections.webm) | `posts.spec.js:104` |
| 20 | R06 - code blocks render as preformatted code | ✅ PASS | 2.6s | [screenshot](../screens/mobile-chromium-r06-code-blocks-render-as-preformatted-code.png) | [video](../videos/mobile-chromium-r06-code-blocks-render-as-preformatted-code.webm) | `posts.spec.js:110` |
| 21 | R07 - tables render with header cells | ✅ PASS | 2.2s | [screenshot](../screens/mobile-chromium-r07-tables-render-with-header-cells.png) | [video](../videos/mobile-chromium-r07-tables-render-with-header-cells.webm) | `posts.spec.js:117` |
| 22 | R08 - the document title follows the article | ✅ PASS | 2.3s | [screenshot](../screens/mobile-chromium-r08-the-document-title-follows-the-article.png) | [video](../videos/mobile-chromium-r08-the-document-title-follows-the-article.webm) | `posts.spec.js:123` |
| 23 | R09 - the meta description follows the article | ✅ PASS | 2.3s | [screenshot](../screens/mobile-chromium-r09-the-meta-description-follows-the-article.png) | [video](../videos/mobile-chromium-r09-the-meta-description-follows-the-article.webm) | `posts.spec.js:128` |
| 24 | T01 - the table of contents is visible | ✅ PASS | 2.3s | [screenshot](../screens/mobile-chromium-t01-the-table-of-contents-is-visible.png) | [video](../videos/mobile-chromium-t01-the-table-of-contents-is-visible.webm) | `posts.spec.js:140` |
| 25 | T02 - one entry per H2 section | ✅ PASS | 2.1s | [screenshot](../screens/mobile-chromium-t02-one-entry-per-h2-section.png) | [video](../videos/mobile-chromium-t02-one-entry-per-h2-section.webm) | `posts.spec.js:144` |
| 26 | T03 - clicking an entry jumps to that section | ✅ PASS | 2.8s | [screenshot](../screens/mobile-chromium-t03-clicking-an-entry-jumps-to-that-section.png) | [video](../videos/mobile-chromium-t03-clicking-an-entry-jumps-to-that-section.webm) | `posts.spec.js:150` |
| 27 | T04 - the table of contents collapses | ✅ PASS | 2.2s | [screenshot](../screens/mobile-chromium-t04-the-table-of-contents-collapses.png) | [video](../videos/mobile-chromium-t04-the-table-of-contents-collapses.webm) | `posts.spec.js:157` |

## Failed cases

None — every executed case passed. 🎉

[← Back to master evidence](../evidence.md)
