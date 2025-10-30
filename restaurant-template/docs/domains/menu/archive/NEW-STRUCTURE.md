# ✅ Menu Domain - Improved Structure

**Date**: October 26, 2025
**Status**: 🟢 **REORGANIZED & OPTIMIZED**

---

## 🎯 New Architecture Pattern

**Before** (scattered types/hooks/utils):
```
menu/
└── menu-category-templates/primary/
    ├── components/
    ├── hooks/          ❌ Shared hooks buried in template
    ├── types/          ❌ Shared types buried in template
    └── utils/          ❌ Empty folders everywhere
```

**After** (clean separation):
```
menu/
├── types/              ✅ All shared types at root
├── hooks/              ✅ All shared hooks at root
├── utils/              ✅ All shared utils at root
└── menu-header-templates/
    ├── primary/        ✅ Only components
    ├── template-2/     📝 Skeleton ready
    └── template-3/     📝 Skeleton ready
```

---

## 📁 Complete Structure

```
menu/
├── 📄 index.ts                          (Main barrel export)
├── 📄 ARCHITECTURE.md
├── 📄 TEMPLATE-ARCHITECTURE.md
├── 📄 MENU-PAGE-BMAD-PLAN.md
├── 📄 NEW-STRUCTURE.md                  (This file)
│
├── 📁 types/                            ✅ ROOT LEVEL
│   ├── menu.types.ts                   (MenuItem, MenuCategory)
│   ├── menu.constants.ts               (Fallbacks, config)
│   └── index.ts                        (Barrel export)
│
├── 📁 hooks/                            ✅ ROOT LEVEL
│   ├── use-menu.ts                     (React Query hooks)
│   ├── menu.service.ts                 (Supabase service)
│   └── index.ts                        (Barrel export)
│
├── 📁 utils/                            ✅ ROOT LEVEL
│   ├── menu-images.ts                  (Image utilities)
│   └── index.ts                        (Barrel export)
│
├── 📁 pages/
│   ├── MenuPage.tsx                    (Old page)
│   ├── MenuPageNew.tsx                 (New page)
│   └── AdminMenuPage.tsx
│
├── 📁 menu-header-templates/
│   ├── primary/
│   │   ├── components/
│   │   │   └── MenuHeader.tsx
│   │   └── index.ts
│   ├── template-2/                     📝 PLACEHOLDER
│   │   ├── components/
│   │   └── README.md
│   └── template-3/                     📝 PLACEHOLDER
│       ├── components/
│       └── README.md
│
├── 📁 menu-category-templates/
│   ├── primary/
│   │   ├── components/
│   │   │   ├── MenuCategoryTabs.tsx
│   │   │   └── MenuCategoryIcon.tsx
│   │   └── index.ts
│   ├── template-2/                     📝 PLACEHOLDER
│   └── template-3/                     📝 PLACEHOLDER
│
├── 📁 menu-item-card-templates/
│   ├── primary/
│   │   ├── components/
│   │   │   ├── MenuItemCard.tsx
│   │   │   └── MenuItemSimple.tsx
│   │   └── index.ts
│   ├── template-2/                     📝 PLACEHOLDER
│   └── template-3/                     📝 PLACEHOLDER
│
├── 📁 menu-item-detail-templates/
│   ├── primary/
│   │   ├── components/
│   │   │   └── MenuItemDetailDialog.tsx
│   │   └── index.ts
│   ├── template-2/                     📝 PLACEHOLDER
│   └── template-3/                     📝 PLACEHOLDER
│
├── 📁 menu-grid-templates/
│   ├── primary/
│   │   ├── components/
│   │   │   └── MenuItemGrid.tsx
│   │   └── index.ts
│   ├── template-2/                     📝 PLACEHOLDER
│   └── template-3/                     📝 PLACEHOLDER
│
├── 📁 menu-state-templates/
│   ├── primary/
│   │   ├── components/
│   │   │   ├── MenuLoadingState.tsx
│   │   │   ├── MenuErrorAlert.tsx
│   │   │   ├── MenuEmptyState.tsx
│   │   │   ├── MenuItemSkeleton.tsx
│   │   │   ├── MenuDataPrefetcher.tsx
│   │   │   └── MenuAboutSection.tsx
│   │   └── index.ts
│   ├── template-2/                     📝 PLACEHOLDER
│   └── template-3/                     📝 PLACEHOLDER
│
└── 📁 menu-search-templates/
    ├── primary/
    │   ├── components/
    │   └── index.ts
    ├── template-2/                     📝 PLACEHOLDER
    └── template-3/                     📝 PLACEHOLDER
```

---

## ✨ Key Improvements

### 1. Shared Code at Root Level
**Before**: Hooks/types scattered across template folders
**After**: Centralized at `types/`, `hooks/`, `utils/`

**Benefits**:
- ✅ Easy to find shared code
- ✅ No duplication across templates
- ✅ Clear separation of concerns
- ✅ Simpler imports

### 2. Template Folders = Components Only
**Before**: Each template had empty `hooks/`, `types/`, `utils/` folders
**After**: Templates only contain `components/` and `index.ts`

**Benefits**:
- ✅ No empty folders cluttering structure
- ✅ Clear that templates are just UI variations
- ✅ Easier to add new templates

### 3. Template Variants Ready
**Before**: Only `primary/` existed
**After**: `primary/`, `template-2/`, `template-3/` skeleton structure

**Benefits**:
- ✅ Ready for Phase 2 alternative designs
- ✅ Clear placeholder with README
- ✅ Scalable pattern established

---

## 📦 Import Pattern

### From Root-Level Shared Code
```typescript
// Import types from root
import { MenuItem, MenuCategory } from '@/domains/customer-facing/menu/types';

// Import hooks from root
import { useMenuCategories } from '@/domains/customer-facing/menu/hooks';

// Import utils from root
import { getMenuItemImage } from '@/domains/customer-facing/menu/utils';
```

### From Template Components
```typescript
// Import components from specific template
import { MenuHeader } from '@/domains/customer-facing/menu/menu-header-templates/primary';

// Or use main barrel export
import { MenuHeader, MenuCategoryTabs } from '@/domains/customer-facing/menu';
```

### Main Barrel Export (Recommended)
```typescript
// Everything accessible from domain root
import {
  // Types
  type MenuItem,
  type MenuCategory,

  // Hooks
  useMenuCategories,
  useMenuItems,

  // Components
  MenuHeader,
  MenuCategoryTabs,
  MenuItemCard,
  MenuItemDetailDialog,

  // State components
  MenuLoadingState,
  MenuErrorAlert,
} from '@/domains/customer-facing/menu';
```

---

## 🔄 Migration Checklist

- [x] Move `menu.types.ts` to `types/`
- [x] Move `menu.constants.ts` to `types/`
- [x] Move `use-menu.ts` to `hooks/`
- [x] Move `menu.service.ts` to `hooks/`
- [x] Move `menu-images.ts` to `utils/`
- [x] Remove empty `hooks/`, `types/`, `utils/` from templates
- [x] Create `template-2/` skeletons for all templates
- [x] Create `template-3/` skeletons for all templates
- [x] Update template barrel exports (components only)
- [x] Create root-level barrel exports (`types/index.ts`, `hooks/index.ts`, `utils/index.ts`)
- [x] Update main domain `index.ts`
- [x] Fix import paths in moved files
- [x] Verify all imports still work

---

## 🎨 Template Variant Guidelines

### When to Create New Template
Create `template-2` or `template-3` when you need:
- Different visual design
- Different interaction pattern
- Different layout structure
- Different animation style

### What Goes in Each Template
**primary/** - Main production template
- Production-ready components
- Fully tested and optimized
- Complete documentation

**template-2/** - Alternative design #1
- Different visual approach
- Same functionality
- Own README explaining differences

**template-3/** - Alternative design #2
- Another variation
- Same functionality
- Own README explaining differences

### Placeholder README Template
```markdown
# [Component] Template 2

**Status**: 📝 Placeholder - Not Yet Implemented

## Planned Features
- Feature 1
- Feature 2
- Feature 3

## Differences from Primary
- Difference 1
- Difference 2

## Implementation
Coming in Phase 2
```

---

## 🚀 Benefits of New Structure

### Developer Experience
1. **Faster Onboarding**: Obvious where everything lives
2. **Less Cognitive Load**: No hunting through template folders
3. **Easier Refactoring**: Shared code centralized
4. **Cleaner Diffs**: Changes grouped logically

### Code Organization
1. **No Duplication**: Shared code lives once
2. **Clear Boundaries**: Templates = UI, Root = Logic
3. **Scalable**: Easy to add template-4, template-5, etc.
4. **Consistent**: Matches improved landing page pattern

### Maintenance
1. **Easier Updates**: Change types once, affects all templates
2. **Simpler Testing**: Test shared logic separately
3. **Better Debugging**: Know where to look immediately
4. **Version Control**: Logical file grouping

---

## 📚 Related Documentation

1. **TEMPLATE-ARCHITECTURE.md** - Overall template pattern
2. **ARCHITECTURE-COMPARISON.md** - Before/after comparison
3. **MENU-PAGE-BMAD-PLAN.md** - Implementation roadmap
4. **SUPABASE-CONNECTION.md** - Database integration

---

**Status**: ✅ **REORGANIZATION COMPLETE**
**Pattern**: Root-level shared code + Template variants
**Last Updated**: October 26, 2025
