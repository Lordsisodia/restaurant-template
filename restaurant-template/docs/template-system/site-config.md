# Site Configuration (site_config table)

Central settings for each tenant live in the Supabase `site_config` table. This guide explains the JSON structure, how domains consume it, and how to safely update values.

## Table schema (from `202510200900__tenant_base.sql`)
| Column | Type | Notes |
| --- | --- | --- |
| restaurant_id | uuid (PK) | References `restaurants(id)` |
| theme_tokens | jsonb | Color/border radius tokens overriding defaults |
| enabled_pages | text[] | Ordered list of active routes (`'home'`, `'menu'`, etc.) |
| features | jsonb | Feature flags & per-domain configuration (see below) |
| layout_variant | text | Slug for global layout variant (`'coffee-forward'`, etc.) |
| default_locale | text | e.g. `'id-ID'` |
| available_locales | text[] | e.g. `['id-ID','en-US']` |
| created_at / updated_at | timestamptz | `updated_at` managed by trigger |

Queries in `src/lib/config/site.ts` fetch these fields and merge them with local fallback from `pod-config`. Most domains read values from `features` to choose template variants or populate essentials strips.

## Default values (example insert)
`202510241700__enhance_restaurants_add_draco.sql` seeds Draco:
```sql
insert into site_config (
  restaurant_id,
  theme_tokens,
  enabled_pages,
  features,
  layout_variant,
  default_locale,
  available_locales
) values (
  '0000...0003',
  jsonb_build_object('color', ... ),
  array['home','menu','specials','reviews','contact','orders','chat'],
  jsonb_build_object(
    'onlineOrdering', true,
    'reservations', false,
    'topNavVariant', 'segments'
  ),
  'coffee-forward',
  'id-ID',
  array['id-ID','en-US']
);
```

## Feature keys in use
Migrations and domains currently expect the following `features` structure:

| Key | Type | Example | Used by |
| --- | --- | --- | --- |
| `hero.variant` | text | `'gradient-words'` | Landing hero host selects template |
| `hero.words` | text[] | `['Awake.', 'Alive.', 'Until 11 PM.']` | Animated gradient hero |
| `delivery.grabFood` | text URL | GrabFood deep link | Footer essentials / CTA |
| `contact.whatsapp` | text | `6281338409090` | Footer essentials, QuickActions |
| `contact.hours` | text | `'Open until 11:00 PM'` | Footer essentials |
| `contact.address` | text | `'Jl. ...'` | Footer essentials, map modules |
| `socialMedia.instagram` | text | `'@draco.cofeeandeatery'` | Footer & landing socials |
| `onlineOrdering` | boolean | `true` | Used for toggling order CTA (future) |
| `reservations` | boolean | `false` | Toggle reservations flows |
| `topNavVariant` | text | `'segments'` | Choose nav style (landing/admin) |
| `delivery.whatsappOrder` *(planned)* | text | Quick order CTA |

> Keep feature keys snakeCase/lowerCamelCase; avoid spaces. Document new keys here and in the relevant domain README.

## Updating site_config
1. **SQL migration (preferred for prod):** add a migration updating the JSON (see examples `202510242000__configure_draco_gradient_hero.sql`, `202510250200__add_draco_delivery_config.sql`).
2. **Supabase dashboard:** edit row manually for quick experiments (remember to capture changes in a migration for prod).
3. **Scripts:** `scripts/dev/apply-grab-config.mjs` shows how to patch features from Node.

## Consumption patterns
- **Landing hero:** `features.hero.variant` determines which `hero-templates` variant to render.
- **Essentials strip & QuickActions:** read `features.contact` + `features.delivery` to build chips/buttons.
- **Footer:** uses social/delivery/contact fields for CTA cards (`src/domains/shared/components/RestaurantFooter`).
- **Paused features:** `onlineOrdering`, `reservations` toggles will gate future order/reservation pages.

## Best practices
- Provide sensible defaults in seeds (`supabase/seeds/seed_demo.sql`) so local environments work out of the box.
- Keep tenant-specific overrides in migrations with comments (who/why) for traceability.
- When adding a new key:
  1. Update this doc and the relevant domain README.
  2. Add Zod validation in `src/domains/<domain>/types/schema.ts` or wherever the feature is consumed.
  3. Provide fallback logic for missing keys to avoid breaking older tenants.

## TODOs
- Build an admin UI to edit `site_config.features` safely.
- Add a script to diff local pod config vs. Supabase row for audits.
- Introduce versioning or schema validation (Zod) when loading `features` on the server.
