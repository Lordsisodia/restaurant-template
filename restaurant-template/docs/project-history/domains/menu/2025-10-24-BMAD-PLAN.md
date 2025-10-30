# Menu Page Enhancement - BMAD Planning Document

**Date**: October 24, 2025
**Project**: Draco Coffee & Eatery - Restaurant Template
**Method**: BMAD (Build-Measure-Adapt-Deliver)

---

## 🎯 OBJECTIVE

Create a comprehensive menu page that:
1. Shows all 104 menu items across 18 categories
2. Allows users to click items for detailed information
3. Provides smooth UX with search, filters, and navigation
4. Integrates with Restaurant DB Supabase

---

## 📋 CURRENT STATE ANALYSIS

### ✅ What Exists:
- **MenuPage component** (domains/menu/pages/MenuPage.tsx)
- **MenuCategoryTabs** for category navigation
- **MenuItemCard** for displaying items
- **React Query hooks** for data fetching
- **104 menu items** in Supabase with categories
- **Domain-driven architecture** with clean separation

### ❌ What's Missing:
- **Item Detail Modal** - No way to view full item details
- **Enhanced MenuItemCard** - Current card needs click handler
- **Search functionality** - Mentioned in architecture but not implemented
- **Price range filters** - Not implemented
- **Favorites system** - Not implemented

---

## 🏗️ BUILD PHASE

### Component 1: MenuItem Detail Modal

**Purpose**: Show full item details when user clicks on menu card

**Design Spec**:
```
┌─────────────────────────────────────────────┐
│  [X] Close                                  │
│                                             │
│  ┌─────────────────┐                        │
│  │                 │  Item Name             │
│  │  Large Image    │  Category Badge        │
│  │                 │                        │
│  └─────────────────┘  Price: Rp XX,XXX     │
│                                             │
│  Description/Ingredients:                   │
│  ────────────────────────────────────       │
│  Full ingredient list here                  │
│                                             │
│  [  -  ]  Qty  [  +  ]     [ Add to Cart ] │
└─────────────────────────────────────────────┘
```

**Technical Approach**:
- Use shadcn Dialog component
- Framer Motion for smooth animations
- Quantity selector with +/- buttons
- Show full ingredients from description field
- Display category, prep time, dietary info

### Component 2: Enhanced MenuItemCard

**Changes Needed**:
- Add `onClick` prop to trigger detail modal
- Add hover effect indicating clickable
- Maintain current visual design
- Pass item data to modal

### Component 3: Menu Item Detail Dialog

**Features**:
- Large image display
- Full ingredient list
- Quantity selector
- Add to cart button (for future cart system)
- Nutritional info (if available)
- Category tag
- Prep time
- Dietary badges

---

## 📊 MEASURE PHASE

### Success Metrics:

**User Experience:**
- [ ] Can view all 104 items
- [ ] Can navigate all 18 categories
- [ ] Can click any item to see details
- [ ] Detail view loads in < 300ms
- [ ] Smooth animations (60fps)

**Technical:**
- [ ] Zero console errors
- [ ] Proper TypeScript typing
- [ ] React Query caching working
- [ ] Responsive on mobile/tablet/desktop

**Business:**
- [ ] Users can see full ingredient lists
- [ ] Clear pricing display
- [ ] Easy navigation between categories
- [ ] Preparation time clearly shown

---

## 🔄 ADAPT PHASE

### Design Decisions:

**Question 1**: Modal vs. Separate Page for Item Details?
- **Option A**: Modal (Dialog) - Quick view, stays on menu page
- **Option B**: Separate route (/menu/[slug]) - Deep linking, SEO
- **DECISION**: **Modal** (simpler, better UX, no navigation needed)

**Question 2**: Click anywhere on card or specific button?
- **Option A**: Click anywhere on card opens modal
- **Option B**: Specific "View Details" button
- **DECISION**: **Click anywhere** (larger click target, more intuitive)

**Question 3**: Show all items or category-filtered?
- **Option A**: Show all items with infinite scroll
- **Option B**: Category tabs (current approach)
- **DECISION**: **Keep category tabs** (better organization for 104 items)

**Question 4**: Search placement?
- **Option A**: In MenuHeader (global search)
- **Option B**: Per-category search
- **DECISION**: **Global search in header** (search across all items)

---

## 🚀 DELIVER PHASE

### Implementation Plan:

#### Step 1: Create MenuItem Detail Dialog
**File**: `src/domains/customer-facing/menu/components/MenuItemDetailDialog.tsx`
- Use shadcn Dialog
- Show full item info
- Quantity selector
- Responsive design

#### Step 2: Update MenuItemCard
**File**: `src/domains/customer-facing/menu/components/MenuItemCard.tsx`
- Add onClick handler
- Add hover cursor pointer
- Pass item data up to parent

#### Step 3: Update MenuCategoryTabs
**File**: `src/domains/customer-facing/menu/components/MenuCategoryTabs.tsx`
- Manage modal open/close state
- Pass selected item to dialog
- Handle item selection

#### Step 4: Add Search (Optional - Phase 2)
**File**: `src/domains/customer-facing/menu/components/MenuHeader.tsx`
- Search input
- Filter items as user types
- Clear search button

---

## 🎨 VISUAL DESIGN

### Item Detail Modal Mockup:

```
Mobile (Portrait):          Desktop (Landscape):
┌──────────────────┐       ┌────────────────────────────┐
│ [X]              │       │  [Image]    │  Item Info   │
│ ┌──────────────┐ │       │             │  Name        │
│ │              │ │       │             │  Category    │
│ │   Image      │ │       │             │  Price       │
│ │              │ │       │             │              │
│ └──────────────┘ │       │             │  Description │
│                  │       │             │  Ingredients │
│ Item Name        │       │             │              │
│ Rp XX,XXX        │       │             │  [Qty] [Add] │
│                  │       └────────────────────────────┘
│ Description      │
│ Ingredients      │
│                  │
│ [-] Qty [+]      │
│ [  Add to Cart  ]│
└──────────────────┘
```

---

## 📦 DELIVERABLES

### Phase 1 (Core - TODAY):
1. ✅ MenuItemDetailDialog component
2. ✅ Enhanced MenuItemCard with click handler
3. ✅ Modal state management in MenuCategoryTabs
4. ✅ Full ingredients display
5. ✅ Responsive design

### Phase 2 (Enhanced - LATER):
1. ⏳ Search functionality
2. ⏳ Price range filters
3. ⏳ Dietary filters UI
4. ⏳ Sort options

### Phase 3 (Advanced - FUTURE):
1. ⏳ Favorites system
2. ⏳ Cart integration
3. ⏳ Item ratings
4. ⏳ Reviews per item

---

## 🔧 TECHNICAL STACK

- **Frontend**: Next.js 15 (App Router)
- **State**: React Query
- **Database**: Restaurant DB Supabase
- **UI**: shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Types**: TypeScript

---

## ✅ ACCEPTANCE CRITERIA

### User Can:
- [x] View all menu categories
- [x] Navigate between categories with tabs
- [ ] Click on any menu item to see details ← **MISSING**
- [ ] See full ingredient list in detail view
- [ ] See prep time and pricing
- [ ] Close detail modal and return to menu
- [x] See loading states
- [x] See error states

### System Must:
- [x] Fetch from correct Restaurant DB Supabase
- [x] Display all 104 items
- [x] Show all 18 categories
- [ ] Open detail modal smoothly
- [ ] Handle missing images gracefully
- [x] Format prices in IDR
- [x] Be responsive on all devices

---

## 🎯 FIRST PRINCIPLES THINKING

**Question**: What's the SIMPLEST way to show item details?

**Answer**:
1. User clicks card → Modal opens (no navigation)
2. Modal shows: Name, Image, Ingredients, Price, Category
3. ESC or X closes modal
4. That's it. No cart (yet), no quantity (yet), just INFO.

**Musk's Algorithm Applied**:
1. ❓ **Question Requirement**: Do we need cart integration NOW? → NO
2. 🗑️ **Delete**: Remove cart/quantity logic from Phase 1
3. ⚡ **Simplify**: Just info modal, nothing else
4. 🚀 **Accelerate**: Build modal component now
5. 🤖 **Automate**: Reuse shadcn Dialog, don't build custom

---

## 🚦 NEXT ACTIONS

1. **Create MenuItemDetailDialog.tsx** - Simple info modal
2. **Add onClick to MenuItemCard** - Trigger modal
3. **Update MenuCategoryTabs** - Manage modal state
4. **Test with real data** - Verify all 104 items work

---

**Status**: 🟢 Ready to Build
**Priority**: P0 - Core Feature
**Effort**: 2-3 hours
