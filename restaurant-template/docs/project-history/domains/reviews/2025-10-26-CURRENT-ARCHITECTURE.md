# Reviews Domain - Current Architecture

**Status:** Partially Implemented
**Last Updated:** 2025-10-26

---

## 📁 Current Structure

```
src/domains/customer-facing/reviews/
├── pages/
│   └── ReviewsPage.tsx            # ✅ Template-based page (NEW - preferred)
│
├── templates/
│   ├── template-1/
│   │   └── index.tsx              # ✅ Basic grid layout (placeholder)
│   ├── template-2/
│   │   └── index.tsx              # ⚠️  Placeholder
│   ├── template-3/
│   │   └── index.tsx              # ⚠️  Placeholder
│   ├── ReviewsHost.tsx            # ✅ Template router
│   └── types.ts                   # ✅ Template types
│
├── components/                     # ⚠️  Currently EMPTY (needs population)
│
├── actions.ts                      # ✅ Server actions (filters, submission, etc)
├── ReviewsPageClient.tsx           # ✅ Client wrapper for interactivity
├── ReviewsPage.old.tsx             # 🗑️  OLD implementation (archived)
└── index.ts                        # ✅ Public exports

src/app/(marketing)/reviews/
├── components/                     # ⚠️  TO BE MOVED to domain/templates/template-1/
│   ├── AddReviewModal.tsx          # ✅ Review submission modal
│   ├── EnhancedReviewCard.tsx      # ✅ Review card component
│   ├── FilterBar.tsx               # ✅ Filter controls
│   ├── ImageLightbox.tsx           # ✅ Photo viewer
│   ├── RatingsSummary.tsx          # ✅ Ratings stats display
│   └── ReviewsGrid.tsx             # ✅ Reviews grid layout
└── page.tsx                        # ✅ Route entry point (imports from domain)
```

---

## 🔄 Migration Status

### ✅ Completed
- [x] Domain folder structure created
- [x] Template system scaffolded
- [x] Server actions implemented
- [x] Basic ReviewsPage using templates
- [x] Fixed export error (renamed index.tsx → ReviewsPage.old.tsx)

### ⚠️  In Progress
- [ ] Move components from `app/(marketing)/reviews/components/` to `templates/template-1/components/`
- [ ] Update imports in moved components
- [ ] Create hooks folder in template-1
- [ ] Create utils folder in template-1

### 🚧 Pending
- [ ] Implement template-1 using moved components
- [ ] Create hooks (useReviewFilters, useReviewSubmission)
- [ ] Create utils (reviewHelpers.ts)
- [ ] Implement templates 2 & 3
- [ ] Mobile testing

---

## 📦 Components to Move

### From: `app/(marketing)/reviews/components/`
### To: `domains/reviews/templates/template-1/components/`

| Component | Description | Status |
|-----------|-------------|--------|
| **AddReviewModal.tsx** | Review submission form with validation | ⚠️  Needs move |
| **EnhancedReviewCard.tsx** | Review card with photos, helpful votes | ⚠️  Needs move |
| **FilterBar.tsx** | Filter controls (rating, source, sort) | ⚠️  Needs move |
| **ImageLightbox.tsx** | Photo gallery viewer | ⚠️  Needs move |
| **RatingsSummary.tsx** | Rating stats and distribution | ⚠️  Needs move |
| **ReviewsGrid.tsx** | Grid layout for review cards | ⚠️  Needs move |

---

## 🎯 Current Template Types

```typescript
// From: templates/types.ts

export type ReviewsVariant = 'template-1' | 'template-2' | 'template-3';

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string | null;
  publishedAt: string | null;
}

export interface ReviewsTemplateProps {
  reviews: Review[];
  tenant: {
    displayName: string;
    slug: string;
  };
}
```

**⚠️  Note:** The Review type in `templates/types.ts` is simplified. The actual Review type used by components is more complex (includes photos, helpful_count, etc). These types need to be reconciled.

---

## 🔧 Server Actions

```typescript
// From: actions.ts

✅ getReviewsWithFilters(filters: ReviewFilters)
   - Fetches and filters reviews from database

✅ getRatingStats()
   - Calculates average rating and distribution

✅ getFeaturedTags()
   - Extracts popular tags from reviews

✅ submitReview(data: ReviewFormData)
   - Validates and saves new review

✅ incrementHelpfulCount(reviewId: string)
   - Increments helpful vote counter
```

---

## 🚨 Known Issues

### 1. **Type Mismatch**
- `templates/types.ts` has simplified `Review` type
- Components expect richer type with `photos`, `helpful_count`, `source`, etc
- **Fix:** Expand `Review` type in `templates/types.ts`

### 2. **Component Imports**
- Old ReviewsPage.tsx imports from `@/app/(marketing)/reviews/components/`
- These paths will break when components move
- **Fix:** Update all imports to use template-1 components

### 3. **Shared Components**
- Some components (AddReviewModal, StarRating) might be shared across templates
- Currently no clear shared component location
- **Fix:** Keep truly shared components in `domains/reviews/components/`

---

## 🎨 Recommended Architecture

### Template-1: Advanced Grid Layout
**Location:** `templates/template-1/`

```
template-1/
├── index.tsx                      # Main template component
├── components/
│   ├── ReviewCard.tsx             # (from EnhancedReviewCard.tsx)
│   ├── RatingsSummary.tsx         # (moved from app)
│   ├── FilterBar.tsx              # (moved from app)
│   ├── ReviewsGrid.tsx            # (moved from app)
│   └── ImageLightbox.tsx          # (moved from app)
├── hooks/
│   ├── useReviewFilters.ts        # Filter state management
│   └── useImageLightbox.ts        # Lightbox state management
└── utils/
    └── reviewHelpers.ts           # Rating calculations, formatting
```

### Shared Domain Components
**Location:** `domains/reviews/components/`

```
components/
├── AddReviewModal.tsx             # Used across all templates
├── StarRating.tsx                 # Reusable rating display
├── VerifiedBadge.tsx              # Trust signal badge
└── SourceBadge.tsx                # Google/TripAdvisor badge
```

---

## 🛤️  Migration Steps

### Step 1: Move Components
```bash
# Create folders
mkdir -p src/domains/customer-facing/reviews/templates/template-1/components
mkdir -p src/domains/customer-facing/reviews/templates/template-1/hooks
mkdir -p src/domains/customer-facing/reviews/templates/template-1/utils

# Move template-specific components
mv src/app/(marketing)/reviews/components/EnhancedReviewCard.tsx \
   src/domains/customer-facing/reviews/templates/template-1/components/ReviewCard.tsx

mv src/app/(marketing)/reviews/components/RatingsSummary.tsx \
   src/domains/customer-facing/reviews/templates/template-1/components/

mv src/app/(marketing)/reviews/components/FilterBar.tsx \
   src/domains/customer-facing/reviews/templates/template-1/components/

mv src/app/(marketing)/reviews/components/ReviewsGrid.tsx \
   src/domains/customer-facing/reviews/templates/template-1/components/

mv src/app/(marketing)/reviews/components/ImageLightbox.tsx \
   src/domains/customer-facing/reviews/templates/template-1/components/

# Move shared component
mv src/app/(marketing)/reviews/components/AddReviewModal.tsx \
   src/domains/customer-facing/reviews/components/
```

### Step 2: Update Imports
Update all moved components to import from correct paths:
- Update component internal imports
- Update `ReviewsPageClient.tsx` imports
- Update `template-1/index.tsx` to use new components

### Step 3: Reconcile Types
```typescript
// Update templates/types.ts
export interface Review {
  id: string;
  authorName: string;
  author_email?: string;
  rating: number;
  comment: string | null;
  verified: boolean;
  source: 'google' | 'tripadvisor' | 'direct';
  photos?: string[];
  helpful_count: number;
  admin_reply?: string;
  publishedAt: string | null;
  created_at: string;
}
```

### Step 4: Implement Template-1
Update `templates/template-1/index.tsx` to use the rich components instead of placeholder.

### Step 5: Test
- [ ] Reviews page loads
- [ ] Filters work
- [ ] Submit review works
- [ ] Helpful votes work
- [ ] Photos display
- [ ] Mobile responsive

---

## 📊 Component Dependencies

```
ReviewsPage (pages/ReviewsPage.tsx)
  └── ReviewsHost (templates/ReviewsHost.tsx)
      └── Template-1 (templates/template-1/index.tsx)
          ├── RatingsSummary
          ├── FilterBar
          └── ReviewsGrid
              └── ReviewCard (EnhancedReviewCard)
                  ├── StarRating
                  ├── VerifiedBadge
                  ├── SourceBadge
                  └── ImageLightbox

ReviewsPageClient (ReviewsPageClient.tsx)
  └── AddReviewModal
      └── StarRating
```

---

## 🎯 Success Criteria

- [ ] All components moved to correct locations
- [ ] All imports updated and working
- [ ] Types reconciled across domain
- [ ] Reviews page renders without errors
- [ ] All features working (filters, submission, helpful votes)
- [ ] Mobile responsive
- [ ] Performance targets met (LCP < 2.5s)

---

## 📚 Related Documentation

- [BMAD Plan](./BMAD-PLAN.md) - Full architecture and feature plan
- [User Needs](../../research/user-needs-by-page.md) - User requirements
- [Page Blueprints](../../ux/page-blueprints.md) - UI specifications

---

**Next Action:** Begin Step 1 - Move components to template-1
