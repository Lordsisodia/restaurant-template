# Domain Documentation

Each subfolder maps to a business domain that powers the restaurant experience.

- `about-us/` — Consolidated README covering goals, structure, recent fixes, and backlog.
- `admin/` — Notes on uploaders, seed utilities, and upcoming admin shell work.
- `blog/` — Overview of the blog template architecture and pending UI imports.
- `chat/` — Chat widget/contact experience scaffolding and integration decisions.
- `landing/` — Current status summary plus links to historical refactor docs.
- `loyalty/` — Loyalty programme page composition and data flow (Supabase members).
- `menu/` — BMAD plan and implementation tracker for the menu experience.
- `reviews/` — Consolidated README summarising requirements, architecture, and backlog.

**Create a new subfolder** when a domain is introduced (e.g. `landing/`, `orders/`, `reservations/`). Maintain a single `README.md` per domain that covers:
1. Business goals & UX intent
2. Current architecture and implementation highlights
3. Backlog / next steps

Move deprecated deep-dive docs into `project-history/domains/` so the active README stays concise.

For implementation patterns shared across domains, start with `section-architecture.md` in this directory—it documents the standard section scaffold, registry usage, testing expectations, and the `pnpm scaffold:section` helper.
