# Blog Schema

## Tables

### `post`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `title` (text)
- `slug` (text, unique per restaurant)
- `excerpt` (text)
- `content` (text; HTML/MDX string)
- `published_at` (timestamptz, nullable)
- `created_at`, `updated_at` (timestamptz)

### `tag`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `name` (text)
- `slug` (text, unique per restaurant)

### `post_tag`
- Composite primary key `(post_id, tag_id)`
- `post_id` (uuid, fk post)
- `tag_id` (uuid, fk tag)
- `restaurant_id` (uuid, fk restaurants)

## Notes
- `post` table uses `set_updated_at` trigger.
- Blog domain currently stores body content as serialized HTML/MDX; consider moving to structured blocks if editing experience evolves.
- Add indexes when enabling filtering by category/tag (`idx_post_restaurant` already present).
