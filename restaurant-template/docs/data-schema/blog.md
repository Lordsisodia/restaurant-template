# Supabase Schema – Blog

From `202510200935__blog_core.sql` and `202510260000__blog_enhancements.sql`.

## `post`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| title | text |
| slug | text | unique per restaurant |
| excerpt | text |
| content | text |
| published_at | timestamptz |
| image_url | text | featured image |
| category | text |
| read_time | integer | minutes |
| created_at / updated_at | timestamptz (trigger `post_set_updated_at`) |
| indexes | restaurant_id; (restaurant_id, category); (restaurant_id, published_at DESC) |

## `tag`
Tag catalog per restaurant.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| name / slug | text |
| unique (restaurant_id, slug) |

## `post_tag`
Join table linking posts to tags.

| Column | Type | Notes |
| --- | --- | --- |
| post_id | uuid FK → post(id) |
| tag_id | uuid FK → tag(id) |
| restaurant_id | uuid FK |
| primary key (post_id, tag_id) |

## Usage
- `src/domains/customer-facing/blog/pages/BlogPage.tsx` + `BlogPostPage.tsx` read from `post`, optionally filter by tag/category.
- Admin blog tools (future) manage posts/tags; indexes support filtering by category and published date.
