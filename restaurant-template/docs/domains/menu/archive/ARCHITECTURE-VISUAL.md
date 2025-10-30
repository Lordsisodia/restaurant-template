# 🏗️ Menu Domain Architecture - Visual Map

**Date**: October 26, 2025

---

## 📐 Complete Architecture Diagram

```
src/domains/customer-facing/menu/
│
├── 📚 DOCUMENTATION (13 files)
│   ├── ARCHITECTURE.md                    Original architecture doc
│   ├── ARCHITECTURE-COMPARISON.md         Before/after comparison
│   ├── TEMPLATE-ARCHITECTURE.md           Template pattern guide
│   ├── NEW-STRUCTURE.md                   Improved structure docs
│   ├── FINAL-STRUCTURE-SUMMARY.md         Final summary
│   ├── MENU-PAGE-BMAD-PLAN.md            Implementation roadmap
│   ├── MENU-PAGE-IMPLEMENTATION.md        Build documentation
│   ├── SUPABASE-CONNECTION.md             DB connection docs
│   ├── MIGRATION-COMPLETE.md              Migration summary
│   ├── STRUCTURE.txt                      Visual tree
│   ├── STRUCTURE-VISUAL.txt               Visual comparison
│   ├── ARCHITECTURE-VISUAL.md             This file
│   └── README.md                          Domain readme
│
├── 📄 index.ts                            MAIN BARREL EXPORT
│
├── 📁 types/                              🎯 SHARED TYPES
│   ├── menu.types.ts                     MenuItem, MenuCategory, MenuFilters
│   ├── menu.constants.ts                 Fallbacks, config, defaults
│   └── index.ts                          Barrel export
│
├── 📁 hooks/                              🎯 SHARED HOOKS & SERVICES
│   ├── use-menu.ts                       useMenuCategories, useMenuItems, etc.
│   ├── menu.service.ts                   Supabase fetch functions
│   └── index.ts                          Barrel export
│
├── 📁 utils/                              🎯 SHARED UTILITIES
│   ├── menu-images.ts                    Image helpers, fallbacks
│   └── index.ts                          Barrel export
│
├── 📁 pages/                              📄 PAGE COMPOSITIONS
│   ├── MenuPage.tsx                      Original page (old)
│   ├── MenuPageNew.tsx                   NEW: Landing-style page
│   └── AdminMenuPage.tsx                 Admin menu editor
│
├── 📁 menu-header-templates/              🎨 TEMPLATE #1
│   ├── primary/                          ✅ WORKING
│   │   ├── components/
│   │   │   └── MenuHeader.tsx           (1 component)
│   │   └── index.ts
│   ├── template-2/                       📝 PLACEHOLDER
│   │   ├── components/
│   │   └── README.md                    (Sticky header planned)
│   └── template-3/                       📝 PLACEHOLDER
│       ├── components/
│       └── README.md                    (Minimal header planned)
│
├── 📁 menu-category-templates/            🎨 TEMPLATE #2
│   ├── primary/                          ✅ WORKING
│   │   ├── components/
│   │   │   ├── MenuCategoryTabs.tsx     (2 components)
│   │   │   └── MenuCategoryIcon.tsx
│   │   └── index.ts
│   ├── template-2/                       📝 PLACEHOLDER
│   └── template-3/                       📝 PLACEHOLDER
│
├── 📁 menu-item-card-templates/           🎨 TEMPLATE #3
│   ├── primary/                          ✅ WORKING
│   │   ├── components/
│   │   │   ├── MenuItemCard.tsx         (2 components)
│   │   │   └── MenuItemSimple.tsx
│   │   └── index.ts
│   ├── template-2/                       📝 PLACEHOLDER
│   └── template-3/                       📝 PLACEHOLDER
│
├── 📁 menu-item-detail-templates/         🎨 TEMPLATE #4
│   ├── primary/                          ✅ WORKING
│   │   ├── components/
│   │   │   └── MenuItemDetailDialog.tsx (1 component)
│   │   └── index.ts
│   ├── template-2/                       📝 PLACEHOLDER
│   └── template-3/                       📝 PLACEHOLDER
│
├── 📁 menu-grid-templates/                🎨 TEMPLATE #5
│   ├── primary/                          ✅ WORKING
│   │   ├── components/
│   │   │   └── MenuItemGrid.tsx         (1 component)
│   │   └── index.ts
│   ├── template-2/                       📝 PLACEHOLDER
│   └── template-3/                       📝 PLACEHOLDER
│
├── 📁 menu-state-templates/               🎨 TEMPLATE #6
│   ├── primary/                          ✅ WORKING
│   │   ├── components/
│   │   │   ├── MenuLoadingState.tsx     (6 components)
│   │   │   ├── MenuErrorAlert.tsx
│   │   │   ├── MenuEmptyState.tsx
│   │   │   ├── MenuItemSkeleton.tsx
│   │   │   ├── MenuDataPrefetcher.tsx
│   │   │   └── MenuAboutSection.tsx
│   │   └── index.ts
│   ├── template-2/                       📝 PLACEHOLDER
│   └── template-3/                       📝 PLACEHOLDER
│
└── 📁 menu-search-templates/              🎨 TEMPLATE #7
    ├── primary/                          🚧 PHASE 2
    │   ├── components/
    │   └── index.ts
    ├── template-2/                       📝 PLACEHOLDER
    └── template-3/                       📝 PLACEHOLDER
```

---

## 🎯 Pattern Explanation

### Root-Level Organization
```
menu/
├── types/      ← Shared across ALL templates
├── hooks/      ← Shared across ALL templates
└── utils/      ← Shared across ALL templates
```

**Why?**
- Types/hooks/utils are the same regardless of UI template
- MenuItem type is MenuItem whether using tabs or dropdown
- useMenuCategories hook works with any template design
- No duplication, single source of truth

### Template Organization
```
menu-header-templates/
├── primary/         ← Production template (working)
├── template-2/      ← Alternative design #1 (placeholder)
└── template-3/      ← Alternative design #2 (placeholder)
```

**Why?**
- Easy to swap between visual designs
- Each template = complete UI implementation
- Isolated changes (template-2 doesn't affect primary)
- Scalable (can add template-4, template-5, etc.)

---

## 📊 Component Breakdown

### Working Components (Primary Templates)

| Template Category          | Components                                      | Count |
|---------------------------|-------------------------------------------------|-------|
| menu-header-templates     | MenuHeader                                      | 1     |
| menu-category-templates   | MenuCategoryTabs, MenuCategoryIcon              | 2     |
| menu-item-card-templates  | MenuItemCard, MenuItemSimple                    | 2     |
| menu-item-detail-templates| MenuItemDetailDialog                            | 1     |
| menu-grid-templates       | MenuItemGrid                                    | 1     |
| menu-state-templates      | Loading, Error, Empty, Skeleton, Prefetcher, About | 6   |
| menu-search-templates     | (Phase 2)                                       | 0     |
| **TOTAL**                 |                                                 | **13** |

### Shared Code (Root Level)

| Folder | Files                                  | Purpose                           |
|--------|----------------------------------------|-----------------------------------|
| types/ | menu.types.ts, menu.constants.ts       | Data structures, constants        |
| hooks/ | use-menu.ts, menu.service.ts           | React Query, Supabase service     |
| utils/ | menu-images.ts                         | Image helpers, fallbacks          |

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         MenuPageNew                          │
│                      (Page Composition)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ MenuHeader│   │ Category │   │ ItemCard │
    │          │   │   Tabs   │   │          │
    └──────────┘   └─────┬────┘   └─────┬────┘
                         │               │
                         └───────┬───────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   useMenuCategories()    │
                    │   useMenuItemsByCategory()│
                    │   (React Query Hooks)    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    menu.service.ts       │
                    │  (Supabase Service)      │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Restaurant DB          │
                    │   (Supabase)             │
                    │   - item table           │
                    │   - category table       │
                    └──────────────────────────┘
```

---

## 🎨 Template Variant Strategy

### Primary (Current)
- Dark theme
- Glass-morphism cards
- Framer Motion animations
- Horizontal scroll (mobile)
- Grid layout (desktop)

### Template-2 (Planned)
- Dropdown category selector
- List view instead of grid
- Different card style
- Alternative animations

### Template-3 (Planned)
- Sidebar navigation
- Masonry grid layout
- Minimal design
- Faster animations

**Swapping Templates**:
```typescript
// Just change the import!
import { MenuCategoryTabs } from '@/domains/customer-facing/menu/menu-category-templates/primary';
// becomes
import { MenuCategoryDropdown } from '@/domains/customer-facing/menu/menu-category-templates/template-2';
```

---

## 📱 Mobile vs Desktop Flow

### Mobile Flow
```
User lands on /menu
      ↓
MenuPageNew loads
      ↓
SectionHeading with pill "Our Menu"
      ↓
Horizontal scroll category tabs
      ↓
User swipes to select category
      ↓
Horizontal scroll menu item cards
      ↓
User swipes through items
      ↓
User taps item card
      ↓
MenuItemDetailDialog opens (full screen)
      ↓
User views details, closes modal
```

### Desktop Flow
```
User lands on /menu
      ↓
MenuPageNew loads
      ↓
SectionHeading with pill "Our Menu"
      ↓
Grid of category tabs (3-6 columns)
      ↓
User clicks category
      ↓
Grid of menu item cards (2-3 columns)
      ↓
User hovers (lift animation)
      ↓
User clicks item card
      ↓
MenuItemDetailDialog opens (centered modal)
      ↓
User views details, closes modal
```

---

## 🔌 Supabase Integration Points

### Service Layer (`hooks/menu.service.ts`)
```typescript
createSupabaseBrowserClient()
  ↓
fromTable('item')
  .select("*")
  .eq('active', true)
  .order("name")
  ↓
Map to MenuItem type
  ↓
Return to React Query
```

### React Query Layer (`hooks/use-menu.ts`)
```typescript
useQuery({
  queryKey: ["menuCategories"],
  queryFn: fetchMenuCategories,
  staleTime: 5 minutes,
  placeholderData: FALLBACK_DATA
})
```

### Component Layer (`pages/MenuPageNew.tsx`)
```typescript
const { data: categories } = useMenuCategories();
const { data: items } = useMenuItemsByCategory(categoryId);
  ↓
Render in UI
```

---

## 📦 File Count Summary

| Category              | Count | Details                                    |
|-----------------------|-------|--------------------------------------------|
| Documentation Files   | 13    | .md, .txt files                            |
| Shared Types          | 2     | menu.types.ts, menu.constants.ts           |
| Shared Hooks          | 2     | use-menu.ts, menu.service.ts               |
| Shared Utils          | 1     | menu-images.ts                             |
| Page Components       | 3     | MenuPage, MenuPageNew, AdminMenuPage       |
| Template Categories   | 7     | header, category, card, detail, grid, state, search |
| Variants per Template | 3     | primary, template-2, template-3            |
| Working Components    | 13    | All in primary/ folders                    |
| Placeholder Variants  | 14    | 7 templates × 2 placeholders               |
| Barrel Exports        | 11    | 1 main + 3 root + 7 templates              |

**TOTAL FILES**: ~60 files (including placeholders)

---

## 🎨 Visual Style System

### Color Palette (from globals.css)
```
Background:    #000000 (Black)
Foreground:    #ffffff (White)
Primary:       #2e7d32 (Green)
Muted:         White with opacity
Border:        White/20 (20% opacity)
Card BG:       White/10 (10% opacity)
```

### Glass-morphism Pattern
```css
.menu-card {
  background: rgba(255, 255, 255, 0.1);   /* White 10% */
  border: 1px solid rgba(255, 255, 255, 0.2);  /* White 20% */
  backdrop-filter: blur(4px);              /* Glass blur */
}
```

### Animation System
```typescript
// Framer Motion variants
whileHover={{ scale: 1.03, y: -4 }}    // Lift on hover
whileTap={{ scale: 0.98 }}              // Press on click
initial={{ opacity: 0, y: 20 }}         // Fade in from below
animate={{ opacity: 1, y: 0 }}          // Animate to position
```

---

## 🚀 Key Features

### ✅ Implemented (Phase 1)
- [x] Mobile-first horizontal scroll
- [x] Desktop grid layout
- [x] Category filtering
- [x] Item detail modal
- [x] Loading states
- [x] Error handling
- [x] Dark theme
- [x] Glass-morphism cards
- [x] Framer Motion animations
- [x] Supabase integration
- [x] React Query caching
- [x] 104 menu items
- [x] 18 categories

### 🚧 Planned (Phase 2)
- [ ] Search functionality
- [ ] Price filters
- [ ] Dietary filters
- [ ] Sort options
- [ ] Template-2 variants
- [ ] Template-3 variants

### 🔮 Future (Phase 3)
- [ ] Favorites system
- [ ] Cart integration
- [ ] Item ratings
- [ ] Reviews per item

---

## 📐 Architectural Principles

### 1. Separation of Concerns
- **Types**: Data structures only
- **Hooks**: Business logic only
- **Utils**: Helper functions only
- **Templates**: UI components only
- **Pages**: Composition only

### 2. DRY (Don't Repeat Yourself)
- Shared code lives once at root
- Templates reuse shared types/hooks/utils
- No duplication across variants

### 3. Open/Closed Principle
- Open for extension (add template-4, template-5)
- Closed for modification (primary/ stays stable)

### 4. Single Responsibility
- Each template has one job: render UI
- Each hook has one job: fetch data
- Each util has one job: transform data

---

## 🎯 Developer Mental Model

**"Where do I find...?"**

| Looking For...           | Go To...                          |
|--------------------------|-----------------------------------|
| Type definitions         | `types/`                          |
| Data fetching hooks      | `hooks/`                          |
| Helper functions         | `utils/`                          |
| Header component         | `menu-header-templates/primary/`  |
| Category tabs            | `menu-category-templates/primary/`|
| Item cards               | `menu-item-card-templates/primary/`|
| Detail modal             | `menu-item-detail-templates/primary/`|
| Loading states           | `menu-state-templates/primary/`   |
| Page composition         | `pages/`                          |
| Documentation            | Root `.md` files                  |

**Navigation Speed**: ~2 seconds to find any file

---

**Status**: ✅ **ARCHITECTURE OPTIMIZED**
**Complexity**: Low (easy to understand)
**Maintainability**: High (clear organization)
**Scalability**: High (template variants ready)
**Last Updated**: October 26, 2025
