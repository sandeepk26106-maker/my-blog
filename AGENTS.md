# AGENTS.md — BLOG Project

## Project Location (single source of truth)

**ALL blog-related data lives in this folder:**

```
C:\Users\DELL\Desktop\BLOG\
```

Never scatter blog files into other directories (no `rfp/` copies, no
`COLLADGE/` copies). This folder is the canonical location.

## Folder Layout

| Path | Purpose |
| ---- | ------- |
| `index.html` | React blog homepage (CDN, no build step) |
| `requirements.md` | Requirement spec for the blog |
| `test-cases.md` | Acceptance criteria & test scenarios |
| `<feature-name>/` | Per-feature sub-folder, created on demand |

## Conventions

- **New feature/feature folder** → create `BLOG/<kebab-case-feature-name>/`
  and put `requirements.md` + `test-cases.md` there.
- **Folder naming** → lowercase kebab-case, `^[a-z0-9]+(-[a-z0-9]+)*$`, max 64 chars.
- **Stack** → React (function components), single-file HTML with React CDN
  unless the user asks for a Vite/CRA project.
- **Design** → light + dark mode via CSS variables, mobile-first responsive
  (3 cols desktop / 2 tablet / 1 mobile), basic a11y (semantic HTML, alt
  text, keyboard focus, contrast in both themes).
- **Docs** → use the `create-rfp` skill for requirement + test-case docs.
- **QA** → use the `playwright-testing` skill; evidence output stays inside
  this folder.
