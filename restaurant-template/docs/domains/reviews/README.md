# Reviews Domain

**Status:** In flight (structure established, primary template migration pending)

This README consolidates the former BMAD plan and architecture docs (see history in `docs/project-history/domains/reviews/`). Use it as the single source for requirements, architecture, and current work.

## 1. Business Objectives
- Expose authentic social proof with ratings, featured testimonials, and photo-rich cards
- Allow visitors to filter/sort by rating, source, tags, and recency
- Capture authenticated review submissions (Clerk + Supabase)
- Support helpful votes and admin moderation workflows
- Maintain performance on mobile (LCP < 2.5s, INP < 200ms)

## 2. Domain Architecture (2025-10-29)
```
src/domains/customer-facing/reviews/
├── sections/
│   └── guest-feedback-section/
│       ├── README.md                        # Data contract + variant notes
│       ├── index.tsx                        # Public API (renderer/helpers/types)
│       ├── registry.ts                      # createSectionRegistry wiring
│       ├── data/mock.ts                     # Storybook/Vitest payloads
│       ├── templates/
│       │   └── primary/
│       │       ├── GuestFeedbackPrimary.tsx # Server renderer delegating to client shell
│       │       └── GuestFeedbackClient.tsx  # Client state (modal, helpful votes)
│       ├── stories/GuestFeedbackSection.stories.tsx
│       └── tests/guestfeedbacksection.spec.ts
│
├── ratings-summary/                     # Section scaffold for stats header
├── filter-bar/                          # Filters sidebar (sticky on desktop)
├── reviews-grid/                        # Review grid + lightbox wiring
├── review-card/                         # Gradient testimonial card
├── add-review-modal/                    # Submission modal (form validations)
├── image-lightbox/                      # Fullscreen image viewer
├── shared/
│   ├── services/                        # Supabase repositories + server actions
│   └── (hooks|utils|data)               # Reserved scaffolds for future shared assets
├── components/                          # Simple domain components (CTA buttons)
├── pages/
│   └── ReviewsPage.tsx                  # Server component that assembles section content
└── index.ts                             # Domain exports (page + section facade)
```

The section follows the standard `docs/domains/section-architecture.md` playbook. Each UI primitive has its own scaffolded directory (`ratings-summary/`, `filter-bar/`, `reviews-grid/`, etc.), making it easy to add future variants or swap implementations.

## 3. Data & Integrations
- Supabase tables: `reviews`, `review_photos`, `review_helpful`, `review_translations`
- Actions implemented: `getReviewsWithFilters`, `getRatingStats`, `getFeaturedTags`, `submitReview`, `incrementHelpfulCount` (see `shared/services/review-actions.ts`)
- Authentication: Clerk (required for submissions & helpful votes)
- Media: Cloudinary (photo uploads handled through AddReviewModal)

## 4. Implementation Status (2025-10-29)
**Completed**
- Guest feedback section aligned with shared section architecture (registry, schema, mocks, stories, tests)
- Primary UI migrated into dedicated scaffolds (`ratings-summary/`, `filter-bar/`, `reviews-grid/`, etc.)
- Reviews page now renders through `GuestFeedbackRenderer` with typed content mapping
- Legacy wrappers in `app/(public)/reviews/components` and ad-hoc client globals removed

**Pending / Backlog**
- Implement optimistic helpful-vote updates + analytics hook (`useReviewAnalytics`)
- Build additional section variants (masonry + carousel layouts)
- AdminReviewsPage (moderation, responses)
- Pagination / infinite scroll + skeleton loaders (see `FEEDBACK.md`)

## 5. UX & Content Inputs
- Research references: `docs/research/user-needs-by-page.md`, `docs/research/benchmarks/*`
- UX blueprint: `docs/ux/page-blueprints.md` (reviews section)
- Component availability: `docs/ux/restaurant-mobile-mvx.md`
- Client data source: `docs/client-data/reviews/`

## 6. History
Detailed migration notes, component breakdowns, and prior architecture diagrams live under `docs/project-history/domains/reviews/`. Consult those for step-by-step context when auditing past decisions.

Update this README as tasks progress; move granular change logs into the project history folder to keep this doc actionable for current work.
