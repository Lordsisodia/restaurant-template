# Menu Schema

## Tables

### `category`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `name` (text)
- `slug` (text)
- `position` (int, default 0)
- `visible` (boolean, default true)
- Unique constraint on `(restaurant_id, slug)`

### `item`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `category_id` (uuid, fk category, nullable)
- `name`, `slug` (text)
- `description` (text)
- `price` (integer, stored in smallest currency unit)
- `active` (boolean, default true)
- `image_url` (text)
- `created_at`, `updated_at`

### `variant`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `item_id` (uuid, fk item)
- `name` (text)
- `price_delta` (integer)

### `modifier_group`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `name` (text)
- `min`, `max` (int)
- `required` (boolean)

### `item_modifier_group`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `item_id` (uuid, fk item)
- `group_id` (uuid, fk modifier_group)
- Unique `(restaurant_id, item_id, group_id)`

### `modifier`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `group_id` (uuid, fk modifier_group)
- `name` (text)
- `price_delta` (integer)

### `allergen_tag`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `code` (text)
- `label` (text)
- Unique `(restaurant_id, code)`

### `item_allergen`
- Composite primary key `(restaurant_id, item_id, allergen_id)`
- Links items to allergens

### `availability_window`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `scope` (text enum: `item` or `category`)
- `target_id` (uuid)
- `days_of_week` (smallint[])
- `start_time`, `end_time` (time)
- `start_date`, `end_date` (date, optional)

## Notes
- All tables rely on the shared `set_updated_at` trigger where applicable.
- The menu domain currently consumes `category` and `item`; variants/modifiers/availability are scaffolded for future UI work.
- Seed scripts live in `restaurant-template/scripts/setup/import-menu.mjs`.
