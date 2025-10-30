# Orders Feature Blueprint

## Value Proposition
Enable lightweight ordering for pickup/delivery without a full POS integration. Orders feed the kitchen dashboard and can credit loyalty points automatically.

## Experience Overview
- **Customer:** Future `/orders` flow (archive prototype available) guides guests through basket creation, checkout, and payment handoff.
- **Admin:** `/admin/orders` lists open orders, supports status changes (pending → preparing → ready → completed), and exposes order details from the JSON payload.
- **Integrations:** Optional webhooks can push order data to POS systems or trigger loyalty accrual via Supabase functions.

## Implementation Checklist
1. Ensure migration `restaurant-template/supabase/migrations/202510200940__orders_loyalty_reviews_chat.sql` is applied; it creates the `restaurant_order` table.
2. Define order schema contract for `order_items` JSON (SKU, qty, price, modifiers) and document any required shape in code.
3. Implement customer ordering UI (cart state, checkout form) that posts to an API route writing Supabase rows.
4. Build admin workflow for status updates; the repository already exposes helpers in `restaurant-template/src/domains/archive/orders` (reference the archive module).
5. Connect loyalty integration: after order status hits `completed`, grant points to linked `loyalty_member` records.
6. (Optional) Integrate payment providers (Midtrans, Stripe, etc.) and store transaction metadata in `restaurant_order.metadata`.

## Data Contract
- `restaurant_order` columns: `customer_name`, `customer_contact`, `status`, `total_amount`, `order_items` (jsonb), `metadata` (jsonb), timestamp fields.
- Recommended statuses: `pending`, `preparing`, `ready`, `completed`, `cancelled` (extend `status` enum as needed).

## KPIs
- Average preparation time per order status transition.
- Order conversion rate (started checkout → submitted).
- Repeat order percentage (link to loyalty accounts).
