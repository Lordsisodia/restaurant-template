# Reviews Domain

**Status:** Production — public showcase and admin moderation tied to Supabase data.

## Purpose
Display social proof (ratings, testimonials) and allow staff to curate reviews, photos, and owner responses.

## Current Coverage
- Public reviews page rendering `ReviewCard` grid with helpful counts, featured badges, and translations where available.
- Admin page for approving, publishing, archiving, and deleting reviews with Supabase mutations.
- Server repository handling `review` table plus enhanced metadata (photo counts, sentiment fields).
- Optional owner responses and translations exposed through `review_photo`, `owner_response`, and `review_translation` tables.

## Data Dependencies
- Supabase tables: `review`, `review_photo`, `owner_response`, `review_translation` (see `docs/data-schema/reviews.md`).
- Uses RLS policies defined in `202510241400__reviews_enhanced.sql` to allow public read + authenticated write.

## Near-Term Tasks
- Build ingestion pipeline for Google Maps reviews (currently manual imports).
- Add analytics export summarising sentiment via `calculate_restaurant_rating` and `get_rating_breakdown` functions.
- Surface helpful vote interactions in UI once policy design is complete.

## References
- Code: `restaurant-template/src/domains/reviews/`
- Data reference: `docs/data-schema/reviews.md`
- Research input: `docs/research/user-needs-by-page.md`
