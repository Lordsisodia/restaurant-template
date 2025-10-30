# Route Map

Quick reference mapping public/admin routes to the domains that own them. Helps new contributors find the right domain quickly.

| Route | Purpose | Domain | Entry point |
| --- | --- | --- | --- |
| `/` | Marketing landing page | landing | `src/app/page.tsx` → `@/domains/customer-facing/landing` |
| `/menu` | Menu browsing experience | menu | `src/app/menu/page.tsx` → `@/domains/customer-facing/menu/pages/MenuPage` |
| `/reviews` | Reviews & testimonials | reviews | `src/app/reviews/page.tsx` → `@/domains/customer-facing/reviews/pages/ReviewsPage` |
| `/loyalty` | Loyalty tiers & leaderboard | loyalty | `src/app/loyalty/page.tsx` → `@/domains/customer-facing/loyalty/pages/LoyaltyPage` |
| `/blog` | Blog index (scaffold) | blog | `src/app/blog/page.tsx` → `@/domains/customer-facing/blog/pages/BlogPage` |
| `/blog/[slug]` | Individual blog post | blog | `src/app/blog/[slug]/page.tsx` → `@/domains/customer-facing/blog/pages/BlogPostPage` |
| `/chat` | Chat/contact experience | chat | `src/app/chat/page.tsx` → `@/domains/customer-facing/chat/pages/ChatPage` |
| `/admin` | Admin shell & layout | admin | `src/app/admin/layout.tsx` |
| `/admin/menu` | Menu management | menu/admin | `src/app/admin/menu/page.tsx` → `@/domains/customer-facing/menu/pages/AdminMenuPage` |
| `/admin/reviews` | Reviews moderation | reviews/admin | `src/app/admin/reviews/page.tsx` → `@/domains/customer-facing/reviews/pages/AdminReviewsPage` |
| `/admin/blog` | Blog management | blog/admin | `src/app/admin/blog/page.tsx` → `@/domains/customer-facing/blog/pages/AdminBlogPage` |
| `/admin/chat` | Chat transcripts/support | chat/admin | `src/app/admin/chat/page.tsx` → `@/domains/customer-facing/chat/pages/AdminChatPage` |
| `/admin/loyalty` *(planned)* | Loyalty management | loyalty/admin | (to wire to `@/domains/customer-facing/loyalty` admin page) |

### Notes
- Routes should stay thin—if you add a new page under `src/app/`, point it to a domain module and update this table.
- API routes (`src/app/api/*`) follow the same principle; keep them slim and call into domain/server utilities.
- If a route becomes inactive, archive its doc in `docs/project-history/` and note the removal here so we track the surface area over time.
