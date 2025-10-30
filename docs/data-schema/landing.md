# Landing & Tenant Schema

## Key Tables

### `tenant_group`
- `id` (uuid, pk)
- `slug` (text, unique)
- `supabase_project` (text)
- `vercel_team` (text)
- `notes` (text)
- `created_at` (timestamptz, default now)

### `restaurants`
- `id` (uuid, pk)
- `tenant_group_id` (uuid, fk tenant_group)
- `name`, `slug` (text, slug unique)
- `timezone` (text)
- `default_domain`, `vercel_project_slug`, `github_repo` (text)
- Contact fields: `phone`, `phone_formatted`, `whatsapp`, `whatsapp_formatted`, `email`, `address`, `business_hours`
- Branding: `tagline`, `logo_url`, `hero_image_url`, color fields (`primary_color`, `accent_color`, `background_color`, `text_color`)
- Social: `instagram_url`, `instagram_handle`, `facebook_url`, `google_maps_url`
- Ratings: `rating_score`, `rating_count`, `rating_source`
- Operational: `status` (enum text: active/inactive/archived), `notes`, timestamps

### `site_config`
- `id` (uuid, pk)
- `restaurant_id` (uuid, unique fk restaurants)
- `theme_tokens` (jsonb) — maps to CSS variables for theming
- `enabled_pages` (text[]) — toggles navigation + route exposure
- `features` (jsonb) — tenant-specific feature flags (hero, contact, delivery, brand, loyalty, etc.)
- `layout_variant` (text)
- `default_locale` (text)
- `available_locales` (text[])
- Timestamps with `set_updated_at` trigger

### `page_block`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `page` (text) — e.g. `landing`, `loyalty`
- `block_type` (text)
- `content_json` (jsonb) — structured payload for section templates
- `position` (int)
- `locale` (text, default `id-ID` or `default`)
- Timestamps

## Notes
- Landing page reads menu/reviews/specials data via other schemas; see their docs for table definitions.
- `site_config.features` is mirrored in `restaurant-template/src/config/pods.json` for build-time defaults.
- Use `page_block` for configurable landing sections; when empty, the landing domain falls back to hard-coded hero/story content.
