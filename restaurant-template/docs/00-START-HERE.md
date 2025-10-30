# Start Here: Restaurant Template Docs

Welcome! This index is the quickest path for a human or AI assistant to find the right context while working on the restaurant template.

## 1. Core Architecture
- `system-overview.md` — High-level summary of the entire platform (what/why).
- `architecture/DOMAIN-DRIVEN-DESIGN.md` — Domain-driven structure, folder conventions, and import rules.
- `architecture/multi-tenant/` — Infrastructure strategies (Supabase, Cloudinary, Vercel, etc.).
- `architecture/decisions/` — Architecture Decision Records (ADRs) with timestamps.

**Use when**: You need to understand how features are organized, where code should live, or why a decision was made.

## 2. Template System
- `template-system/OVERVIEW.md` — Master guide to the reusable Next.js 15 platform.
- `template-system/setup/` — Environment, authentication, storage, and seeding instructions.
- `template-system/features/` — Implementation docs for landing, menu, footer, and lazy loading experiences.
- `template-system/integrations/` — Guidance for menu/footer integrations and multi-tenant data updates.
- `template-system/deployment/` — Production deployment steps.
- `template-system/reference/` — Quick-reference cheatsheets and client info pointers.
- `architecture/routes.md` — Mapping of app routes to domains and files.
- `data-schema/` — Supabase tables/relationships by domain.
- `architecture/api/route-handlers.md` — Current Next.js API routes for admin tooling.
- `template-system/template-variants.md` — Cookbook of available template variants and requirements.
- `template-system/site-config.md` — Structure of Supabase `site_config` (feature flags, hero variants, etc.).

**Use when**: Setting up a new tenant, extending shared features, or reviewing deployment processes.

## 3. Feature Domains
- `domains/` — Active feature work by business domain (about-us, landing, menu, reviews, loyalty, blog, chat, admin).
- Each domain folder contains a single README with goals, structure, status, and backlog.

**Use when**: Building or modifying a specific customer-facing feature. Start with the plan file, then follow the implementation notes.

## 4. Client Data
- `client-data/README.md` — Overview of Draco Coffee & Eatery data.
- Subfolders (`branding/`, `business-info/`, `menu/`, `reviews/`, `seo/`, `images/`, `ui-specifications/`) hold raw assets and structured content.
- Guides (`setup-guide.md`, `IMAGE-IMPORT-GUIDE.md`, `TESTIMONIALS-USAGE-GUIDE.md`) describe how to gather and use client materials.

**Use when**: Preparing assets, populating tenant data, or validating content requirements.

## 5. Components & UX Standards
- `ux/` — Mobile MVX, QA checklists, blueprints, and UI plans (includes the live component inventory/backlog).
- Historical component docs: `project-history/components/` (kept for reference).

**Use when**: Planning UI work, ensuring consistency, or checking component availability before building.

## 6. Research & Inspiration
- `research/benchmarks/` — Competitive analyses for Bali restaurants.
- `research/user-needs-by-page.md` — UX expectations per page.
- `research/archive/` — Past research such as Elementree extraction notes (kept for reference).

**Use when**: Validating UX decisions or pulling competitive insights. Archive items are historical context only.

## 7. Project History
- `project-history/` — Logs of completed sprints, fixes, and refactors.

**Use when**: Understanding what has shipped, avoiding regressions, or reviving paused initiatives.

## 8. Operations & QA
- `operations/runbook.md` — Deployment, rollback, seeding, and operational procedures.
- `operations/testing.md` — Current testing posture, lint commands, and manual QA checklist.
- `operations/observability.md` — Metrics, logging, and alerting backlog.

---

### Task Playbooks

| Task | Open These Docs |
| --- | --- |
| Build a new domain feature | `architecture/DOMAIN-DRIVEN-DESIGN.md` → relevant `domains/<feature>/` doc → `ux/restaurant-mobile-mvx.md` component sections |
| Onboard a new tenant | `template-system/OVERVIEW.md` → `template-system/setup/` → `client-data/setup-guide.md` |
| Update shared template behaviour | `template-system/features/` or `integrations/` → matching ADR in `architecture/decisions/` |
| QA & UX validation | `ux/mobile-qa-checklist.md` → `ux/restaurant-mobile-mvx.md` component backlog |
| Reference research inputs | `research/user-needs-by-page.md` → relevant `research/benchmarks/*.md` |

### Housekeeping
- **Do not delete historical docs.** Move outdated content to `project-history/` or `research/archive/` and note status.
- **Update cross-links** whenever a file moves so automated agents can follow the trail.
- **Record decisions** in `architecture/decisions/` when architecture changes.

This file should be updated whenever new doc categories are added or workflows change.
