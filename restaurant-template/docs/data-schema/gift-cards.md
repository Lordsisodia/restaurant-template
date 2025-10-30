# Supabase Schema – Gift Cards

From `202510200925__gift_cards_core.sql`.

## `gift_card`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| code | text | unique per card |
| initial_value | integer | cents |
| balance | integer | cents |
| purchaser_email / recipient_email | text |
| message | text |
| status | text | `'active'`, `'redeemed'`, `'cancelled'`, `'expired'` |
| created_at | timestamptz |
| index | (restaurant_id) |

## `gift_card_transaction`
Tracks all movements (issue, redeem, adjust, refund).

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| gift_card_id | uuid FK → gift_card(id) |
| restaurant_id | uuid FK |
| amount | integer | cents |
| transaction_type | text | `'issue'`, `'redeem'`, `'adjust'`, `'refund'` |
| note | text |
| created_at | timestamptz |
| index | (gift_card_id) |

## `gift_card_redemption`
Detailed redemption records.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| gift_card_id | uuid FK |
| restaurant_id | uuid FK |
| order_reference | text |
| amount | integer |
| redeemed_at | timestamptz |
| index | (restaurant_id) |

## Usage
- Future gift-card purchase/redemption flows will read/write these tables.
- Admin dashboards can reconcile balances using transactions + redemptions.
