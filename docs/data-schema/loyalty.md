# Loyalty Schema

## Tables

### `loyalty_member`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `full_name` (text)
- `email` (text, nullable)
- `phone` (text, nullable)
- `points` (integer, default 0)
- `tier` (text, default `bronze`)
- `last_visit` (date, nullable)
- `metadata` (jsonb, default `{}`)
- `created_at`, `updated_at` (timestamptz)

## Notes
- Server repository in `restaurant-template/src/domains/loyalty/server/` enforces tenant scoping and simple CRUD.
- Future roadmap includes rewards + activity tables; update this doc when migrations land.
