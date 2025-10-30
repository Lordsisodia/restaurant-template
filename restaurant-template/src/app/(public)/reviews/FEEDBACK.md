# Reviews Page - Feedback & Improvements

## UI/UX Enhancements
- [ ] **Review Cards Design** - Cards could be more visually appealing
  - Consider adding profile pictures (if available from Google/other sources)
  - Improve card styling with better shadows, borders, or hover effects
  - Better visual hierarchy for author name, rating, and date
  - Consider adding verified badges or source icons more prominently

## Filtering & Display Issues
- [x] **Rating Breakdown Counts** - Filter sidebar doesn't show how many reviews per rating
  - Need to display: "5 Stars (X reviews)", "4 Stars (Y reviews)", etc.
  - This helps users understand the distribution before filtering
  - Should update dynamically based on current data

## Layout & Organization
- [x] **Write Review Button Placement** - Moved to header area with proper styling

## Technical Improvements
- [x] **Images Array Type Safety** - Fixed JSONB array handling from database
- [x] **Rating Breakdown Function** - Created `getRatingBreakdown()` server action
- [x] **Database Function Fix** - Applied migration successfully via MCP
  - Migration file: `supabase/migrations/20251027000000_fix_rating_function.sql`
  - Created `get_restaurant_rating()` database function
  - Rating stats now working correctly
- [ ] **Loading States** - Add skeleton loaders for reviews
- [ ] **Error Handling** - Better error messages when reviews fail to load
- [ ] **Pagination** - Consider adding pagination or infinite scroll for many reviews

## Future Enhancements
- [ ] **Review Sorting** - Add more sort options (e.g., by helpfulness, most recent with photos)
- [ ] **Search Functionality** - Allow users to search review content
- [ ] **Filter Combinations** - Show active filter count/summary
- [ ] **Review Moderation** - Admin panel for managing pending reviews
- [ ] **Analytics** - Track which reviews get the most engagement

## Notes
- Database uses JSONB for images field - ensure proper type handling
- Review source: Google Maps vs Website submissions
- Owner responses feature is working well
- Featured tags system needs more data to be useful
