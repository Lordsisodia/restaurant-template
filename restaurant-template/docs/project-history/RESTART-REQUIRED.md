# 🚨 DEV SERVER RESTART REQUIRED

**Issue**: Menu page showing wrong data (fallback data instead of real database)
**Root Cause**: Dev server still running with old bundle (no env vars)
**Solution**: RESTART THE DEV SERVER

---

## ⚠️ CRITICAL: You Must Restart the Dev Server

The console shows:
```
[Menu Service] Supabase unavailable, using fallback categories
[Menu Service] Supabase unavailable, using fallback menu items
```

This means the dev server is **still running with the old bundle** that doesn't have the Supabase env vars.

---

## 🔄 How to Restart

### Step 1: Find the Terminal Running Dev Server
Look for the terminal window that's running `npm run dev` or `yarn dev`

### Step 2: Stop It
Press **Ctrl+C** to stop the server

### Step 3: Start It Again
```bash
npm run dev
```

### Step 4: Wait for Build
Wait for the message:
```
✓ Ready in Xms
○ Local: http://localhost:3000
```

### Step 5: Hard Refresh Browser
- **Mac**: Cmd+Shift+R
- **Windows**: Ctrl+Shift+R

---

## ✅ How to Verify It Worked

### Check Console Logs

**After restart, you should see**:
```
[Supabase Client] Module loaded
[Supabase Client] URL: SET
[Supabase Client] Key: SET
```

**You should NOT see**:
```
❌ [Menu Service] Supabase unavailable
```

### Check Menu Page

**You should see**:
- ✅ Real categories (Coffee, Rice Bowl, Smoothies, etc.)
- ✅ Real items (Almond Croissant, Egg Any Style, etc.)
- ✅ 73 items total
- ✅ Prices in IDR (Rp 25,000, Rp 30,000)

**You should NOT see**:
- ❌ Truffle Risotto
- ❌ Sea Bass Acqua Pazza
- ❌ Wrong categories (mains, pizzas)

---

## 🎯 Why This Is Required

**How Next.js Works**:
1. When you run `npm run dev`, Next.js reads `.env.local`
2. It replaces `process.env.NEXT_PUBLIC_*` with actual values in the bundle
3. This happens at **build time**, not runtime
4. If `.env.local` changes, you must restart to rebuild with new values

**The Problem**:
- Your dev server started before `.env.local` had the Supabase URLs
- The bundle was built with `undefined` for those vars
- Code gracefully falls back to demo data
- Restarting will rebuild with correct values

---

## 📋 Quick Checklist

Before you tell me it's not working:
- [ ] Did you actually stop the dev server? (Ctrl+C)
- [ ] Did you start it again? (`npm run dev`)
- [ ] Did you wait for "Ready in" message?
- [ ] Did you hard refresh the browser? (Cmd+Shift+R)
- [ ] Did you check the console for new "[Supabase Client]" logs?

If ALL of the above are YES and it's still not working, then we have a different issue.

---

**Action Required**: RESTART DEV SERVER NOW
**Expected Time**: 30 seconds
**Expected Result**: Real data loads from Supabase
**Last Updated**: October 26, 2025
