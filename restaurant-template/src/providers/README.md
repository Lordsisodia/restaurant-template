# Providers

The components in this directory compose application-wide React context providers. They should be the minimal set of wrappers required for the entire tree to function, keeping domain or feature-specific concerns elsewhere.

## Contents

- `AppProviders.tsx`  
  Entry point used by `src/app/layout.tsx`. Bundles global providers like React Query and the `TenantProvider`, and ensures tenant theme tokens become CSS variables on both the server and client.

- `TenantProvider.tsx`  
  Defines the tenant context contract (restaurant identifiers, theme tokens, optional site configuration) and exposes the `useTenant` hook for feature code.

- `theme-css.ts`  
  Shared helper that converts tenant theme tokens into `--color-*` CSS variables so server and client rendering stay in sync.

## When to add providers here

Add frameworks or service wrappers that every page or feature expects—e.g., authentication/session providers, analytics contexts, feature-flag clients, error boundaries, or localization frameworks. This keeps bootstrapping logic centralized and consistent across tenants and prevents repeated setup inside individual routes.

Prefer creating feature-specific provider stacks alongside their domain modules if the context is only needed for a subset of the app (see `domains/admin/components/layout/AdminProviders.tsx` for an example).

## Future considerations

- If additional shared providers are introduced, consider extracting dedicated files (e.g., `react-query.tsx`, `analytics.tsx`) to keep `AppProviders` a thin composition layer.
- As tenant theming evolves, extend `theme-css.ts` to support new token groups (typography, spacing) so server-side rendering stays consistent.

