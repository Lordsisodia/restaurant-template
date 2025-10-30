# Supabase Schema – Reviews

Built incrementally by `202510200940__orders_loyalty_reviews_chat.sql` (base table) and `202510241400__reviews_enhanced.sql` (rich metadata).

## `review`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| author_name | text |
| rating | integer | 1–5 |
| comment | text |
| status | text | default `'pending'` (policy restricts published) |
| published_at | timestamptz |
| author_type / author_stats | text | Google Maps metadata |
| date_relative | text | e.g., “2 months ago” |
| source | text | `'website'`, `'Google Maps'`, etc. |
| has_photos / photo_count | boolean / integer |
| helpful_count | integer |
| verified / featured | boolean |
| sentiment | text | `'very positive'`, `'neutral'`, etc. |
| language | text | `'en'`, `'id'`, ... |
| tags / highlights | text[] |
| metadata | jsonb |
| created_at / updated_at | timestamptz |
| indexes | restaurant + source, featured, rating/status |
| RLS | public read (published), authenticated insert/update per ownership |

## `review_photo`
Stores photo metadata per review.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| review_id | uuid FK → review(id) (cascade) |
| restaurant_id | uuid FK |
| image_url / image_path / thumbnail_url | text |
| caption | text |
| order_index | integer |
| width / height / file_size | numeric |
| uploaded_by | text |
| metadata | jsonb |
| created_at | timestamptz |

## `owner_response`
Owner/manager replies.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| review_id | uuid FK |
| restaurant_id | uuid FK |
| response_text | text |
| responder_name / responder_role | text |
| created_at / updated_at | timestamptz (trigger updates) |

## `review_translation`
Translated review copies.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| review_id | uuid FK |
| language | text |
| translated_text | text |
| translation_source | text |
| created_at | timestamptz |

## Views & Functions
- `review_with_details` view aggregates photos/owner responses.
- `calculate_restaurant_rating(restaurant_uuid uuid)` returns average rating.
- `get_rating_breakdown(restaurant_uuid uuid)` returns JSON breakdown.

## Usage
- `src/domains/customer-facing/reviews/shared/services/review-actions.ts` (filters/sorting), `ReviewsPage.tsx`, and admin pages consume these tables.
- Landing domain pulls highlight reviews via `featured = true` index.
