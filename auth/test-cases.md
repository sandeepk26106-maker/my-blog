# Test Cases: Blog Website — Login & Signup

> Pages: `auth/auth.html`, `auth/dashboard.html` · Store: `localStorage`

## 1. Auth page — tabs & layout

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| A01 | Auth page renders | Open `auth/auth.html` | Card with Login/Sign up tabs visible |
| A02 | Default tab | Load page | "Login" tab active, login form shown |
| A03 | Switch to Sign up | Click "Sign up" tab | Signup form (name, email, password, confirm) shown |
| A04 | Error cleared on tab switch | Trigger error, switch tab | Error message disappears |
| A05 | Cross-link to signup | Click "Create an account" | Signup tab active |
| A06 | Cross-link to login | Click "Login" (signup view) | Login tab active |
| A07 | Back to home | Click "← Back to home" | Homepage loads |

## 2. Signup validation

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| S01 | Empty name | Submit with blank name | Error "Enter your name (at least 2 characters)." |
| S02 | Invalid email | Enter "abc@", submit | Error "Enter a valid email address." |
| S03 | Short password | Password "123", submit | Error "Password must be at least 6 characters." |
| S04 | Password mismatch | Different confirm, submit | Error "Passwords do not match." |
| S05 | Valid signup | Fill all fields correctly, submit | Success message, redirect to dashboard |
| S06 | User created | After S05, check `myblog_users` | 1 user stored with name + email |
| S07 | Duplicate email | Signup again with same email | Error "An account with this email already exists." |
| S08 | Auto-login | After S05, check `myblog_session` | Session set for new user |

## 3. Login

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| L01 | Invalid email | Enter "notanemail", submit | Error "Enter a valid email address." |
| L02 | Empty password | Enter email only, submit | Error "Enter your password." |
| L03 | Wrong password | Registered email + wrong password | Error "Invalid email or password." |
| L04 | Unknown user | Unregistered email + any password | Error "Invalid email or password." |
| L05 | Valid login | Registered email + correct password | Success message → dashboard |
| L06 | Session stored | After L05 | `myblog_session` contains userId, email, name, loginAt |
| L07 | Already signed in | Open auth page while logged in | "You are already signed in as {name}" + dashboard link |

## 4. Dashboard (protected)

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| D01 | Anonymous blocked | Log out, open `dashboard.html` | Redirected to `auth.html` |
| D02 | Greeting | Log in, open dashboard | "Welcome, {name}" shown |
| D03 | Profile rows | Inspect profile card | Name, Email, Signed in at, Saved posts = 0 |
| D04 | Quick action | Click "Read latest posts" | Homepage opens at posts section |
| D05 | Log out button | Click "Log out" | Session cleared, homepage shown |
| D06 | Header log out | Use header "Log out" button | Session cleared, homepage shown |
| D07 | No back-loop | After D01, browser Back | Still not on dashboard |

## 5. Homepage integration

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| H01 | Login link | Logged out, load homepage | Header shows "Login" → `auth/auth.html` |
| H02 | Greeting link | Logged in, load homepage | Header shows "Hi, {name}" → `auth/dashboard.html` |
| H03 | Logout from homepage | Log out in another tab | Homepage header updates (storage event) |
| H04 | Footer auth link | Click "Login / Sign up" in footer | Auth page opens |

## 6. Theme + Responsive

| ID | Scenario | Steps | Expected Result |
| --- | -------- | ----- | --------------- |
| T01 | Theme toggle | Click moon/sun on auth page | Theme switches, persists across pages |
| T02 | Dark contrast | Switch to dark | Text, borders and errors remain readable |
| R01 | Mobile 375px | Resize to 375px | Card fills width, no horizontal scroll |
| R02 | Desktop | Resize to 1280px | Card centred, max-width ~440px |
