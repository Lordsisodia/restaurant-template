# Supabase Schema – Orders, Loyalty, Chat/Assistant

Aggregated from `202510200940__orders_loyalty_reviews_chat.sql`.

## `restaurant_order`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| customer_name / customer_contact | text |
| status | text | default `'pending'`; add additional statuses via check constraint |
| total_amount | integer | in cents |
| notes | text |
| order_items | jsonb | structured items array |
| metadata | jsonb | extra details (delivery, payment) |
| created_at / updated_at | timestamptz |
| trigger `restaurant_order_set_updated_at` | maintains updated_at |

## `loyalty_member`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| full_name / email / phone | text |
| points | integer | default 0 |
| tier | text | default `'bronze'` |
| last_visit | date |
| metadata | jsonb |
| created_at / updated_at | timestamptz |
| trigger `loyalty_member_set_updated_at` | |

## `assistant_macro`
Stores canned prompts/flows for the assistant/chat domain.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| title | text |
| prompt | text |
| tags | text[] |
| created_at / updated_at | timestamptz |
| trigger `assistant_macro_set_updated_at` | |

## Usage
- `restaurant_order`: to be consumed by future ordering/checkout flows; currently provides data for admin dashboards.
- `loyalty_member`: powering `src/domains/customer-facing/loyalty/pages/LoyaltyPage.tsx` (leaderboard, tier display).
- `assistant_macro`: referenced by chat/assistant experiences for prebuilt macros.
