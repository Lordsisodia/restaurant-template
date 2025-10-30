# Supabase Schema – Leads

From `202510200930__leads_core.sql`.

## `lead`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| name | text |
| email | text |
| phone | text |
| lead_type | text | default `'catering'` |
| party_size | integer |
| event_date | date |
| message | text |
| status | text | `'new'`, `'in_progress'`, `'won'`, `'lost'` |
| created_at | timestamptz |
| index | (restaurant_id) |

## `lead_activity`
Stores follow-up notes tied to a lead.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| lead_id | uuid FK → lead(id)
| restaurant_id | uuid FK → restaurants(id)
| note | text |
| created_at | timestamptz |
| index | (lead_id) |

## Usage
- Feed into CRM-style dashboards (future admin domain work).
- Useful for monitoring catering/private event inquiries captured via forms.
