# Chat Schema

## Tables

### `assistant_macro`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `title` (text)
- `prompt` (text)
- `tags` (text[])
- `created_at`, `updated_at` (timestamptz)

## Notes
- Macros feed both the public quick-reply grid and the admin assistant console.
- Future roadmap includes `chat_thread`/`chat_message` tables once real-time messaging ships; update this doc when migrations land.
