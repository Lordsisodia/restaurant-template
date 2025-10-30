# Blog Domain

**Status:** Scaffolding ready – awaiting template imports from v0.dev / 21st.dev.

## Purpose
Provide reusable blog list/post layouts so each tenant can share updates, recipes, or events without bespoke builds. The production implementation now lives under `src/domains/customer-facing/blog/sections/` (hero, categories, listing, post, sidebar) with shared utilities in `shared/` and page orchestrators in `pages/`.

## Architecture Overview
- Component-based template system mirroring landing domain.
- Feature directories (`blog-list-templates/`, `blog-post-templates/`, `blog-hero-templates/`, `blog-sidebar/`, etc.) each own their templates, components, hooks, utils, and types.
- Template router (`blog-list-templates/primary`, `template-2`, `template-3`, …) enables swapping variants per tenant.

## What Exists
- Primary templates for list, post, hero, categories, sidebar.
- Shared types/interfaces documented in `src/domains/customer-facing/blog/ARCHITECTURE.md`.
- Page-level components under `src/domains/customer-facing/blog/pages/` ready to wire into routes.

## Backlog / Next Steps
- Import polished UI from v0.dev (see template suggestions in `src/domains/customer-facing/blog/README.md`).
- Hook templates to real Supabase blog tables once data model is finalised.
- Add CMS/admin flows for post creation (likely through the admin domain).

## References
- Code: `src/domains/customer-facing/blog/`
- Architecture deep dive: `src/domains/customer-facing/blog/ARCHITECTURE.md`
- UX inputs: `docs/ux/page-blueprints.md` (blog section) & `docs/ux/restaurant-mobile-mvx.md` for component priorities.
- Data schema: `docs/data-schema/blog.md`
