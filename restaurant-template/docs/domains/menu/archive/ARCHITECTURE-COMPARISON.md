# Menu Domain Architecture - Before & After

## 📊 Visual Comparison

### BEFORE (Domain-Based) ❌
```
menu/
├── components/
│   ├── MenuHeader.tsx
│   ├── MenuCategoryTabs.tsx
│   ├── MenuCategoryIcon.tsx
│   ├── MenuItemCard.tsx
│   ├── MenuItemSimple.tsx
│   ├── MenuItemDetailDialog.tsx
│   ├── MenuItemGrid.tsx
│   ├── MenuLoadingState.tsx
│   ├── MenuErrorAlert.tsx
│   ├── MenuEmptyState.tsx
│   ├── MenuItemSkeleton.tsx
│   ├── MenuDataPrefetcher.tsx
│   └── MenuAboutSection.tsx
├── hooks/
│   ├── use-menu.ts
│   └── (no clear organization)
├── types/
│   └── menu.types.ts
├── services/
│   └── menu.service.ts
├── constants/
│   └── menu.constants.ts
├── utils/
│   └── menu-images.ts
└── pages/
    ├── MenuPage.tsx
    └── AdminMenuPage.tsx
```

**Problems**:
- 🔴 All components in one folder (hard to find)
- 🔴 No grouping by functionality
- 🔴 Can't swap design variations easily
- 🔴 Types/hooks scattered across folders
- 🔴 Doesn't scale for multiple designs

---

### AFTER (Template-Based) ✅
```
menu/
├── menu-header-templates/
│   └── primary/
│       ├── components/
│       │   └── MenuHeader.tsx
│       ├── hooks/
│       ├── types/
│       └── utils/
│
├── menu-category-templates/
│   └── primary/
│       ├── components/
│       │   ├── MenuCategoryTabs.tsx
│       │   └── MenuCategoryIcon.tsx
│       ├── hooks/
│       │   ├── use-menu.ts
│       │   └── menu.service.ts
│       ├── types/
│       │   └── menu.constants.ts
│       └── utils/
│
├── menu-item-card-templates/
│   └── primary/
│       ├── components/
│       │   ├── MenuItemCard.tsx
│       │   └── MenuItemSimple.tsx
│       ├── types/
│       │   └── menu.types.ts
│       └── utils/
│           └── menu-images.ts
│
├── menu-item-detail-templates/
│   └── primary/
│       ├── components/
│       │   └── MenuItemDetailDialog.tsx
│       ├── hooks/
│       ├── types/
│       └── utils/
│
├── menu-grid-templates/
│   └── primary/
│       ├── components/
│       │   └── MenuItemGrid.tsx
│       ├── hooks/
│       ├── types/
│       └── utils/
│
├── menu-state-templates/
│   └── primary/
│       ├── components/
│       │   ├── MenuLoadingState.tsx
│       │   ├── MenuErrorAlert.tsx
│       │   ├── MenuEmptyState.tsx
│       │   ├── MenuItemSkeleton.tsx
│       │   ├── MenuDataPrefetcher.tsx
│       │   └── MenuAboutSection.tsx
│       ├── hooks/
│       ├── types/
│       └── utils/
│
├── menu-search-templates/        [🚧 Phase 2]
│   └── primary/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
│
└── pages/
    ├── MenuPage.tsx
    └── AdminMenuPage.tsx
```

**Benefits**:
- ✅ Clear functional grouping
- ✅ Easy to add template-2, template-3 variants
- ✅ Co-located components + logic + types
- ✅ Scales with multiple design systems
- ✅ Matches landing page pattern (consistency)

---

## 🎨 Template Variants - Future Ready

### Current: Primary Templates Only
```
menu-category-templates/
└── primary/              ← Only one variant (current)
    └── ...
```

### Future: Multiple Variants
```
menu-category-templates/
├── primary/              ← Tab-based navigation (current)
├── template-2/           ← Dropdown category selector
└── template-3/           ← Sidebar navigation
```

**Swapping Templates**:
```tsx
// Easy to swap between designs
import { MenuCategoryTabs } from '@/domains/customer-facing/menu/menu-category-templates/primary';
// vs
import { MenuCategoryDropdown } from '@/domains/customer-facing/menu/menu-category-templates/template-2';
// vs
import { MenuCategorySidebar } from '@/domains/customer-facing/menu/menu-category-templates/template-3';
```

---

## 📦 Import Changes

### Before (Direct Imports)
```tsx
import MenuHeader from '@/domains/customer-facing/menu/components/MenuHeader';
import MenuCategoryTabs from '@/domains/customer-facing/menu/components/MenuCategoryTabs';
import MenuItemCard from '@/domains/customer-facing/menu/components/MenuItemCard';
import { useMenu } from '@/domains/customer-facing/menu/hooks/use-menu';
import type { MenuItem } from '@/domains/customer-facing/menu/types/menu.types';
```

### After (Barrel Exports)
```tsx
import {
  MenuHeader,
  MenuCategoryTabs,
  MenuItemCard,
  useMenu,
  type MenuItem
} from '@/domains/customer-facing/menu';
```

**Cleaner imports** = Less cognitive load

---

## 🔄 Landing Page Pattern Comparison

This architecture **directly mirrors** the landing page:

### Landing Page Structure
```
landing/
├── hero-templates/
│   ├── template-1/
│   ├── template-2/
│   └── template-3/
├── gallery-templates/
│   ├── template-1/
│   ├── template-2/
│   └── template-3/
└── review-templates/
    ├── template-1/
    ├── template-2/
    └── template-3/
```

### Menu Page Structure (Now Matches!)
```
menu/
├── menu-header-templates/
│   └── primary/
├── menu-category-templates/
│   └── primary/
└── menu-item-card-templates/
    └── primary/
```

**Consistency Win**:
- Same mental model across domains
- Predictable folder structure
- Easy onboarding for new developers

---

## 🚀 Migration Checklist

- [x] Create template folder structure
- [x] Move components to templates
- [x] Move hooks to templates
- [x] Move types to templates
- [x] Move services to templates
- [x] Move constants to templates
- [x] Move utils to templates
- [x] Create barrel exports for each template
- [x] Update main domain index.ts
- [x] Move BMAD plan to menu domain
- [x] Create architecture documentation
- [ ] Update component imports (auto-handled by barrel exports)
- [ ] Test builds and imports
- [ ] Update ARCHITECTURE.md

---

**Migration Date**: October 26, 2025
**Pattern Source**: Landing Page Domain
**Status**: ✅ Complete
