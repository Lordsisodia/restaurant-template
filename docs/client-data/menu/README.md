# Menu Seed Files

Use these helpers to prepare Supabase imports for the menu domain.

## Expected Columns
### `category`
- `name`
- `slug`
- `position`
- `visible`

### `item`
- `name`
- `slug`
- `description`
- `price` (integer, smallest currency unit)
- `category_id` (optional if joining after insert)
- `image_url`
- `active`

## Import Tips
1. Seed categories first; capture generated UUIDs for item mapping.
2. When bulk importing items, include `restaurant_id` for each row (`00000000-0000-0000-0000-000000000003` for Draco).
3. Run `restaurant-template/scripts/setup/import-menu.mjs` to transform CSV data into Supabase inserts if you prefer scripted imports.
4. After import, run `/admin/menu` quick audit to verify categories, pricing, and imagery.
