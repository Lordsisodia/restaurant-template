# Restaurant Template – System Overview

## Purpose
Production-ready Next.js 15 + Supabase restaurant template that powers Draco Coffee & Eatery and future tenants. The live app lives in `restaurant-template/` and exposes public marketing routes alongside Supabase-authenticated admin tooling.

Use this document as the starting point before diving into domain-specific docs under `docs/domains/` or the Supabase migrations in `restaurant-template/supabase/migrations/`.

## Architecture at a Glance
- **Domain-driven modules:** Core business capabilities sit in `restaurant-template/src/domains/<name>/`. Each route under `restaurant-template/src/app/(public|admin|archive)/` is a thin host that composes its domain.
- **Multi-tenant runtime:** Tenants are configured via `restaurant-template/src/config/pods.json` and resolved at request time. Runtime theme + feature flags load from Supabase tables `restaurants`, `site_config`, and `page_block`.
- **Supabase-backed data & auth:** Menu, loyalty, reviews, blog, specials, orders, and assistant macros all use JSON-friendly Supabase schemas. Authentication and row-level security leverage Supabase Auth plus the custom `updateSession` middleware in `restaurant-template/src/lib/supabase/`.
- **Composable UI templates:** Domains ship template directories (for example `menu/menu-category-templates`) that can be swapped per tenant while sharing hooks, types, and server repositories.

## Feature Domains
| Domain | Primary location | Public routes | Admin routes |
| --- | --- | --- | --- |
| landing | `restaurant-template/src/domains/landing/` | `/` | N/A |
| menu | `restaurant-template/src/domains/menu/` | `/menu`, `/menu/[id]` (detail placeholder) | `/admin/menu` |
| reviews | `restaurant-template/src/domains/reviews/` | `/reviews` | `/admin/reviews` |
| loyalty | `restaurant-template/src/domains/loyalty/` | `/loyalty`, `/membership` | `/admin/loyalty` |
| blog | `restaurant-template/src/domains/blog/` | `/blog`, `/blog/[slug]` | `/admin/blog` |
| chat | `restaurant-template/src/domains/chat/` | `/chat` | `/admin/chat-assistant` |
| admin | `restaurant-template/src/domains/admin/` | N/A | `/admin/*` shared shell |
| shared | `restaurant-template/src/domains/shared/` | imported by other domains | — |
| archive | `restaurant-template/src/domains/archive/` | `/specials`, `/reservations`, etc. (reference builds) | `/admin/specials`, `/admin/reservations`, etc. |

See `docs/domains/<domain>/README.md` for capability status, data dependencies, and follow-up tasks.

## Data & Integrations
- **Supabase:** Single project per pod. Key tables include `category`, `item`, `special`, `loyalty_member`, `review`, `review_photo`, `owner_response`, `post`, `tag`, `assistant_macro`, plus tenancy scaffolding (`tenant_group`, `restaurants`, `site_config`, `page_block`). Migrations live in `restaurant-template/supabase/migrations/`.
- **Cloudinary:** Asset delivery with transformations. `restaurant-template/CLOUDINARY-GUIDE.md` documents folder layout; the app consumes tenant imagery from `site_config.features.brand` and menu item URLs.
- **Automation scripts:** `restaurant-template/scripts/setup/*.mjs` seed menu data, reviews, tenants, and environment defaults.

## Deployment Workflow
1. **Clone & install:** Work from the `restaurant-template/` package, run `pnpm install` (or `npm install`).
2. **Configure Supabase:** Apply migrations (`restaurant-template/supabase/migrations`) and set row level security. Seed tenants via `scripts/setup/init-restaurant.mjs`.
3. **Provision media:** Follow `docs/template-system/setup/MEDIA-SETUP.md` to organise Cloudinary per tenant.
4. **Auth & env vars:** Wire Supabase credentials as described in `docs/template-system/setup/AUTH-SETUP.md` and confirm `updateSession` middleware succeeds locally.
5. **Deploy:** Ship through Vercel; see `docs/template-system/deployment/DRACO-DEPLOYMENT-GUIDE.md`.
6. **Verify:** Execute `docs/testing.md` smoke checklist and capture notes in `docs/project-history/`.

## When to Read What
- **Orientation:** This overview + `docs/architecture/DOMAIN-DRIVEN-DESIGN.md`.
- **Make feature changes:** The relevant domain README under `docs/domains/` plus in-folder READMEs inside `restaurant-template/src/domains/<name>/`.
- **Database updates:** `docs/data-schema/` for table summaries and Supabase migrations for authoritative definitions.
- **Tenant onboarding:** `docs/template-system/setup/` and `docs/client-data/` for seed files.
- **Operations & QA:** `docs/runbook.md`, `docs/testing.md`, `docs/ux/` checklists.

## Feature Flags & Site Config
- Tenant-specific page toggles and feature flags live in Supabase `site_config.features` JSON (mirrored in `pods.json` for defaults).
- Enabled pages determine which `(public)` routes appear in navigation; the menu domain cross-checks `site_config.enabled_pages` to show sections like specials or loyalty teasers.

## Current Gaps / Follow-Ups
- Harden Supabase-based admin auth and RBAC policies (see `docs/domains/admin/README.md`).
- Cloudinary references in `site_config` expect actual uploads; confirm when onboarding new tenants.
- Ensure Supabase migrations stay in sync with `docs/data-schema/` whenever the schema evolves.
