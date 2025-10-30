# Supabase Schema – Reservations & Waitlist

From `202510200920__reservations_core.sql`.

## `reservation`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| customer_name | text |
| customer_email | text |
| party_size | integer | 1–20 |
| reservation_time | timestamptz |
| status | text | `'pending'`, `'confirmed'`, `'seated'`, `'cancelled'`, `'no_show'` |
| notes | text |
| created_at / updated_at | timestamptz (trigger `set_updated_at`) |
| indexes | restaurant_id; status; reservation_time |

## `waitlist`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| customer_name | text |
| contact | text |
| party_size | integer |
| joined_at | timestamptz |
| quoted_minutes | integer |
| status | text | `'waiting'`, `'notified'`, `'seated'`, `'cancelled'` |
| created_at | timestamptz |
| index | (restaurant_id) |

## Usage
- `src/domains/reservations` (future) will use these tables for booking flows.
- Admin panels should filter by status/time using existing indexes.
