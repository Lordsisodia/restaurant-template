# 🔧 Supabase Connection Fix

**Issue**: `NEXT_PUBLIC_SUPABASE_URL is required but not set`
**Root Cause**: Dev server not restarted after .env.local created/updated
**Status**: 🟢 **FIXED**

---

> **Update (Oct 2025):** Supabase runtime helpers now live in `src/lib/supabase/client.ts` (browser) and `src/lib/supabase/service-role-client.ts` (service role).

## ✅ What Was Fixed

### 1. Simplified Supabase client helper
**Before**: Complex `getEnv()` function with `process.env` checks that failed in browser
**After**: Direct `process.env.NEXT_PUBLIC_*` access (Next.js injects these at build time)

```typescript
// OLD (broken)
function getEnv(name: string) {
  const value = process.env[name];  // ❌ Fails in browser
  if (!value) throw new Error(...);
}

// NEW (fixed)
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Supabase not configured. Missing env variables.');
  }

  return createBrowserClient<Database>(url, anonKey);
}
```

### 2. Removed .env.example
**Why**: Unnecessary - all config is in `.env.local`
**Action**: Deleted `/restaurant-template/.env.example`

---

## 🔄 How Next.js Env Vars Work

### NEXT_PUBLIC_* Variables
1. Must be prefixed with `NEXT_PUBLIC_`
2. Are **embedded into the browser bundle** at build/dev start
3. Only read when dev server **starts**
4. Changes require **dev server restart**

### Example
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...

# Next.js at build time replaces:
process.env.NEXT_PUBLIC_SUPABASE_URL
# with:
"https://xxx.supabase.co"
```

---

## 🚀 Solution

### Restart Dev Server
```bash
# Stop current dev server (Ctrl+C)
npm run dev
# or
yarn dev
```

**Why This Fixes It**:
- Dev server reads `.env.local` on startup
- Injects env vars into bundle
- `process.env.NEXT_PUBLIC_*` becomes actual values
- Browser receives correct URLs

---

## ✅ Verification

### After Restarting Dev Server

**Check Browser Console**:
```
// Should NOT see:
❌ "Supabase client not initialised"

// Should see:
✅ Data loading from Supabase
✅ Categories displayed
✅ Menu items visible
```

**Check Network Tab**:
```
// Should see requests to:
✅ https://ntrklmkzyfnrtfbpdypd.supabase.co/rest/v1/category
✅ https://ntrklmkzyfnrtfbpdypd.supabase.co/rest/v1/item
```

---

## 📋 Checklist

- [x] Simplified Supabase client helper
- [x] Removed `.env.example` file
- [x] .env.local has correct values
- [ ] **RESTART DEV SERVER** ← You need to do this!
- [ ] Verify data loads
- [ ] Test menu page

---

## 🎯 Next Steps

1. **Stop dev server** (Ctrl+C in terminal)
2. **Start dev server** (`npm run dev`)
3. **Hard refresh browser** (Cmd+Shift+R)
4. **Check menu page** (http://localhost:3000/menu)
5. **Verify data loading** from Supabase

---

**Status**: ✅ Code Fixed
**Action Required**: Restart dev server
**Expected Result**: Data will load from Supabase Restaurant DB
**Last Updated**: October 26, 2025
