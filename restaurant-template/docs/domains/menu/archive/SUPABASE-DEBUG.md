# 🔍 Supabase Connection Debug

**Issue**: "Supabase unavailable, using fallback" even though .env.local is configured
**Status**: 🔴 **NEEDS DEV SERVER RESTART**

---

## 🚨 ROOT CAUSE

**The Problem**:
```
Console shows: "[Menu Service] Supabase unavailable, using fallback categories"
```

**Why This Happens**:

1. `.env.local` has the correct values ✅
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ntrklmkzyfnrtfbpdypd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. BUT the dev server is running with **old bundle** ❌
   - Dev server started BEFORE .env.local was created/updated
   - `process.env.NEXT_PUBLIC_*` is **empty** in the running bundle
   - Next.js only reads .env files when server **starts**

3. `isSupabaseAvailable()` checks if client initialized ❌
   - Client initialization fails (no env vars in bundle)
   - Returns `null`
   - Code falls back to mock data

---

## ✅ THE FIX (SIMPLE)

### Restart Dev Server

```bash
# In your terminal:
# 1. Stop the dev server
Ctrl+C

# 2. Start it again
npm run dev

# 3. Hard refresh browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

**Why This Works**:
- Dev server reads `.env.local` on startup
- Next.js injects env vars into bundle at build time
- Browser receives correct Supabase URLs
- Client initializes successfully
- Data loads from real database

---

## 🔍 How to Verify It's Fixed

### Before Restart (Current State)
```
Console:
❌ "[Menu Service] Supabase unavailable, using fallback categories"
❌ "[Menu Service] Supabase unavailable, using fallback menu items"

Page Shows:
❌ Wrong categories (mains, pizzas, etc.)
❌ Wrong items (Truffle Risotto, Sea Bass, etc.)
❌ Fallback data
```

### After Restart (Expected)
```
Console:
✅ No "Supabase unavailable" warnings
✅ Clean React Query logs

Page Shows:
✅ Real categories (Coffee, Rice Bowl, Smoothies, etc.)
✅ Real items (Almond Croissant, Egg Any Style, etc.)
✅ 73 items from database
✅ 15 real categories
✅ "All" category with all items
```

---

## 🎯 What You'll See After Restart

### Category Dropdown
```
All (73 items)         ← Default selected
Breakfast (4 items)
Burgers (2 items)
Cocktails (4 items)
Coffee (11 items)      ← Largest category
Dessert (2 items)
Indonesian (6 items)
Juice (5 items)
Mocktails (3 items)
Pasta (3 items)
Pastry (4 items)
Pizza (3 items)
Rice Bowl (8 items)
Smoothies (7 items)
Specialty Drinks (6 items)
To Share (5 items)
```

### Sample Real Items

**Coffee Category** (11 items):
- Various coffee drinks

**Rice Bowl Category** (8 items):
- Rice bowl dishes

**Pastry Category** (4 items):
- Almond Croissant (Rp 30,000)
- Croissant Cheese (Rp 30,000)
- Chocolatine (Rp 30,000)
- Apple Slipper Butter Croissant (Rp 30,000)

**Breakfast Category** (4 items):
- Egg Any Style (Rp 25,000)
- And more...

---

## 📋 Debug Checklist

### Pre-Restart
- [x] .env.local exists
- [x] NEXT_PUBLIC_SUPABASE_URL is set
- [x] NEXT_PUBLIC_SUPABASE_ANON_KEY is set
- [x] Code is fixed (menu_items table, is_available field)
- [x] Result<T> unwrapping correct (result.success, result.data)
- [x] "All" category added
- [x] Hooks updated
- [ ] **DEV SERVER NEEDS RESTART** ← THIS IS THE ISSUE

### Post-Restart (What to Check)
- [ ] No "Supabase unavailable" warnings in console
- [ ] Categories show real names (Coffee, Rice Bowl, etc.)
- [ ] Items show real names (not Truffle Risotto)
- [ ] Prices show in IDR (Rp 25,000, Rp 30,000)
- [ ] All 73 items visible when "All" selected
- [ ] Category counts correct (Coffee: 11, Rice Bowl: 8, etc.)

---

## 🔧 Why Env Vars Require Restart

### How Next.js Environment Variables Work

**Build Time Injection**:
```typescript
// In your code:
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Next.js at build/dev start REPLACES this with:
const url = "https://ntrklmkzyfnrtfbpdypd.supabase.co";
```

**The Problem**:
- If `.env.local` doesn't exist when dev server starts
- Next.js replaces `process.env.NEXT_PUBLIC_SUPABASE_URL` with `undefined`
- That `undefined` is **baked into the bundle**
- Creating `.env.local` later doesn't help
- Must restart to re-read env vars and re-build bundle

---

## 🎯 Summary

**Issue**: Supabase shows unavailable
**Root Cause**: Dev server running with old bundle (no env vars)
**Solution**: **Restart dev server**
**Impact**: After restart, real data will load from Supabase

**Current Behavior**: Using fallback data (wrong categories/items)
**After Restart**: Using real data (73 items, 15 categories)

---

**Action Required**: RESTART DEV SERVER
**Expected Result**: Menu page loads real data from Supabase
**Last Updated**: October 26, 2025
