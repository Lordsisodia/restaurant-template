# Reviews Domain - Corrected Architecture

**Status:** Implemented ✅
**Last Updated:** 2025-10-26
**Following:** restaurant-template/ARCHITECTURE.md Template Pattern

---

## ✅ Correct Architecture (Following ARCHITECTURE.md)

```
src/domains/customer-facing/reviews/
├── templates/
│   ├── template-1/                    # Primary variant (Grid + Filters)
│   │   ├── components/                # ✅ Template-specific components
│   │   │   ├── AddReviewModal.tsx
│   │   │   ├── EnhancedReviewCard.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── ImageLightbox.tsx
│   │   │   ├── RatingsSummary.tsx
│   │   │   └── ReviewsGrid.tsx
│   │   ├── hooks/                     # ✅ Template-specific hooks
│   │   ├── utils/                     # ✅ Template-specific utilities
│   │   ├── types/                     # ✅ Template-specific types
│   │   └── index.tsx                  # Main template export
│   │
│   ├── template-2/                    # Future: Masonry layout
│   │   └── index.tsx
│   │
│   ├── template-3/                    # Future: Carousel layout
│   │   └── index.tsx
│   │
│   ├── ReviewsHost.tsx                # Template selector (routing)
│   └── types.ts                       # Shared template types
│
├── pages/
│   ├── ReviewsPage.tsx                # Customer-facing page
│   └── AdminReviewsPage.tsx           # Admin management (future)
│
├── actions.ts                          # Server actions
├── ReviewsPageClient.tsx               # Client wrapper
├── index.ts                            # Public exports
└── README.md
```

---

## 📋 What Changed from Initial Plan

### ❌ WRONG Initial Structure:
```
reviews/
├── pages/ReviewsPage.tsx
├── templates/
│   └── template-1/
│       └── index.tsx              # Lone file, no structure
├── components/                     # Generic components folder
└── hooks/                          # Generic hooks folder
```

### ✅ CORRECT Structure (Matches ARCHITECTURE.md):
```
reviews/
├── templates/
│   └── template-1/
│       ├── components/             # All components HERE
│       ├── hooks/                  # All hooks HERE
│       ├── utils/                  # All utils HERE
│       └── index.tsx
├── pages/ReviewsPage.tsx
└── index.ts
```

---

## 🎯 Key Architecture Principles Applied

### 1. Template-1 is Self-Contained
Following landing's `review-templates/primary` pattern:
- **Components** - Live inside template-1/components/
- **Hooks** - Live inside template-1/hooks/
- **Utils** - Live inside template-1/utils/
- **Types** - Live inside template-1/types/

### 2. No Generic Component/Hooks Folders
- ❌ `reviews/components/` - WRONG
- ✅ `reviews/templates/template-1/components/` - CORRECT

### 3. Host Pattern for Variant Selection
```typescript
// ReviewsHost.tsx routes to template based on config
const VARIANTS = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
};
```

### 4. Page Uses Host
```typescript
// pages/ReviewsPage.tsx
const variant = config.reviews.variant || 'template-1';
return <ReviewsHost variant={variant} reviews={reviews} />;
```

---

## 📁 Template-1 Internal Structure

Based on `landing/review-templates/primary/`:

```
template-1/
├── components/
│   ├── AddReviewModal.tsx          # Review submission modal
│   ├── EnhancedReviewCard.tsx      # Individual review card
│   ├── FilterBar.tsx               # Filter controls
│   ├── ImageLightbox.tsx           # Photo gallery viewer
│   ├── RatingsSummary.tsx          # Rating stats display
│   └── ReviewsGrid.tsx             # Grid layout wrapper
│
├── hooks/
│   ├── useReviewFilters.ts         # Filter state management
│   ├── useReviewSubmission.ts      # Form submission logic
│   └── useImageLightbox.ts         # Lightbox state
│
├── utils/
│   └── reviewHelpers.ts            # Rating calculations, formatting
│
├── types/
│   └── index.ts                    # Template-specific types
│
└── index.tsx                        # Main template component
```

---

## 🔄 Migration Completed

### ✅ Steps Completed:

1. **Created folder structure** in template-1:
   - `components/`
   - `hooks/`
   - `utils/`
   - `types/`

2. **Moved components** from `app/(marketing)/reviews/components/` to `templates/template-1/components/`:
   - ✅ AddReviewModal.tsx
   - ✅ EnhancedReviewCard.tsx
   - ✅ FilterBar.tsx
   - ✅ ImageLightbox.tsx
   - ✅ RatingsSummary.tsx
   - ✅ ReviewsGrid.tsx

3. **Preserved old implementation**:
   - Renamed `index.tsx` → `ReviewsPage.old.tsx` (backup)

4. **Fixed export error**:
   - `index.ts` now correctly exports from `pages/ReviewsPage`

---

## 🎨 How It Works

### 1. App Router (Thin Layer)
```typescript
// app/(marketing)/reviews/page.tsx
import { ReviewsPage } from '@/domains/customer-facing/reviews';
export default ReviewsPage;
```

### 2. Domain Page (Data Fetching)
```typescript
// domains/reviews/pages/ReviewsPage.tsx
export default async function ReviewsPage() {
  const tenant = await getTenantFromRequest();
  const reviews = await listReviews('published');

  // Get variant from config
  const variant = config.reviews.pageVariant || 'template-1';

  return (
    <ReviewsHost
      variant={variant}
      reviews={reviews}
      tenant={tenant}
    />
  );
}
```

### 3. Template Host (Routing)
```typescript
// domains/reviews/templates/ReviewsHost.tsx
export function ReviewsHost({ variant, ...props }) {
  const Component = VARIANTS[variant] ?? Template1;
  return <Component {...props} />;
}
```

### 4. Template Implementation (UI)
```typescript
// domains/reviews/templates/template-1/index.tsx
import { RatingsSummary } from './components/RatingsSummary';
import { FilterBar } from './components/FilterBar';
import { ReviewsGrid } from './components/ReviewsGrid';

export default function ReviewsTemplate1({ reviews, tenant }) {
  return (
    <div>
      <RatingsSummary {...} />
      <FilterBar {...} />
      <ReviewsGrid reviews={reviews} />
    </div>
  );
}
```

---

## 📊 Comparison with Landing Domain

### Landing Domain Structure (Reference):
```
landing/
├── hero-templates/              # Hero section variants
│   ├── template-1/
│   ├── HeroHost.tsx
│   └── types.ts
│
├── review-templates/            # Review section variants
│   ├── primary/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   ├── ReviewHost.tsx
│   └── types.ts
│
└── index.tsx                    # Composes all sections
```

### Reviews Domain Structure (Matching Pattern):
```
reviews/
├── templates/                   # Full page variants
│   ├── template-1/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   ├── ReviewsHost.tsx
│   └── types.ts
│
├── pages/
│   └── ReviewsPage.tsx          # Uses ReviewsHost
│
└── index.ts
```

**Key Similarity:** Both organize by template variant with internal component structure.

---

## 🚀 Next Steps

### Immediate:
- [x] Create template-1 folders
- [x] Move components to template-1
- [ ] Update template-1/index.tsx to use components
- [ ] Create hooks (useReviewFilters, useReviewSubmission)
- [ ] Create utils (reviewHelpers.ts)
- [ ] Test build

### Future Templates:
- [ ] template-2: Masonry layout with photo focus
- [ ] template-3: Carousel cards with testimonials

### Enhancement:
- [ ] Add proper TypeScript types in template-1/types/
- [ ] Implement hooks for state management
- [ ] Add animations (framer-motion)
- [ ] Mobile optimization

---

## ✅ Architecture Verification

**Follows ARCHITECTURE.md:** ✅
**Matches Landing Pattern:** ✅
**Has pages/ folder:** ✅
**Has templates/ with variants:** ✅
**Each template is self-contained:** ✅
**Host component routes:** ✅
**No generic component folders:** ✅

---

## 📚 Related Documentation

- [Main Architecture](../../../ARCHITECTURE.md) - Master architecture guide
- [BMAD Plan](./BMAD-PLAN.md) - Original detailed plan (outdated structure)
- [Landing Review Templates](../../landing/review-templates/primary/README.md) - Reference pattern

---

**Status:** ✅ Architecture Corrected & Components Moved
**Next:** Update template-1/index.tsx implementation
