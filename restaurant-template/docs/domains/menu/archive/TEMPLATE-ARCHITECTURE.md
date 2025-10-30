# Menu Domain - Template-Based Architecture

**Last Updated**: October 26, 2025
**Pattern**: Template-Based (matches Landing Page pattern)

---

## 🎯 Architecture Overview

This domain follows a **template-based architecture** where components are organized by their functional purpose into template folders. This pattern matches the landing page domain structure and provides better scalability for multiple design variations.

### Why Template-Based?

**OLD Structure** (Domain-Based):
```
menu/
├── components/     ← All components mixed together
├── hooks/          ← All hooks mixed together
├── types/          ← All types mixed together
└── services/       ← All services mixed together
```

**NEW Structure** (Template-Based):
```
menu/
├── menu-header-templates/
│   └── primary/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
├── menu-category-templates/
│   └── primary/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
└── ... (other templates)
```

**Benefits**:
- ✅ **Isolated variations** - Each template variant is self-contained
- ✅ **Easy to swap** - Switch between template-1, template-2, template-3
- ✅ **Co-located logic** - Component + hooks + types live together
- ✅ **Scalable** - Add new templates without touching existing code
- ✅ **Clear organization** - Know exactly where everything lives

---

## 📁 Template Folders

### 1. Menu Header Templates
**Path**: `menu-header-templates/primary/`

**Components**:
- `MenuHeader.tsx` - Top header with branding, navigation, search

**Purpose**: Main header section for the menu page

**Future Variants**:
- `template-2/` - Sticky header with search
- `template-3/` - Minimal header with filters

---

### 2. Menu Category Templates
**Path**: `menu-category-templates/primary/`

**Components**:
- `MenuCategoryTabs.tsx` - Category navigation tabs
- `MenuCategoryIcon.tsx` - Icons for each category

**Hooks**:
- `use-menu.ts` - React Query hooks for menu data
- `menu.service.ts` - Supabase data fetching services

**Types**:
- `menu.constants.ts` - Menu constants and fallback data

**Purpose**: Category navigation and filtering system

**Future Variants**:
- `template-2/` - Dropdown category selector
- `template-3/` - Sidebar category navigation

---

### 3. Menu Item Card Templates
**Path**: `menu-item-card-templates/primary/`

**Components**:
- `MenuItemCard.tsx` - Full menu item card with image, price, description
- `MenuItemSimple.tsx` - Simplified menu item card

**Types**:
- `menu.types.ts` - MenuItem, MenuCategory, MenuFilters types

**Utils**:
- `menu-images.ts` - Menu image utilities and fallbacks

**Purpose**: Display individual menu items in grid/list

**Future Variants**:
- `template-2/` - Horizontal card layout
- `template-3/` - Minimal card with hover details

---

### 4. Menu Item Detail Templates
**Path**: `menu-item-detail-templates/primary/`

**Components**:
- `MenuItemDetailDialog.tsx` - Modal/dialog for item details

**Purpose**: Show full menu item details when user clicks

**Future Variants**:
- `template-2/` - Slide-in panel
- `template-3/` - Separate page route

---

### 5. Menu Grid Templates
**Path**: `menu-grid-templates/primary/`

**Components**:
- `MenuItemGrid.tsx` - Grid layout for menu items

**Purpose**: Layout container for menu items

**Future Variants**:
- `template-2/` - Masonry grid layout
- `template-3/` - List view layout

---

### 6. Menu State Templates
**Path**: `menu-state-templates/primary/`

**Components**:
- `MenuLoadingState.tsx` - Loading skeleton
- `MenuErrorAlert.tsx` - Error display
- `MenuEmptyState.tsx` - Empty state (no items)
- `MenuItemSkeleton.tsx` - Item loading skeleton
- `MenuDataPrefetcher.tsx` - Data prefetching component
- `MenuAboutSection.tsx` - About restaurant section

**Purpose**: Handle all UI states (loading, error, empty)

**Future Variants**:
- `template-2/` - Animated loading states
- `template-3/` - Minimal loading states

---

### 7. Menu Search Templates
**Path**: `menu-search-templates/primary/`

**Status**: 🚧 **Not Yet Implemented** (Phase 2)

**Planned Components**:
- `MenuSearchBar.tsx` - Search input
- `MenuSearchResults.tsx` - Search results display

**Purpose**: Search across all menu items

---

## 🎨 Adding New Templates

### Step 1: Create Template Variant Folder
```bash
mkdir -p menu-category-templates/template-2/{components,hooks,types,utils}
```

### Step 2: Create Components
```tsx
// menu-category-templates/template-2/components/MenuCategoryDropdown.tsx
export function MenuCategoryDropdown() {
  // Your implementation
}
```

### Step 3: Create Barrel Export
```tsx
// menu-category-templates/template-2/index.ts
export { MenuCategoryDropdown } from './components/MenuCategoryDropdown';
```

### Step 4: Update Main Domain Index
```tsx
// menu/index.ts
export { MenuCategoryDropdown } from "./menu-category-templates/template-2";
```

---

## 📊 BMAD Plan Integration

The **MENU-PAGE-BMAD-PLAN.md** lives in this folder and outlines:
- **Build Phase**: Component specifications
- **Measure Phase**: Success metrics
- **Adapt Phase**: Design decisions
- **Deliver Phase**: Implementation roadmap

**Key Decisions from BMAD**:
- ✅ Modal for item details (not separate page)
- ✅ Click anywhere on card to open
- ✅ Category tabs (not infinite scroll)
- ✅ Global search in header

---

## 🔄 Migration from Old Structure

All components, hooks, types, and services have been **migrated** from:
```
menu/components/  → menu-*-templates/primary/components/
menu/hooks/       → menu-category-templates/primary/hooks/
menu/types/       → menu-item-card-templates/primary/types/
menu/services/    → menu-category-templates/primary/hooks/
menu/constants/   → menu-category-templates/primary/types/
menu/utils/       → menu-item-card-templates/primary/utils/
```

**Import Changes**:
```tsx
// OLD
import { MenuItemCard } from '@/domains/customer-facing/menu/components/MenuItemCard';
import { useMenu } from '@/domains/customer-facing/menu/hooks/use-menu';

// NEW (through barrel exports)
import { MenuItemCard, useMenu } from '@/domains/customer-facing/menu';
```

---

## 🚀 Current Implementation Status

### ✅ Phase 1 - Complete
- [x] MenuHeader
- [x] MenuCategoryTabs
- [x] MenuItemCard
- [x] MenuItemDetailDialog
- [x] MenuItemGrid
- [x] All state templates (loading, error, empty)

### 🚧 Phase 2 - Planned
- [ ] Menu Search Templates
- [ ] Menu Filter Templates (price range, dietary)
- [ ] Menu Sort Templates

### 🎯 Phase 3 - Future
- [ ] Favorites system
- [ ] Cart integration
- [ ] Item ratings
- [ ] Reviews per item

---

## 📦 Template Pattern Reference

This architecture mirrors the **landing page domain** structure:
- `landing/hero-templates/` → `menu/menu-header-templates/`
- `landing/gallery-templates/` → `menu/menu-item-card-templates/`
- `landing/review-templates/` → `menu/menu-item-detail-templates/`

**Consistency Benefits**:
- Developers familiar with landing page know menu structure
- Same pattern = easier onboarding
- Reusable template creation workflow

---

## 🎯 First Principles Thinking

**Question**: Why templates instead of variants folder?

**Answer**: Templates represent **complete functional units**, not just visual variations.

- ✅ Each template can have different:
  - Components
  - Hooks
  - Types
  - Utils
  - Logic

- ❌ A variants folder assumes:
  - Same logic, different visuals
  - Shared types
  - Shared hooks

For menu, we want **flexibility** to have completely different implementations (e.g., tabs vs. dropdown vs. sidebar), not just different button colors.

---

**Architecture**: Template-Based
**Status**: ✅ Migrated
**Pattern Source**: Landing Page Domain
**Last Review**: October 26, 2025
