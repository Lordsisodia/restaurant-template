# Supabase Schema – Tenancy

Tables defining tenant groups and restaurants; most other tables reference `restaurants.id`.

## Tables

### `tenant_group`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) | Generated via `gen_random_uuid()` |
| slug | text (unique) | Identifier for group of tenants (e.g. pod) |
| supabase_project | text | Supabase project ref |
| vercel_team | text | Owning Vercel team |
| notes | text | Optional |
| created_at | timestamptz | Default `now()` |

### `restaurants`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) | Referenced by most domain tables |
| tenant_group_id | uuid FK → tenant_group(id) | Cascade on delete |
| name | text | Display name |
| slug | text (unique) | Used for routing/config |
| timezone | text | Default `'Asia/Jakarta'` |
| default_domain | text | Optional |
| vercel_project_slug | text | Deployment target |
| github_repo | text | Optional |
| contact/social/branding columns | text | Populated by `202510241700__enhance_restaurants_add_draco.sql` |
| rating columns | decimal/int | Cached rating info for landing/reviews |
| created_at / updated_at | timestamptz | `updated_at` maintained by `set_updated_at()` trigger |

## Relationships
- Every domain table stores `restaurant_id` referencing `restaurants(id)` (cascade on delete).
- Config tables (e.g. `site_config` updates in 202510242000/202510250200 migrations) embed JSON for hero/delivery/contact data.

## Used by
- `src/domains/shared/hooks/useTenantServer.ts` & domain actions for tenant-aware data fetching.
- `docs/client-data/` mirrors fields for manual editing before pushing changes into Supabase.
