# Menu Category Filter Feature

**Inspired by**: Sisterfields Bali (sisterfieldsbali.com)
**Status**: ✅ Implemented
**Date**: 2025-10-23

## Overview

Added a Sisterfields-style category filter to the landing page menu section. Users can now filter menu items by category using clean, pill-shaped tabs.

## What Changed

### 1. New Component: MenuCategoryTabs
**Location**: `src/domains/customer-facing/landing/shared/components/MenuCategoryTabs.tsx`

- Clean, pill-shaped category tabs
- Smooth animations and transitions
- Active state highlighting
- Mobile-responsive horizontal scroll

### 2. Enhanced MenuOverview Component
**Location**: `src/domains/customer-facing/landing/shared/components/MenuOverview.tsx`

**New Features**:
- "Our Menu" heading (centered, large)
- Category tabs for filtering
- Dynamic filtering based on selected category
- Shows 6 items per category
- 3-column grid on desktop, 2-column on tablet, 1-column on mobile

### 3. Updated DishCard Interface
**Location**: `src/shared/components/DishCard.tsx`

Added `categoryId?: string | null` to support filtering.

## UI Design

```
┌─────────────────────────────────────┐
│          Our Menu                    │
├─────────────────────────────────────┤
│  ┌───────────────────────────┐     │
│  │ All Day  Brunch  Dinner   │     │
│  └───────────────────────────┘     │
├─────────────────────────────────────┤
│  [Item 1]  [Item 2]  [Item 3]      │
│  [Item 4]  [Item 5]  [Item 6]      │
├─────────────────────────────────────┤
│         View full menu →            │
└─────────────────────────────────────┘
```

## Key Features

1. **Smart Category Detection**: Automatically extracts categories from menu items
2. **"All Day" Default**: Shows all items when "All Day" is selected
3. **Smooth Filtering**: Instant filter updates with React state
4. **Clean Design**: Follows Sisterfields' minimal, elegant approach
5. **Mobile-First**: Fully responsive with proper spacing

## How It Works

1. Component reads menu items passed as props
2. Extracts unique categories from items
3. Creates "All Day" tab + category-specific tabs
4. Filters displayed items based on active tab
5. Shows up to 6 items per category

## Styling

- **Tabs Container**: Rounded pill background with muted color
- **Active Tab**: White background with shadow
- **Inactive Tabs**: Transparent with muted text
- **Hover State**: Subtle background change
- **Typography**: Clean, medium weight fonts

## Integration with Database

Categories come from your Supabase `category` table:
- Category name maps to tab label
- Category ID used for filtering
- Items linked via `category_id` foreign key

## Future Enhancements

1. Add animations when switching categories
2. Implement horizontal scroll for many categories on mobile
3. Add category descriptions/subtitles
4. Support custom category ordering
5. Add "View More" within each category

## Testing Checklist

- ✅ Categories display correctly
- ✅ "All Day" shows mixed items
- ✅ Category filtering works
- ✅ Mobile responsive
- ✅ Smooth transitions
- ✅ "View full menu" link functional

## References

- **Inspiration**: Sisterfields Bali menu (sisterfieldsbali.com/menu)
- **Research Doc**: `docs/research/benchmarks/sisterfields.md`
- **Benchmark Summary**: `docs/research/benchmarks/benchmark-summary.md`
