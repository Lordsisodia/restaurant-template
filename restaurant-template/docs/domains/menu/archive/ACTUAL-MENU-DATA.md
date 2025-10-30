# 📊 Actual Menu Data - Supabase Analysis

**Date**: October 26, 2025
**Database**: Restaurant DB Supabase
**Table**: `menu_items` (not `item`!)

---

## ✅ Real Data Structure

### Database Schema

**Table Name**: `menu_items`

**Columns**:
- `id` (uuid) - Primary key
- `client_id` (uuid) - Client reference
- `name` (text) - Item name
- `description` (text) - Item description
- `price` (numeric) - Price in IDR
- `category` (text) - Category name (NOT a foreign key!)
- `cloudinary_public_id` (text) - Image reference
- `image_url` (text) - Direct image URL
- `is_featured` (boolean) - Featured item flag
- `is_available` (boolean) - Availability flag
- `display_order` (integer) - Sort order
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Key Discovery**:
- ⚠️ No `category` table - categories are TEXT values in `menu_items.category`
- ⚠️ No foreign key relationships
- ⚠️ Categories are derived from distinct values

---

## 📋 Actual Menu Breakdown

### Total Items
**73 items** (not 104 as previously thought)

### Real Categories (15 categories)

| Category | Items | % of Menu |
|----------|-------|-----------|
| Coffee | 11 | 15% |
| Rice Bowl | 8 | 11% |
| Smoothies | 7 | 10% |
| Specialty Drinks | 6 | 8% |
| Indonesian | 6 | 8% |
| To Share | 5 | 7% |
| Juice | 5 | 7% |
| Cocktails | 4 | 5% |
| Pastry | 4 | 5% |
| Breakfast | 4 | 5% |
| Mocktails | 3 | 4% |
| Pizza | 3 | 4% |
| Pasta | 3 | 4% |
| Burgers | 2 | 3% |
| Dessert | 2 | 3% |
| **TOTAL** | **73** | **100%** |

---

## 🎯 Category Structure

### Suggested Organization

**Beverages** (31 items - 42%):
- Coffee (11)
- Smoothies (7)
- Specialty Drinks (6)
- Juice (5)
- Cocktails (4)
- Mocktails (3)

**Food** (42 items - 58%):
- Rice Bowl (8)
- Indonesian (6)
- To Share (5)
- Pastry (4)
- Breakfast (4)
- Pizza (3)
- Pasta (3)
- Burgers (2)
- Dessert (2)

### Alternative Grouping

Could group by meal time:
- **Breakfast** - Breakfast, Pastry (8 items)
- **Lunch/Dinner** - Rice Bowl, Indonesian, Pizza, Pasta, Burgers (22 items)
- **Drinks** - All beverages (31 items)
- **Snacks** - To Share, Dessert (7 items)

---

## 🔧 What Was Fixed

### 1. Changed Table Name
**Before**: Querying `item` table (doesn't exist)
**After**: Querying `menu_items` table ✅

### 2. Changed Category Logic
**Before**: Looking for `category_id` foreign key
**After**: Using `category` TEXT field ✅

### 3. Changed Filter Field
**Before**: `.eq('active', true)`
**After**: `.eq('is_available', true)` ✅

### 4. Added "All" Category
**New**: `All` category shows all 73 items
**Default**: Page loads with "All" selected

---

## 📦 Sample Items

**Pastry Category**:
1. Almond Croissant - Rp 30,000
2. Croissant Cheese - Rp 30,000
3. Chocolatine - Rp 30,000
4. Apple Slipper Butter Croissant - Rp 30,000

**Breakfast Category**:
1. Egg Any Style - Rp 25,000
   (Omelette, scramble, or sunny side up with salad)

---

## ✅ Implementation Changes

### menu.service.ts
```typescript
// OLD
await fromTable('item')
  .eq('active', true)
  .eq('category_id', categoryId)

// NEW
await fromTable('menu_items')
  .eq('is_available', true)
  .eq('category', category)  // TEXT field
```

### Category Fetching
```typescript
// OLD: Query category table
await fromTable('category').select("*")

// NEW: Derive from menu_items
const categories = [...new Set(
  data.map(item => item.category)
)];
```

### MenuPageImproved.tsx
```typescript
// Add "All" category
const categories = [
  { id: 'all', name: 'All', itemCount: 73 },
  ...realCategories
];

// Default to "All"
const [selectedCategory] = useState('all');

// Filter logic
const items = category === 'all'
  ? allItems
  : allItems.filter(item => item.category === category);
```

---

## 🚀 Next Steps

### Immediate
- [x] Fix table name (`menu_items`)
- [x] Fix category field (TEXT not FK)
- [x] Fix filter field (`is_available`)
- [x] Add "All" category
- [x] Set "All" as default
- [ ] **Restart dev server**
- [ ] Test data loading

### Future Considerations
- Consider adding a proper `categories` table with:
  - ID, name, description, icon
  - Foreign key from menu_items.category_id
  - Better data normalization
- Or keep it simple with TEXT categories (current)

---

**Status**: ✅ **DATA STRUCTURE UNDERSTOOD**
**Total Items**: 73 (15 categories)
**Table**: `menu_items`
**Category Type**: TEXT field (not foreign key)
**Last Updated**: October 26, 2025
