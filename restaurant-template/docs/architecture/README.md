# Architecture Docs

Use this folder to understand how the restaurant template is structured and why specific engineering decisions were made.

- `DOMAIN-DRIVEN-DESIGN.md` — Source of truth for domain folder conventions, component placement, and import rules.
- `routes.md` — Route map linking app paths to domains and entry files.
- `decisions/` — Architecture Decision Records (ADRs). Each entry captures the context, options, and outcome; add a new ADR whenever we change a foundational choice.
- `multi-tenant/` — Deep dives on infrastructure and platform strategy (Cloudinary, Supabase, deployment limits, optimization tactics, etc.). These explain how to operate the template at scale for multiple tenants.
- `api/` — Notes on Next.js route handlers and external integration points.

**When to update:**
- A new global pattern appears (add to `DOMAIN-DRIVEN-DESIGN.md`).
- We choose between competing approaches (add or update an ADR).
- Infrastructure guidance changes (edit or add a doc under `multi-tenant/`).
