# 🎨 Menu Page - Category Sections Design

**Date**: October 26, 2025
**Layout**: Option A - Vertical Categories + Horizontal Items
**Status**: ✅ **IMPLEMENTED**

---

## 🎯 Design Overview

### Layout Pattern
```
┌─────────────────────────────────┐
│ [Sticky Header]                 │
│ Our Menu                        │
│ [Filter: All Categories ▼]     │
├─────────────────────────────────┤
│                                 │
│ Coffee (11 items)               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━       │
│ ┌────┐ ┌────┐ ┌────┐           │
│ │☕  │ │☕  │ │☕  │ → → →      │
│ └────┘ └────┘ └────┘           │
│                                 │
│ Rice Bowl (8 items)             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━       │
│ ┌────┐ ┌────┐ ┌────┐           │
│ │🍚  │ │🍚  │ │🍚  │ → → →      │
│ └────┘ └────┘ └────┘           │
│                                 │
│ Smoothies (7 items)             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━       │
│ ┌────┐ ┌────┐ ┌────┐           │
│ │🥤  │ │🥤  │ │🥤  │ → → →      │
│ └────┘ └────┘ └────┘           │
│                                 │
│ ↓ Scroll down for 12 more      │
│   categories...                 │
└─────────────────────────────────┘
```

---

## ✨ Key Features

### 1. Sticky Header
- Stays at top while scrolling
- Shows total items + category count
- Optional category filter dropdown
- Blurred background for readability

### 2. Category Sections
- Each category has its own section
- Category name + item count
- Decorative gradient line
- Staggered animation (0.1s delay per section)

### 3. Horizontal Scroll per Category
- Cards scroll left/right within category
- 75vw width (fits mobile with peek)
- Snap scrolling for smooth navigation
- Hidden scrollbar for clean look

### 4. Premium Cards (Smaller)
- Width: 75vw (max 280px) - Better fit
- Height: ~240px total
- Image: 160px height
- Gradient overlays
- Floating badges
- Smooth hover effects

### 5. Optional Filter
- Dropdown to filter by specific category
- "All Categories" shows all 15 sections
- Select one category to see only that section
- Maintains horizontal scroll within filtered category

---

## 📊 User Experience Flow

### Browse All Categories
```
User opens menu
  ↓
Sees "Showing All Categories"
  ↓
Scrolls down to see category sections
  Coffee → Swipe through 11 coffee items →
  Rice Bowl → Swipe through 8 rice bowls →
  Smoothies → Swipe through 7 smoothies →
  ... (12 more categories)
  ↓
Taps item → Detail modal opens
```

### Filter to Specific Category
```
User taps filter dropdown
  ↓
Sees all 16 options (All + 15 categories)
  ↓
Selects "Coffee"
  ↓
Page shows ONLY Coffee section
  ↓
Swipes through 11 coffee items horizontally
```

---

## 🎨 Visual Design

### Category Header
```css
Font: text-2xl font-bold
Color: text-white
Item count: text-sm text-muted-foreground
Gradient line: bg-gradient-to-r from-white/20
```

### Cards (Optimized)
```
Card Size: 75vw (max 280px) ← Smaller for better fit
Image: h-40 (160px) ← Reduced from 192px
Content: p-3 (12px padding)
Title: text-base (16px) ← Smaller
Description: text-xs (12px)
Price Badge: text-xs
```

### Animations
```typescript
// Category section entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
delay: categoryIndex * 0.1

// Card entrance within category
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
delay: itemIndex * 0.05

// Card hover
whileHover={{ scale: 1.03, y: -4 }}
```

---

## 📱 Mobile Optimizations

### Vertical Scrolling
- Smooth native scroll through categories
- Category headers act as visual anchors
- Easy to find section you want

### Horizontal Scrolling
- Thumb-friendly swipe per category
- See multiple items without leaving category context
- Peek next card (visual affordance)

### Touch Targets
- Full card clickable (280px × 240px)
- Filter button: Full width, 48px height
- Category filter options: 44px+ height

---

## 🆚 Comparison to Previous Design

### OLD (Single Horizontal Scroll)
```
❌ All items in one long horizontal scroll
❌ No category organization visible
❌ Had to use dropdown to switch categories
❌ Couldn't see multiple categories at once
```

### NEW (Category Sections)
```
✅ Clear category sections
✅ See all categories by scrolling down
✅ Horizontal scroll per category
✅ Optional filter if you want specific category
✅ Better organization and discovery
```

---

## 📋 Real Data Integration

### 15 Real Categories (from Supabase)
1. Breakfast (4 items)
2. Burgers (2 items)
3. Cocktails (4 items)
4. Coffee (11 items) ← Largest
5. Dessert (2 items)
6. Indonesian (6 items)
7. Juice (5 items)
8. Mocktails (3 items)
9. Pasta (3 items)
10. Pastry (4 items)
11. Pizza (3 items)
12. Rice Bowl (8 items) ← Second largest
13. Smoothies (7 items)
14. Specialty Drinks (6 items)
15. To Share (5 items)

**Total**: 73 items across 15 categories

---

## 🚀 Implementation Details

**File**: `src/domains/customer-facing/menu/pages/MenuPageCategorySections.tsx`

**Components**:
1. `MenuPageCategorySections` - Main page
2. `CategorySection` - Individual category section
3. `MenuItemCardHorizontal` - Card component (75vw)

**Features**:
- Sticky header with filter
- Category sections with headers
- Horizontal scroll per section
- Snap scrolling
- Premium card styling
- Item detail modal
- Staggered animations

---

**Status**: ✅ **IMPLEMENTED & READY**
**Pattern**: Category sections with horizontal items
**Next**: User testing and feedback
**Last Updated**: October 26, 2025
