# Admin Domain

**Status:** Alpha — layout + core pages wired; Supabase session handling and RBAC still being hardened.

## Purpose
Provide internal tooling for menu, reviews, loyalty, blog, specials, leads, and debugging while sharing patterns for future modules.

## Current Coverage
- Shared admin shell with sidebar/topbar (`(admin)/layout.tsx`) leveraging the design system sidebar components.
- Per-domain admin pages that render their corresponding domain UIs (menu, reviews, blog, loyalty, chat assistant macros, orders, specials).
- Debug utilities under `/admin/debug` to inspect tenant runtime, Supabase connectivity, and landing comps.
- Supabase-powered mutations scoped by `restaurant_id` through domain repositories (menu, loyalty, reviews, specials).

## Data & Auth
- Supabase Auth + `updateSession` middleware protect `/admin` routes today. Staff identities should map to the `staff_user` table for row-level security.
- Service-role access is required for SSR data fetching and background tasks.

## Near-Term Tasks
- Implement fine-grained RBAC and surface staff role management UI.
- Add optimistic toasts and error handling across all admin forms.
- Harden file upload flow (Cloudinary presets + signed uploads) for media-heavy domains.

## References
- Code: `restaurant-template/src/domains/admin/`
- Auth setup: `docs/template-system/setup/AUTH-SETUP.md`
- Ops playbook: `docs/runbook.md`
