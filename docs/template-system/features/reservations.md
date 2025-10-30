# Reservations Feature Blueprint

## Value Proposition
Give guests a reliable way to book tables while staff manage incoming demand and walk-in waitlists from a unified dashboard.

## Experience Overview
- **Customer:** `/reservations` (archive reference today) will evolve into a booking form that writes to Supabase `reservation` records and sends confirmation emails.
- **Admin:** `/admin/reservations` provides calendar/list views for upcoming bookings, status transitions (pending → confirmed → seated), and waitlist management.
- **Operations:** Optional SMS/email notifications can be wired via Resend or third-party APIs triggered when reservation status changes.

## Implementation Checklist
1. Run migration `restaurant-template/supabase/migrations/202510200920__reservations_core.sql` to provision `reservation` and `waitlist` tables.
2. Decide on time slot rules (fixed intervals vs. free-form). Extend schema with `service_type` or `table_id` if needed.
3. Build customer form (Next.js Server Actions + Supabase insert) with validation for party size and operating hours.
4. Hook admin UI actions to `reservation` updates (status transitions) and `waitlist` operations.
5. Configure notifications (optional): create Supabase functions or Edge Handlers that call Resend/Twilio when statuses change.

## Data Contract
- `reservation`: `customer_name`, `customer_email`, `party_size`, `reservation_time`, `status`, `notes`
- `waitlist`: `customer_name`, `contact`, `party_size`, `joined_at`, `quoted_minutes`, `status`

## KPIs
- Confirmation lead time (booking creation → confirmation)
- No-show rate vs. cancellations
- Average waitlist conversion (waiting → seated)
