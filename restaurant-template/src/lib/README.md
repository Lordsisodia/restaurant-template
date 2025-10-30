# src/lib overview

`src/lib` is the shared toolkit for everything in the app that is **not** tied to a single page, domain, or visual component. Put cross-cutting helpers here so features, domains, and UI layers can reuse them without depending on each other.

## What belongs here
- **Configuration helpers** – Runtime loaders, tenant switchers, analytics adapters.
- **Data/service clients** – Supabase clients, Cloudinary upload utilities, integrations that power multiple domains.
- **Pure utilities** – Formatting functions, type helpers, Result pattern abstractions, reusable constants.

If the code knows about a specific restaurant feature (menu, loyalty, etc.) or renders JSX, it should probably live in `domains/*` or `components/*` instead.

## Folder map (Oct 2025)
| Path | Purpose | Notes |
| --- | --- | --- |
| `config/client.ts` | Per-client marketing content and contact data. | Seeded for “Draco Coffee and Eatery”. |
| `config/site.ts` | Loads tenant-specific site config from Supabase or local fallback. | Depends on `supabase/withTenantSupabase`. |
| `data/demo-images.ts` | Stock image manifest for demos and fallbacks. | Replace per client when assets are ready. |
| `integrations/analytics.ts` | Stub for wiring real analytics. | Currently logs in development only—either implement or remove. |
| `integrations/cloudinary.ts` | Multi-tenant Cloudinary upload/list/delete helpers. | Relies on environment variables. |
| (moved) `@siso/ui` | Alias now points to `src/components/ui/siso`. | Wraps shadcn primitives (`SolidButton`, navigation menu, sidebar). |
| `supabase/client.ts` | Browser client factory with graceful fallback when env vars are missing. | Returns a mock that throws helpful errors if not configured. |
| `supabase/server.ts` | Next.js server-component client using request cookies. | Pair with route handlers, server actions, middleware. |
| `supabase/service-role-client.ts` | Service-role/tenant-aware client for admin tasks. | Chooses env vars per tenant/pod and disables session persistence. |
| `supabase/withTenantSupabase.ts` | Router-aware Supabase wrapper that injects tenant headers and primes the session. | Used when fetching tenant data server-side. |
| `supabase/` | Directory containing the files above. | Complements the root `/supabase` folder of migrations & SQL scripts. |
| `types/Result.ts` | Result/Ok/Err pattern used across domains. | Only file in `types/`; grow or relocate. |
| `utils/index.ts` | Tailwind-aware `cn` helper (`clsx` + `twMerge`). | Preferred utility; other `cn` copies can be removed. |
| `utils/currency.ts` | Format Indonesian Rupiah amounts. | Used in menu/price displays. |

### Supabase: runtime vs. infrastructure
- `src/lib/supabase/*` are **runtime helpers** bundled with the Next.js app. They manage cookies, tenant headers, and service-role access when React code talks to Supabase at request time.
- `supabase/*` at the repository root contains **infrastructure assets** (migrations, seeds, CLI scripts) that the Supabase CLI executes. These files never ship to the browser.
- Keep both layers but document which one you are changing so future work (or AI agents) doesn’t mix database migrations with runtime client code.

## Cleanup plan
1. **Keep class helpers unified** – `@/lib/utils` is the single `cn` helper; avoid reintroducing duplicates.
2. **Re-evaluate `@siso/ui`** – Decide whether to keep the alias now that the code lives under `src/components/ui/siso`, fold pieces into existing UI components, or publish it as a package.
3. **Clarify Supabase layers** – Keep the runtime clients here, and document how they differ from the root `/supabase` migrations so new contributors don’t mix them up.
4. **Document analytics + demos** – Either implement `analytics.ts` or remove the stub; ensure demo assets are clearly marked as placeholder data.
5. **Grow `types/` or relocate** – If the Result pattern is widely used, keep the folder and add more shared types. If not, move the file to a domain package.

## Benefits of tidying up
- **Lower cognitive load** – Every developer can glance at this README to understand where to place new shared code.
- **Fewer duplicate utilities** – Consolidating helpers avoids bugs from slightly different implementations.
- **Safer integrations** – A single, well-documented Supabase entry point reduces hard-coded credentials and ad-hoc clients.
- **Clear boundaries** – Developers can tell when code belongs in `lib` versus `domains` or `components`, reducing churn during reviews.

Update this document whenever the structure changes so the folder stays intentional instead of becoming a dumping ground.
