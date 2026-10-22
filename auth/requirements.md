# Requirements: Blog Website — Login & Signup

> **Status:** Draft
> **Date:** 2026-10-22
> **Author:** OpenCode Agent
> **Folder:** `BLOG/auth/`

## 1. Overview

Authentication for the MyBlog website: a single page hosting **Login** and
**Sign up** tabs, plus a protected **dashboard** page that only signed-in
users can reach. Auth is a front-end mock — users live in `localStorage`, no
server is involved.

| Page | Path | Access |
| ---- | ---- | ------ |
| Auth (Login + Signup tabs) | `BLOG/auth/auth.html` | Public |
| Dashboard | `BLOG/auth/dashboard.html` | Signed-in only |

## 2. Goals

- Let a visitor create an account with name, email and password
- Let a registered user log in and log out
- Guard the dashboard — anonymous visitors are redirected to the auth page
- Show the signed-in user in the site header
- Keep validation and error messages clear and inline

## 3. Non-Goals (Out of Scope)

- Real backend / API / database (mock store in `localStorage`)
- Email verification, password reset, "forgot password" mail
- OAuth (Google) / mobile OTP login
- User profile editing, avatar upload
- Session expiry / refresh tokens
- Role-based access (admin/user)

## 4. Auth Page (`auth.html`)

| Item | Details |
| ---- | ------- |
| Layout | One card, two tabs: **Login** / **Sign up** |
| Login fields | Email, Password |
| Signup fields | Name, Email, Password, Confirm password |
| Validation | Email regex; name ≥ 2 chars; password ≥ 6 chars; passwords must match |
| Duplicate email | Blocked with "An account with this email already exists." |
| Wrong credentials | "Invalid email or password." |
| Success | Green message → auto-redirect to `dashboard.html` after ~1s |
| Tab switch | Clears error message; cross-links at card bottom |
| Already signed in | Shows "You are already signed in as {name}" + dashboard link + log out |
| Header | Logo (home link), theme toggle, "← Back to home" |

## 5. Dashboard (`dashboard.html`)

| Item | Details |
| ---- | ------- |
| Guard | No session → redirect to `auth.html` (replace, no back-loop) |
| Greeting | "Welcome, {name}" |
| Profile rows | Name, Email, Signed in at, Saved posts (0) |
| Actions | "Read latest posts" link, "Log out" button (×2 placements) |
| Log out | Clears session → redirect to homepage |

## 6. Header Integration (homepage)

| Item | Details |
| ---- | ------- |
| Signed out | "Login" link → `auth/auth.html` |
| Signed in | "Hi, {first name}" link → `auth/dashboard.html` |
| Sync | Header updates on the `storage` event (cross-tab) |

## 7. Data Model

| Store | Key | Shape |
| ----- | --- | ----- |
| Users | `myblog_users` | `[{ id, name, email, password(hash), createdAt }]` |
| Session | `myblog_session` | `{ userId, email, name, loginAt }` |
| Theme | `myblog_theme` | `"light" \| "dark"` |

Shared module: `BLOG/assets/auth.js` → `window.AuthStore`
(`signup`, `login`, `logout`, `getSession`, `getUserByEmail`,
`isValidEmail`, `getTheme`, `setTheme`).

## 8. Design & UX

| Item | Details |
| ---- | ------- |
| Colour scheme | Shared `BLOG/assets/theme.css` (indigo accent, light + dark) |
| Typography | System / Inter |
| Theme | Light + dark, toggle persists in `localStorage` |
| Layout | Centred card, max-width 440px, mobile-first |

## 9. Technical Constraints

| Item | Details |
| ---- | ------- |
| Framework / stack | React 18 via CDN, no build step, Babel standalone |
| Responsive approach | Mobile-first, full-width card under 560px |
| Accessibility level | Labels tied to inputs, `role="alert"`, `role="tab"`, focus outlines, contrast both themes |
| Security note | Passwords are demo-hashed only — never use this pattern in production |

## 10. Open Questions

- [ ] Real backend later, or keep the mock?
- [ ] Add "forgot password" flow?
- [ ] Profile editing / avatar?
