# Shared Domain

**Status:** Active — foundational utilities consumed by every feature domain.

## Purpose
Centralise cross-cutting UI primitives, hooks, providers, and Supabase helpers so feature domains stay lean and tenant-aware.

## Current Coverage
- UI building blocks (buttons, typography, layout utilities) under `components/` plus section skeletons.
- Tenant context + hooks (`providers/TenantProvider`, `hooks/useTenant*`) for SSR/CSR access to runtime config.
- Supabase helpers (`withTenantSupabase`, `createClient`, `createServerClient`) and page block repository.
- Analytics utilities, theming tokens, and formatting helpers shared across menu, landing, reviews, loyalty, etc.

## Near-Term Tasks
- Publish Storybook snapshots for shared components to stabilise design API.
- Extract experimental helpers into a `labs/` namespace before adoption elsewhere.
- Add typed wrappers for `site_config.features` to reduce optional chaining.

## References
- Code: `restaurant-template/src/domains/shared/`
- Theming guide: `docs/ux/restaurant-mobile-mvx.md`
- Testing expectations: `docs/testing.md`
