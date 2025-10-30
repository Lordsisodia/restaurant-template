# Reviews Schema

## Tables

### `review`
- `id` (uuid, pk)
- `restaurant_id` (uuid, fk restaurants)
- `author_name` (text)
- `rating` (int check 1–5)
- `comment` (text)
- `status` (text: `pending`, `published`, `archived`)
- `published_at`, `created_at`, `updated_at` (timestamptz)
- Enhanced fields: `author_type`, `author_stats`, `date_relative`, `source`, `has_photos`, `photo_count`, `helpful_count`, `verified`, `featured`, `sentiment`, `language`, `tags` (text[]), `highlights` (text[]), `metadata` (jsonb)

### `review_photo`
- `id` (uuid, pk)
- `review_id` (uuid, fk review)
- `restaurant_id` (uuid, fk restaurants)
- `image_url`, `image_path`, `thumbnail_url` (text)
- `caption` (text)
- `order_index` (int)
- `width`, `height`, `file_size` (int)
- `uploaded_by` (text)
- `metadata` (jsonb)
- `created_at` (timestamptz)

### `owner_response`
- `id` (uuid, pk)
- `review_id` (uuid, fk review)
- `restaurant_id` (uuid, fk restaurants)
- `response_text` (text)
- `responder_name` (text)
- `responder_role` (text, default `owner`)
- `created_at`, `updated_at` (timestamptz)

### `review_translation`
- `id` (uuid, pk)
- `review_id` (uuid, fk review)
- `language` (text)
- `translated_text` (text)
- `translation_source` (text, default `google`)
- `created_at` (timestamptz)

## Functions & Views
- `calculate_restaurant_rating(restaurant_uuid uuid)` → numeric average rating for published reviews.
- `get_rating_breakdown(restaurant_uuid uuid)` → JSON distribution for star counts.
- View `review_with_details` aggregates photo counts and owner responses.

## Policies
- Public read access for published reviews/photos/responses/translations.
- Authenticated users can insert reviews; owner updates/responses require matching `restaurant_id` via RLS.
