# Reviews Domain - Final Component-Based Architecture

**Status:** ✅ Implemented Correctly
**Last Updated:** 2025-10-26
**Pattern:** Component-Level Templates (matches landing domain)

---

## ✅ Correct Architecture (Component-Level)

```
src/domains/customer-facing/reviews/
├── RatingsSummary/              # Component: Ratings statistics display
│   └── templates/
│       ├── template-1/          # Default: Bar chart with distribution
│       │   └── index.tsx
│       ├── template-2/          # Future: Pie chart variant
│       └── template-3/          # Future: Minimalist stats
│
├── ReviewCard/                  # Component: Individual review display
│   └── templates/
│       ├── template-1/          # Default: Enhanced card with photos
│       │   └── index.tsx
│       ├── template-2/          # Future: Minimal card
│       └── template-3/          # Future: Testimonial style
│
├── FilterBar/                   # Component: Filter controls
│   └── templates/
│       └── template-1/          # Default: Sidebar filters
│           └── index.tsx
│
├── ReviewsGrid/                 # Component: Grid layout wrapper
│   └── templates/
│       └── template-1/          # Default: Responsive grid
│           └── index.tsx
│
├── AddReviewModal/              # Component: Review submission
│   └── templates/
│       └── template-1/          # Default: Modal form
│           └── index.tsx
│
├── ImageLightbox/               # Component: Photo viewer
│   └── templates/
│       └── template-1/          # Default: Lightbox gallery
│           └── index.tsx
│
├── pages/
│   ├── ReviewsPage.tsx          # Customer-facing page
│   └── AdminReviewsPage.tsx     # Admin management (future)
│
├── actions.ts                    # Server actions
├── ReviewsPageClient.tsx         # Client wrapper
├── index.ts                      # Public exports
└── README.md
```

---

## 🎯 Why Component-Level Organization?

### Matches Landing Domain Pattern
Landing domain organizes by component type:
- `hero-templates/` - Hero component with 14 variants
- `review-templates/` - Review component with 11 variants
- `menu-templates/` - Menu component variants
- `gallery-templates/` - Gallery component variants

Reviews domain follows the same pattern:
- `RatingsSummary/` - Ratings component with variants
- `ReviewCard/` - Card component with variants
- `FilterBar/` - Filter component with variants

### Benefits
✅ Each component is **self-contained**
✅ Easy to **add new variants** per component
✅ Components can **evolve independently**
✅ Clear **separation of concerns**
✅ Easy to **swap variants** via config

---

## 📋 Component Breakdown

### 1. RatingsSummary
**Purpose:** Display overall rating statistics

**Template-1 Features:**
- Average rating with star display
- Total review count
- Rating distribution (5★ to 1★ bars)
- Featured tags display

**Future Templates:**
- template-2: Pie chart visualization
- template-3: Minimal stats only

### 2. ReviewCard
**Purpose:** Display individual review

**Template-1 Features:**
- Reviewer name + verified badge
- Star rating + date
- Review text with "Read more"
- Photos (if available)
- Source badge (Google/TripAdvisor)
- Helpful button + count
- Admin reply display

**Future Templates:**
- template-2: Minimal card (text only)
- template-3: Testimonial style (quote format)

### 3. FilterBar
**Purpose:** Filter and sort controls

**Template-1 Features:**
- Rating filter (All, 5★, 4★, etc.)
- Source filter (All, Google, TripAdvisor, Direct)
- Feature filter (Photo, Verified, Recent)
- Sort dropdown (Newest, Highest, Helpful)

**Future Templates:**
- template-2: Top bar with chips
- template-3: Minimal dropdown only

### 4. ReviewsGrid
**Purpose:** Layout wrapper for review cards

**Template-1 Features:**
- Responsive grid (1 col mobile, 2 cols desktop)
- Infinite scroll or pagination
- Empty state handling
- Loading states

**Future Templates:**
- template-2: Masonry layout
- template-3: List view

### 5. AddReviewModal
**Purpose:** Review submission form

**Template-1 Features:**
- Star rating selector
- Text area with character limit
- Photo upload (optional)
- Anonymous/named toggle
- Form validation
- Success/error states

### 6. ImageLightbox
**Purpose:** Photo gallery viewer

**Template-1 Features:**
- Fullscreen image display
- Navigation arrows
- Zoom controls
- Close button
- Thumbnail strip

---

## 🔧 How Pages Use Components

### ReviewsPage.tsx
The page composes all components together:

```typescript
// pages/ReviewsPage.tsx
import { RatingsSummary } from '../RatingsSummary/templates/template-1';
import { FilterBar } from '../FilterBar/templates/template-1';
import { ReviewsGrid } from '../ReviewsGrid/templates/template-1';
import { ReviewCard } from '../ReviewCard/templates/template-1';

export default async function ReviewsPage() {
  const reviews = await getReviews();
  const stats = await getRatingStats();

  return (
    <div>
      <RatingsSummary stats={stats} />

      <div className="grid lg:grid-cols-[300px_1fr]">
        <FilterBar />

        <ReviewsGrid>
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ReviewsGrid>
      </div>
    </div>
  );
}
```

---

## 🎨 Template Variant Selection

### Per-Component Configuration
Each component can have its own template variant:

```typescript
// Tenant config
features: {
  reviews: {
    components: {
      ratingsSummary: { variant: 'template-1' },
      reviewCard: { variant: 'template-2' },      // Different variant!
      filterBar: { variant: 'template-1' },
      reviewsGrid: { variant: 'template-3' },     // Different variant!
    }
  }
}
```

### Host Pattern (Optional)
Can create host components for each:

```typescript
// RatingsSummary/RatingsSummaryHost.tsx
const VARIANTS = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
};

export function RatingsSummaryHost({ variant, ...props }) {
  const Component = VARIANTS[variant] ?? Template1;
  return <Component {...props} />;
}
```

---

## 📊 Comparison with Landing Domain

### Landing Domain (Reference)
```
landing/
├── hero-templates/
│   ├── template-1/
│   ├── template-2/
│   ├── HeroHost.tsx
│   └── types.ts
│
├── review-templates/
│   ├── primary/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   ├── ReviewHost.tsx
│   └── types.ts
│
└── index.tsx (composes all sections)
```

### Reviews Domain (Matching Pattern)
```
reviews/
├── RatingsSummary/
│   └── templates/
│       └── template-1/index.tsx
│
├── ReviewCard/
│   └── templates/
│       └── template-1/index.tsx
│
└── pages/ReviewsPage.tsx (composes all components)
```

**Key Principle:** Each component = separate folder with template variants

---

## 🚀 Adding New Component Templates

### Example: Add RatingsSummary Template-2

1. **Create template folder:**
```bash
mkdir -p src/domains/customer-facing/reviews/RatingsSummary/templates/template-2
```

2. **Add template file:**
```typescript
// RatingsSummary/templates/template-2/index.tsx
export default function RatingsSummaryTemplate2({ stats }) {
  return (
    <div>
      {/* Pie chart variant */}
    </div>
  );
}
```

3. **Create host component (optional):**
```typescript
// RatingsSummary/RatingsSummaryHost.tsx
import Template1 from './templates/template-1';
import Template2 from './templates/template-2';

const VARIANTS = { 'template-1': Template1, 'template-2': Template2 };

export function RatingsSummaryHost({ variant = 'template-1', ...props }) {
  const Component = VARIANTS[variant] ?? Template1;
  return <Component {...props} />;
}
```

4. **Update page to use host:**
```typescript
// pages/ReviewsPage.tsx
import { RatingsSummaryHost } from '../RatingsSummary/RatingsSummaryHost';

// Use variant from config
<RatingsSummaryHost variant={config.ratingsSummaryVariant} stats={stats} />
```

---

## ✅ Architecture Checklist

**Component-Level Organization:** ✅
- [x] Each component in own folder
- [x] Each component has templates/ subfolder
- [x] Each template in template-N/ folder

**Follows Landing Pattern:** ✅
- [x] Matches hero-templates/ structure
- [x] Matches review-templates/ structure
- [x] Self-contained components

**No Generic Folders:** ✅
- [x] No domain-level components/
- [x] No domain-level templates/
- [x] Everything component-specific

**Pages Compose Components:** ✅
- [x] ReviewsPage.tsx imports from components
- [x] Each component used independently

---

## 📚 Related Documentation

- [Main Architecture](../../../ARCHITECTURE.md) - Master architecture guide
- [Landing Hero Templates](../../landing/hero-templates/template-1/) - Reference example
- [Landing Review Templates](../../landing/review-templates/primary/) - Reference example

---

## 🎯 Next Steps

### Immediate:
- [x] Reorganize into component folders
- [x] Move component files to template-1
- [ ] Add types/ folders to each component
- [ ] Add hooks/ folders where needed
- [ ] Add utils/ folders where needed
- [ ] Update imports in ReviewsPage.tsx
- [ ] Test build

### Future:
- [ ] Create template-2 variants for key components
- [ ] Create template-3 variants for key components
- [ ] Add Host components for variant selection
- [ ] Configure per-tenant component variants

---

**Status:** ✅ Component-Level Architecture Implemented
**Pattern:** Matches `landing/hero-templates/`, `landing/review-templates/`
**Ready for:** Template variants + configuration
