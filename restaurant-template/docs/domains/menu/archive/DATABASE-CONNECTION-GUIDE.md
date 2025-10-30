# 🔌 Menu Domain - Database Connection Guide

**Last Updated**: October 26, 2025
**Purpose**: How the menu connects to Supabase and how to fix it if it breaks

---

> **Update (Oct 2025):** The former `src/lib/supabaseClient.ts` helper has been replaced by `src/lib/supabase/client.ts` (browser) and `src/lib/supabase/service-role-client.ts` (service role). Adjust any scripts or docs accordingly.

## 🎯 Quick Reference

### Correct Supabase Database

**Project**: Restaurant DB
**URL**: `https://avdgyrepwrvsvwgxrccr.supabase.co`
**Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2ZGd5cmVwd3J2c3Z3Z3hyY2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MzgwODIsImV4cCI6MjA1OTIxNDA4Mn0.8MZ2etAhQ1pTJnK84uoqAFfUirv_kaoYcmKHhKgLAWU`

### Table Used

**Table Name**: `menu_items` (NOT `item`!)

**Important Fields**:
- `id` (uuid) - Primary key
- `name` (text) - Item name
- `description` (text) - Item description
- `price` (numeric) - Price in IDR
- `category` (text) - Category name (NOT a foreign key!)
- `image_url` (text) - Image URL
- `is_available` (boolean) - Availability flag (NOT `active`!)
- `display_order` (integer) - Sort order

**Total Items**: 73 items across 15 categories

---

## 📁 Where Configuration Lives

### Environment Variables (.env.local)

**Location**: `/restaurant-template/.env.local`

**Required Variables**:
```bash
# Restaurant DB Supabase
NEXT_PUBLIC_SUPABASE_URL=https://avdgyrepwrvsvwgxrccr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: If you change these, you MUST restart the dev server:
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Supabase Client (Code)

**Location**: `src/lib/supabase/client.ts`

**Key Functions**:
```typescript
// Creates browser Supabase client (singleton)
export function createClient(): SupabaseClient

// True when env vars were loaded successfully
export function isSupabaseClientAvailable(): boolean

// Returns the init error if one occurred
export function getSupabaseClientInitError(): Error | null
```

**Missing env behaviour**:
```typescript
// If NEXT_PUBLIC_SUPABASE_* is missing, createClient()
// caches a mock client that throws helpful errors.
// Fix the env vars and reload to get the real client.
```

---

### Menu Service (Data Fetching)

**Location**: `src/domains/customer-facing/menu/hooks/menu.service.ts`

**Key Functions**:
```typescript
// Fetch all items
export const fetchMenuItems = async (): Promise<Result<MenuItem[]>>

// Fetch categories (derived from distinct values)
export const fetchMenuCategories = async (): Promise<Result<MenuCategory[]>>

// Fetch items by category ('all' returns everything)
export const fetchMenuItemsByCategory = async (category: string): Promise<Result<MenuItem[]>>
```

**Table Access**:
```typescript
// Creates query builder
const fromTable = (tableName: string) => {
  const supabase = createSupabaseBrowserClient();
  return supabase.from(tableName);
};

// Usage
fromTable('menu_items')
  .select("*")
  .eq('is_available', true)
  .order("display_order");
```

---

## 🗄️ Database Schema

### menu_items Table

```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  client_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,              -- ⚠️ TEXT field, not FK!
  cloudinary_public_id TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,   -- ⚠️ NOT 'active'!
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Categories (Derived, No Separate Table)

Categories are **derived** from distinct `category` values in `menu_items`:

```sql
-- Get all categories
SELECT DISTINCT category FROM menu_items WHERE is_available = true;
```

**Current Categories** (15):
1. Breakfast (4 items)
2. Burgers (2 items)
3. Cocktails (4 items)
4. Coffee (11 items)
5. Dessert (2 items)
6. Indonesian (6 items)
7. Juice (5 items)
8. Mocktails (3 items)
9. Pasta (3 items)
10. Pastry (4 items)
11. Pizza (3 items)
12. Rice Bowl (8 items)
13. Smoothies (7 items)
14. Specialty Drinks (6 items)
15. To Share (5 items)

---

## 🔧 How It Works (Data Flow)

### 1. Page Load
```
MenuPageCategorySections.tsx
  ↓
useMenuCategories() hook
  ↓
fetchMenuCategories() service
  ↓
fromTable('menu_items').select('category')
  ↓
Extract distinct categories
  ↓
Return Result<MenuCategory[]>
  ↓
Hook unwraps: result.success ? result.data : FALLBACK
  ↓
Page renders category sections
```

### 2. Fetching Items
```
useMenuItems() hook
  ↓
fetchMenuItems() service
  ↓
fromTable('menu_items')
  .select("*")
  .eq('is_available', true)
  .order("display_order")
  ↓
Return Result<MenuItem[]>
  ↓
Hook unwraps and caches
  ↓
Items rendered in cards
```

### 3. Filtering by Category
```
User selects "Coffee" from dropdown
  ↓
setFilterCategory('Coffee')
  ↓
Page filters: items.filter(item => item.category === 'Coffee')
  ↓
Shows only Coffee items in vertical stack
```

---

## 🚨 Common Issues & Fixes

### Issue #1: "Could not find table 'menu_items'"

**Error**:
```
Could not find the table 'public.menu_items' in the schema cache
```

**Cause**: Connected to wrong Supabase database

**Fix**:
1. Check `.env.local` has correct URL: `https://avdgyrepwrvsvwgxrccr.supabase.co`
2. NOT the old URL: `https://ntrklmkzyfnrtfbpdypd.supabase.co`
3. Restart dev server

---

### Issue #2: "Supabase unavailable, using fallback"

**Error**:
```
[Menu Service] Supabase unavailable, using fallback categories
```

**Cause**: Env vars not loaded in bundle

**Fix**:
1. Verify `.env.local` exists and has correct values
2. **Restart dev server** (Ctrl+C, then `npm run dev`)
3. Hard refresh browser (Cmd+Shift+R)

---

### Issue #3: Wrong data showing (Truffle Risotto, etc.)

**Symptom**: Seeing fallback demo data instead of real menu

**Cause**: Supabase connection failed, using `FALLBACK_MENU_ITEMS`

**Fix**:
1. Check console for errors
2. Verify database URL is correct
3. Check table name is `menu_items`
4. Restart dev server

---

### Issue #4: No images showing

**Symptom**: Cards show "No image"

**Cause**: `image_url` is NULL in database

**Fix**: Run image update script
```sql
-- See: src/domains/customer-facing/menu/ADD-TEST-IMAGES.sql
-- Or update manually:
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-xxx'
WHERE name = 'Item Name';
```

---

## 🔄 How to Reconnect (Step-by-Step)

### If Database Connection Breaks

**Step 1**: Check `.env.local`
```bash
# File: /restaurant-template/.env.local
# Should contain:
NEXT_PUBLIC_SUPABASE_URL=https://avdgyrepwrvsvwgxrccr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Step 2**: Verify URL is correct
- ✅ Correct: `avdgyrepwrvsvwgxrccr.supabase.co`
- ❌ Wrong: `ntrklmkzyfnrtfbpdypd.supabase.co` (old database)

**Step 3**: Check runtime helper
```typescript
// File: src/lib/supabase/client.ts
// Ensure createClient() is exporting from "@supabase/ssr"
// and isn't throwing because env vars are missing.
```

**Step 4**: Verify table name in service
```typescript
// File: src/domains/customer-facing/menu/hooks/menu.service.ts
// Should query 'menu_items' (NOT 'item')
fromTable('menu_items')
  .select("*")
  .eq('is_available', true)  // NOT .eq('active', true)!
```

**Step 5**: Restart dev server
```bash
Ctrl+C  # Stop
npm run dev  # Start
```

**Step 6**: Hard refresh browser
```bash
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows)
```

---

## 📊 Verification Checklist

### After Reconnecting, Verify:

**Console / runtime helper**:
- [x] `isSupabaseClientAvailable()` returns `true`
- [x] `getSupabaseClientInitError()` returns `null`
- [x] No "Supabase client not initialised" errors in console

**Network Tab** (Chrome DevTools):
- [x] Requests to `https://avdgyrepwrvsvwgxrccr.supabase.co`
- [x] GET `/rest/v1/menu_items?...`
- [x] Response: 200 OK

**Menu Page**:
- [x] Shows 73 items total
- [x] Shows 15 categories
- [x] Real items (not Truffle Risotto)
- [x] Real categories (Coffee, Rice Bowl, etc.)
- [x] All items have images
- [x] Prices in IDR (Rp 25,000, Rp 30,000)

---

## 📚 Related Documentation

- **ACTIVE-FEEDBACK.md** - All issues and solutions
- **ACTUAL-MENU-DATA.md** - Real database structure
- **SUPABASE-DEBUG.md** - Troubleshooting guide
- **ALL-FIXES-SUMMARY.md** - Complete fix history
- **ADD-TEST-IMAGES.sql** - Image update script

---

## 🆘 Emergency Recovery

### If everything is broken:

**Copy this to `.env.local`**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://avdgyrepwrvsvwgxrccr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2ZGd5cmVwd3J2c3Z3Z3hyY2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MzgwODIsImV4cCI6MjA1OTIxNDA4Mn0.8MZ2etAhQ1pTJnK84uoqAFfUirv_kaoYcmKHhKgLAWU
```

**Then**:
```bash
# Restart dev server
npm run dev

# Hard refresh browser
Cmd+Shift+R
```

**Should work immediately!**

---

## 🎯 Key Takeaways

### Critical Info to Remember

1. **Table Name**: `menu_items` (not `item`)
2. **Filter Field**: `is_available` (not `active`)
3. **Category Field**: `category` TEXT (not `category_id` FK)
4. **Database URL**: `avdgyrepwrvsvwgxrccr.supabase.co`
5. **Must Restart**: Dev server after env changes

### Files to Check When Broken

1. `.env.local` - Has correct URL?
2. `src/lib/supabase/client.ts` - Env vars loading? (`isSupabaseClientAvailable()`)
3. `src/domains/customer-facing/menu/hooks/menu.service.ts` - Table name correct?
4. Dev server - Did you restart?

---

**Status**: 🟢 **WORKING**
**Total Items**: 73 items
**Total Categories**: 15 categories
**Images**: 100% coverage
**Last Verified**: October 26, 2025
