# Restaurant Template – System Overview

## What this project solves
We maintain a reusable, multi-tenant restaurant platform (Next.js 15 + Supabase + Cloudinary) that powers marketing sites and lightweight ordering experiences for SISO clients. Each tenant (restaurant) can share the same infrastructure while overriding data, theming, and selected templates.

This doc tells the “big picture” story so new engineers (or AI agents) can understand how the moving pieces fit before diving into domain specifics.

## Core pillars
1. **Domain-driven structure** – Each business capability (landing, menu, reviews, loyalty, admin, etc.) owns its UI, data access, and template variants (`src/domains/*`). Routes under `src/app/` stay razor-thin.
2. **Component-level templates** – Most domains expose template variants (e.g., hero, reviews, menu list). Template directories share types/hooks/utils so we can swap layouts by configuration without duplicating logic.
3. **Multi-tenant awareness** – Tenant config lives in Supabase (`pods.json` + Supabase tables). Shared guides under `docs/template-system/` describe how to spin up a new tenant, seed data, and deploy.
4. **AI-friendly documentation** – Domain READMEs, the UX playbook (`docs/ux/restaurant-mobile-mvx.md`), and the architecture docs are designed to be referenced by humans and assistants alike.

## Feature domains
| Domain | Responsibility | Customer routes | Admin surfaces |
| --- | --- | --- | --- |
| landing | Hero, testimonials, marketing copy | `/` | N/A |
| menu | Menu browsing, item detail modal, filtering | `/menu` | `/admin/menu` |
| reviews | Reviews page, rating summaries, helpful votes | `/reviews` | `/admin/reviews` |
| loyalty | Loyalty tiers and leaderboard | `/loyalty` | (future) `/admin/loyalty` |
| blog | Blog list/post scaffolding | `/blog`, `/blog/[slug]` | `/admin/blog` |
| chat | Chat/contact widget & full-page chat | `/chat` | `/admin/chat` |
| admin | Asset uploaders, seeding helpers | `/admin` (shared layout) | `/admin/*` |

See `docs/domains/` for per-domain details (current status, backlog, references).

## Data & integrations
- **Supabase:** primary data store (menu items, reviews, loyalty members, etc.). `src/domains/*/actions.ts` encapsulate Supabase queries.
- **Cloudinary:** image CDN; laddered folder structure per tenant (`public/images/tenants/<slug>/`). Guides in `docs/template-system/setup/MEDIA-SETUP.md`.
- **Unsplash API:** optional seeding for demo imagery.
- **Auth:** Supabase Auth + Google OAuth for admin pages (see `docs/template-system/setup/AUTH-SETUP.md`).

## Deployment
- **Next.js on Vercel** (statically generated + edge-friendly)
- **Supabase** for database/storage functions
- `docs/template-system/deployment/DRACO-DEPLOYMENT-GUIDE.md` captures the working Draco rollout; reuse its checklist for future tenants.
- `docs/operations/runbook.md` + `docs/operations/testing.md` cover pre/post deploy checks.

## How to work with the system
1. **Understand the architecture:** skim `docs/architecture/DOMAIN-DRIVEN-DESIGN.md` and this doc.
2. **Pick a domain:** open `docs/domains/<domain>/README.md` to see goals, structure, status, and references.
3. **Follow UX standards:** consult `docs/ux/restaurant-mobile-mvx.md` for MVX component backlog, plus the UX blueprints/checklists.
4. **Implement and document:** code inside the domain; update the domain README if behaviour changes. Archive superseded docs via `docs/project-history/`.

## Future improvements
- Broader template coverage in `docs/template-system/features/` as loyalty/blog/reservations mature.
- Potential direct links from Supabase schema migrations to domain docs for quicker “where is this data used?” tracing.

Have feedback? Drop notes in `docs/project-history/` or open a lightweight ADR under `docs/architecture/decisions/`.
