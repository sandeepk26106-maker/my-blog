# Playwright Evidence — Login / Signup / Dashboard

> **Generated:** 2026-10-22T08:21:06.559Z
> **Feature:** Auth — signup, login, validation, protected dashboard
> **Spec file:** `tests/auth.spec.js`
> **Base URL:** http://127.0.0.1:8099
> **Projects:** desktop-chromium, mobile-chromium

## Summary

| Metric | Value |
| ------ | ----- |
| Total executed | 58 |
| Passed | 58 |
| Failed | 0 |
| Skipped | 0 |

Screenshots aur videos shared folder me hain: `../screens/` aur `../videos/`.

### desktop-chromium — 29 passed, 0 failed, 0 skipped

| # | Test case | Status | Duration | Screenshot | Video | Source |
| - | --------- | ------ | -------- | ---------- | ----- | ------ |
| 1 | A01 - auth page renders both tabs | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-a01-auth-page-renders-both-tabs.png) | [video](../videos/desktop-chromium-a01-auth-page-renders-both-tabs.webm) | `auth.spec.js:8` |
| 2 | A02 - login tab is active by default | ✅ PASS | 2.2s | [screenshot](../screens/desktop-chromium-a02-login-tab-is-active-by-default.png) | [video](../videos/desktop-chromium-a02-login-tab-is-active-by-default.webm) | `auth.spec.js:14` |
| 3 | A03 - switching to sign up shows the signup fields | ✅ PASS | 1.8s | [screenshot](../screens/desktop-chromium-a03-switching-to-sign-up-shows-the-signup-fields.png) | [video](../videos/desktop-chromium-a03-switching-to-sign-up-shows-the-signup-fields.webm) | `auth.spec.js:20` |
| 4 | A04 - switching tabs clears the error message | ✅ PASS | 3.0s | [screenshot](../screens/desktop-chromium-a04-switching-tabs-clears-the-error-message.png) | [video](../videos/desktop-chromium-a04-switching-tabs-clears-the-error-message.webm) | `auth.spec.js:27` |
| 5 | A05 - cross-link opens the sign up tab | ✅ PASS | 3.0s | [screenshot](../screens/desktop-chromium-a05-cross-link-opens-the-sign-up-tab.png) | [video](../videos/desktop-chromium-a05-cross-link-opens-the-sign-up-tab.webm) | `auth.spec.js:37` |
| 6 | A06 - cross-link returns to the login tab | ✅ PASS | 2.4s | [screenshot](../screens/desktop-chromium-a06-cross-link-returns-to-the-login-tab.png) | [video](../videos/desktop-chromium-a06-cross-link-returns-to-the-login-tab.webm) | `auth.spec.js:43` |
| 7 | A07 - back to home link returns to the homepage | ✅ PASS | 3.6s | [screenshot](../screens/desktop-chromium-a07-back-to-home-link-returns-to-the-homepage.png) | [video](../videos/desktop-chromium-a07-back-to-home-link-returns-to-the-homepage.webm) | `auth.spec.js:50` |
| 8 | D01 - anonymous visitors are redirected to the auth page | ✅ PASS | 2.3s | [screenshot](../screens/desktop-chromium-d01-anonymous-visitors-are-redirected-to-the-auth-page.png) | [video](../videos/desktop-chromium-d01-anonymous-visitors-are-redirected-to-the-auth-page.webm) | `auth.spec.js:253` |
| 9 | D02 - dashboard greets the signed-in user | ✅ PASS | 3.5s | [screenshot](../screens/desktop-chromium-d02-dashboard-greets-the-signed-in-user.png) | [video](../videos/desktop-chromium-d02-dashboard-greets-the-signed-in-user.webm) | `auth.spec.js:259` |
| 10 | D03 - profile rows show name, email, sign-in time and saved posts | ✅ PASS | 3.9s | [screenshot](../screens/desktop-chromium-d03-profile-rows-show-name-email-sign-in-time-and-saved-posts.png) | [video](../videos/desktop-chromium-d03-profile-rows-show-name-email-sign-in-time-and-saved-posts.webm) | `auth.spec.js:272` |
| 11 | D04 - quick action opens the latest posts | ✅ PASS | 4.9s | [screenshot](../screens/desktop-chromium-d04-quick-action-opens-the-latest-posts.png) | [video](../videos/desktop-chromium-d04-quick-action-opens-the-latest-posts.webm) | `auth.spec.js:288` |
| 12 | D05 - logout clears the session and returns home | ✅ PASS | 4.7s | [screenshot](../screens/desktop-chromium-d05-logout-clears-the-session-and-returns-home.png) | [video](../videos/desktop-chromium-d05-logout-clears-the-session-and-returns-home.webm) | `auth.spec.js:303` |
| 13 | D06 - the header logout button also clears the session | ✅ PASS | 4.1s | [screenshot](../screens/desktop-chromium-d06-the-header-logout-button-also-clears-the-session.png) | [video](../videos/desktop-chromium-d06-the-header-logout-button-also-clears-the-session.webm) | `auth.spec.js:320` |
| 14 | D07 - going back does not reopen the protected dashboard | ✅ PASS | 2.8s | [screenshot](../screens/desktop-chromium-d07-going-back-does-not-reopen-the-protected-dashboard.png) | [video](../videos/desktop-chromium-d07-going-back-does-not-reopen-the-protected-dashboard.webm) | `auth.spec.js:337` |
| 15 | L01 - invalid email is rejected | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-l01-invalid-email-is-rejected.png) | [video](../videos/desktop-chromium-l01-invalid-email-is-rejected.webm) | `auth.spec.js:159` |
| 16 | L02 - empty password is rejected | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-l02-empty-password-is-rejected.png) | [video](../videos/desktop-chromium-l02-empty-password-is-rejected.webm) | `auth.spec.js:167` |
| 17 | L03 - wrong password is rejected | ✅ PASS | 4.8s | [screenshot](../screens/desktop-chromium-l03-wrong-password-is-rejected.png) | [video](../videos/desktop-chromium-l03-wrong-password-is-rejected.webm) | `auth.spec.js:174` |
| 18 | L04 - unknown user is rejected | ✅ PASS | 2.0s | [screenshot](../screens/desktop-chromium-l04-unknown-user-is-rejected.png) | [video](../videos/desktop-chromium-l04-unknown-user-is-rejected.webm) | `auth.spec.js:192` |
| 19 | L05 - valid login opens the dashboard | ✅ PASS | 6.3s | [screenshot](../screens/desktop-chromium-l05-valid-login-opens-the-dashboard.png) | [video](../videos/desktop-chromium-l05-valid-login-opens-the-dashboard.webm) | `auth.spec.js:200` |
| 20 | L06 - session is stored after login | ✅ PASS | 3.8s | [screenshot](../screens/desktop-chromium-l06-session-is-stored-after-login.png) | [video](../videos/desktop-chromium-l06-session-is-stored-after-login.webm) | `auth.spec.js:219` |
| 21 | L07 - already signed-in users see a notice | ✅ PASS | 4.0s | [screenshot](../screens/desktop-chromium-l07-already-signed-in-users-see-a-notice.png) | [video](../videos/desktop-chromium-l07-already-signed-in-users-see-a-notice.webm) | `auth.spec.js:235` |
| 22 | S01 - empty name is rejected | ✅ PASS | 2.5s | [screenshot](../screens/desktop-chromium-s01-empty-name-is-rejected.png) | [video](../videos/desktop-chromium-s01-empty-name-is-rejected.webm) | `auth.spec.js:64` |
| 23 | S02 - invalid email is rejected | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-s02-invalid-email-is-rejected.png) | [video](../videos/desktop-chromium-s02-invalid-email-is-rejected.webm) | `auth.spec.js:72` |
| 24 | S03 - short password is rejected | ✅ PASS | 1.9s | [screenshot](../screens/desktop-chromium-s03-short-password-is-rejected.png) | [video](../videos/desktop-chromium-s03-short-password-is-rejected.webm) | `auth.spec.js:81` |
| 25 | S04 - mismatched passwords are rejected | ✅ PASS | 2.4s | [screenshot](../screens/desktop-chromium-s04-mismatched-passwords-are-rejected.png) | [video](../videos/desktop-chromium-s04-mismatched-passwords-are-rejected.webm) | `auth.spec.js:90` |
| 26 | S05 - valid signup succeeds and redirects to the dashboard | ✅ PASS | 4.8s | [screenshot](../screens/desktop-chromium-s05-valid-signup-succeeds-and-redirects-to-the-dashboard.png) | [video](../videos/desktop-chromium-s05-valid-signup-succeeds-and-redirects-to-the-dashboard.webm) | `auth.spec.js:99` |
| 27 | S06 - the new user is stored | ✅ PASS | 3.4s | [screenshot](../screens/desktop-chromium-s06-the-new-user-is-stored.png) | [video](../videos/desktop-chromium-s06-the-new-user-is-stored.webm) | `auth.spec.js:110` |
| 28 | S07 - duplicate email is blocked | ✅ PASS | 6.5s | [screenshot](../screens/desktop-chromium-s07-duplicate-email-is-blocked.png) | [video](../videos/desktop-chromium-s07-duplicate-email-is-blocked.webm) | `auth.spec.js:122` |
| 29 | S08 - signup logs the user in automatically | ✅ PASS | 3.5s | [screenshot](../screens/desktop-chromium-s08-signup-logs-the-user-in-automatically.png) | [video](../videos/desktop-chromium-s08-signup-logs-the-user-in-automatically.webm) | `auth.spec.js:144` |

### mobile-chromium — 29 passed, 0 failed, 0 skipped

| # | Test case | Status | Duration | Screenshot | Video | Source |
| - | --------- | ------ | -------- | ---------- | ----- | ------ |
| 1 | A01 - auth page renders both tabs | ✅ PASS | 2.1s | [screenshot](../screens/mobile-chromium-a01-auth-page-renders-both-tabs.png) | [video](../videos/mobile-chromium-a01-auth-page-renders-both-tabs.webm) | `auth.spec.js:8` |
| 2 | A02 - login tab is active by default | ✅ PASS | 1.7s | [screenshot](../screens/mobile-chromium-a02-login-tab-is-active-by-default.png) | [video](../videos/mobile-chromium-a02-login-tab-is-active-by-default.webm) | `auth.spec.js:14` |
| 3 | A03 - switching to sign up shows the signup fields | ✅ PASS | 2.0s | [screenshot](../screens/mobile-chromium-a03-switching-to-sign-up-shows-the-signup-fields.png) | [video](../videos/mobile-chromium-a03-switching-to-sign-up-shows-the-signup-fields.webm) | `auth.spec.js:20` |
| 4 | A04 - switching tabs clears the error message | ✅ PASS | 2.3s | [screenshot](../screens/mobile-chromium-a04-switching-tabs-clears-the-error-message.png) | [video](../videos/mobile-chromium-a04-switching-tabs-clears-the-error-message.webm) | `auth.spec.js:27` |
| 5 | A05 - cross-link opens the sign up tab | ✅ PASS | 2.0s | [screenshot](../screens/mobile-chromium-a05-cross-link-opens-the-sign-up-tab.png) | [video](../videos/mobile-chromium-a05-cross-link-opens-the-sign-up-tab.webm) | `auth.spec.js:37` |
| 6 | A06 - cross-link returns to the login tab | ✅ PASS | 1.8s | [screenshot](../screens/mobile-chromium-a06-cross-link-returns-to-the-login-tab.png) | [video](../videos/mobile-chromium-a06-cross-link-returns-to-the-login-tab.webm) | `auth.spec.js:43` |
| 7 | A07 - back to home link returns to the homepage | ✅ PASS | 2.8s | [screenshot](../screens/mobile-chromium-a07-back-to-home-link-returns-to-the-homepage.png) | [video](../videos/mobile-chromium-a07-back-to-home-link-returns-to-the-homepage.webm) | `auth.spec.js:50` |
| 8 | D01 - anonymous visitors are redirected to the auth page | ✅ PASS | 3.1s | [screenshot](../screens/mobile-chromium-d01-anonymous-visitors-are-redirected-to-the-auth-page.png) | [video](../videos/mobile-chromium-d01-anonymous-visitors-are-redirected-to-the-auth-page.webm) | `auth.spec.js:253` |
| 9 | D02 - dashboard greets the signed-in user | ✅ PASS | 3.7s | [screenshot](../screens/mobile-chromium-d02-dashboard-greets-the-signed-in-user.png) | [video](../videos/mobile-chromium-d02-dashboard-greets-the-signed-in-user.webm) | `auth.spec.js:259` |
| 10 | D03 - profile rows show name, email, sign-in time and saved posts | ✅ PASS | 3.9s | [screenshot](../screens/mobile-chromium-d03-profile-rows-show-name-email-sign-in-time-and-saved-posts.png) | [video](../videos/mobile-chromium-d03-profile-rows-show-name-email-sign-in-time-and-saved-posts.webm) | `auth.spec.js:272` |
| 11 | D04 - quick action opens the latest posts | ✅ PASS | 5.0s | [screenshot](../screens/mobile-chromium-d04-quick-action-opens-the-latest-posts.png) | [video](../videos/mobile-chromium-d04-quick-action-opens-the-latest-posts.webm) | `auth.spec.js:288` |
| 12 | D05 - logout clears the session and returns home | ✅ PASS | 5.1s | [screenshot](../screens/mobile-chromium-d05-logout-clears-the-session-and-returns-home.png) | [video](../videos/mobile-chromium-d05-logout-clears-the-session-and-returns-home.webm) | `auth.spec.js:303` |
| 13 | D06 - the header logout button also clears the session | ✅ PASS | 4.4s | [screenshot](../screens/mobile-chromium-d06-the-header-logout-button-also-clears-the-session.png) | [video](../videos/mobile-chromium-d06-the-header-logout-button-also-clears-the-session.webm) | `auth.spec.js:320` |
| 14 | D07 - going back does not reopen the protected dashboard | ✅ PASS | 2.7s | [screenshot](../screens/mobile-chromium-d07-going-back-does-not-reopen-the-protected-dashboard.png) | [video](../videos/mobile-chromium-d07-going-back-does-not-reopen-the-protected-dashboard.webm) | `auth.spec.js:337` |
| 15 | L01 - invalid email is rejected | ✅ PASS | 2.1s | [screenshot](../screens/mobile-chromium-l01-invalid-email-is-rejected.png) | [video](../videos/mobile-chromium-l01-invalid-email-is-rejected.webm) | `auth.spec.js:159` |
| 16 | L02 - empty password is rejected | ✅ PASS | 2.2s | [screenshot](../screens/mobile-chromium-l02-empty-password-is-rejected.png) | [video](../videos/mobile-chromium-l02-empty-password-is-rejected.webm) | `auth.spec.js:167` |
| 17 | L03 - wrong password is rejected | ✅ PASS | 4.7s | [screenshot](../screens/mobile-chromium-l03-wrong-password-is-rejected.png) | [video](../videos/mobile-chromium-l03-wrong-password-is-rejected.webm) | `auth.spec.js:174` |
| 18 | L04 - unknown user is rejected | ✅ PASS | 2.0s | [screenshot](../screens/mobile-chromium-l04-unknown-user-is-rejected.png) | [video](../videos/mobile-chromium-l04-unknown-user-is-rejected.webm) | `auth.spec.js:192` |
| 19 | L05 - valid login opens the dashboard | ✅ PASS | 6.4s | [screenshot](../screens/mobile-chromium-l05-valid-login-opens-the-dashboard.png) | [video](../videos/mobile-chromium-l05-valid-login-opens-the-dashboard.webm) | `auth.spec.js:200` |
| 20 | L06 - session is stored after login | ✅ PASS | 3.9s | [screenshot](../screens/mobile-chromium-l06-session-is-stored-after-login.png) | [video](../videos/mobile-chromium-l06-session-is-stored-after-login.webm) | `auth.spec.js:219` |
| 21 | L07 - already signed-in users see a notice | ✅ PASS | 4.7s | [screenshot](../screens/mobile-chromium-l07-already-signed-in-users-see-a-notice.png) | [video](../videos/mobile-chromium-l07-already-signed-in-users-see-a-notice.webm) | `auth.spec.js:235` |
| 22 | S01 - empty name is rejected | ✅ PASS | 2.4s | [screenshot](../screens/mobile-chromium-s01-empty-name-is-rejected.png) | [video](../videos/mobile-chromium-s01-empty-name-is-rejected.webm) | `auth.spec.js:64` |
| 23 | S02 - invalid email is rejected | ✅ PASS | 2.2s | [screenshot](../screens/mobile-chromium-s02-invalid-email-is-rejected.png) | [video](../videos/mobile-chromium-s02-invalid-email-is-rejected.webm) | `auth.spec.js:72` |
| 24 | S03 - short password is rejected | ✅ PASS | 2.3s | [screenshot](../screens/mobile-chromium-s03-short-password-is-rejected.png) | [video](../videos/mobile-chromium-s03-short-password-is-rejected.webm) | `auth.spec.js:81` |
| 25 | S04 - mismatched passwords are rejected | ✅ PASS | 2.4s | [screenshot](../screens/mobile-chromium-s04-mismatched-passwords-are-rejected.png) | [video](../videos/mobile-chromium-s04-mismatched-passwords-are-rejected.webm) | `auth.spec.js:90` |
| 26 | S05 - valid signup succeeds and redirects to the dashboard | ✅ PASS | 3.8s | [screenshot](../screens/mobile-chromium-s05-valid-signup-succeeds-and-redirects-to-the-dashboard.png) | [video](../videos/mobile-chromium-s05-valid-signup-succeeds-and-redirects-to-the-dashboard.webm) | `auth.spec.js:99` |
| 27 | S06 - the new user is stored | ✅ PASS | 3.8s | [screenshot](../screens/mobile-chromium-s06-the-new-user-is-stored.png) | [video](../videos/mobile-chromium-s06-the-new-user-is-stored.webm) | `auth.spec.js:110` |
| 28 | S07 - duplicate email is blocked | ✅ PASS | 6.8s | [screenshot](../screens/mobile-chromium-s07-duplicate-email-is-blocked.png) | [video](../videos/mobile-chromium-s07-duplicate-email-is-blocked.webm) | `auth.spec.js:122` |
| 29 | S08 - signup logs the user in automatically | ✅ PASS | 3.8s | [screenshot](../screens/mobile-chromium-s08-signup-logs-the-user-in-automatically.png) | [video](../videos/mobile-chromium-s08-signup-logs-the-user-in-automatically.webm) | `auth.spec.js:144` |

## Failed cases

None — every executed case passed. 🎉

[← Back to master evidence](../evidence.md)
