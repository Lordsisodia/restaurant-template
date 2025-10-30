# Gift Cards Feature Blueprint

## Value Proposition
Launch digital gift cards that guests can purchase online and redeem in store or during checkout, without relying on external marketplaces.

## Experience Overview
- **Customer:** Planned `/gift-cards` flow (see archive prototype) collects purchaser + recipient details, processes payment, and emails a unique code.
- **Admin:** `/admin/gift-cards` will list cards, track balances, and allow manual adjustments or cancellations.
- **Redemption:** During checkout, guests enter their code; the system records a redemption and deducts from balance.

## Implementation Checklist
1. Apply migration `restaurant-template/supabase/migrations/202510200925__gift_cards_core.sql` to create `gift_card`, `gift_card_transaction`, and `gift_card_redemption` tables.
2. Decide on code generation pattern (e.g. prefix + random alphanumeric) and implement in server action.
3. Integrate payment provider (Stripe, Midtrans, etc.) for card purchases and store receipt info in `gift_card_transaction`.
4. Build email template via Resend to deliver codes and instructions to recipients.
5. Extend checkout flow to accept gift card codes and record redemptions atomically (use Supabase RPC or transaction).
6. Provide admin tooling for manual issuing, balance adjustments, and exporting gift card reports.

## Data Contract
- `gift_card`: unique `code`, `initial_value`, `balance`, purchaser/recipient info, `status`.
- `gift_card_transaction`: history log for issuance, redemptions, adjustments.
- `gift_card_redemption`: linkage between orders and redeemed amounts.

## KPIs
- Gift card sales volume per week/month.
- Redemption rate within 90 days.
- Breakage percentage (unused balance after expiration policy).
