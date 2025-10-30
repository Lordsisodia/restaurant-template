# 🎯 Quick Reference - Restaurant Template

**Live:** http://localhost:3002
**Stack:** Supabase Auth + Cloudinary + Next.js 15

---

## 🔐 Authentication

### Your Google OAuth Credentials (ONE setup for ALL projects)

```
Client ID: YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
Client Secret: GOCSPX-YOUR_CLIENT_SECRET_HERE
```

**Added to Supabase:** ✅
**Test Users Added:** ✅

### Auth Pages

- Sign In: http://localhost:3002/auth/signin
- Sign Up: http://localhost:3002/auth/signup

### How It Works

```typescript
// Sign in with Google
const supabase = createClient();
await supabase.auth.signInWithOAuth({ provider: 'google' });

// Get current user
const { user } = useAuth();

// Sign out
await supabase.auth.signOut();
```

---

## 🖼️ Images & Video Storage

### Cloudinary (FREE 25 GB)

```
Cloud Name: dshngtiww
API Key: 724254789351712
API Secret: 0S1bLHETwbRGvMI3bma-NVy36Fo
```

**Use for:** Menu photos, galleries, hero images, logos

### Supabase Storage (FREE 1 GB)

**Bucket:** `restaurant-videos`
**Use for:** Hero videos (compressed to 5-8 MB)

### Current Images (Unsplash - FREE)

Gallery URLs already set in code:
- Nasi Goreng
- Chicken Satay
- Beef Rendang
- Ayam Bakar
- Gado-Gado
- Soto Ayam

---

## 💰 Cost Breakdown

### FREE Tier (100 Restaurants)

| Service | Limit | Usage | Cost |
|---------|-------|-------|------|
| Supabase Database | 500 MB | ~200 MB | $0 |
| Supabase Auth | 50k users | ~20k users | $0 |
| Supabase Storage | 1 GB | ~700 MB (videos) | $0 |
| Cloudinary | 25 GB | ~1.8 GB (images) | $0 |
| Google OAuth | Unlimited | All auth | $0 |
| Vercel | 100 GB bandwidth | ~50 GB | $0 |
| **TOTAL** | | | **$0/mo** ✅ |

### When You Scale

**At 200 restaurants:**
- Supabase Pro: $25/month
- Still FREE for Cloudinary

**At 500 restaurants:**
- Supabase Pro: $25/month
- Cloudinary Plus: $99/month
- Total: $124/month

**vs Clerk at 500 restaurants × 200 users = 100k MAU:**
- Clerk: ~$2,000/month
- Your savings: $1,876/month = $22,512/year 💰

---

## 📁 Key Files

### Auth Files
- `src/lib/supabase/client.ts` - Client auth
- `src/lib/supabase/server.ts` - Server auth
- `src/features/auth/hooks/useAuth.ts` - Auth hook
- `src/components/ui/modern-stunning-sign-in.tsx` - Sign-in UI
- `src/app/auth/signin/page.tsx` - Sign-in page
- `src/middleware.ts` - Route protection

### Image Files
- `src/components/ui/simple-image-gallery.tsx` - Gallery component
- `src/components/ui/hero-with-video.tsx` - Video hero
- `src/components/ui/cloudinary-image.tsx` - Optimized images
- `src/lib/demo-images.ts` - Unsplash URLs
- `src/domains/customer-facing/landing/index.tsx` - Homepage with gallery

### Config
- `.env.local` - All credentials
- `next.config.ts` - Image domains
- `supabase/migrations/20251021_nextauth_tables.sql` - Database schema

---

## 🚀 Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🔧 Quick Fixes

### Images Not Showing

**Check:**
1. Browser console for errors
2. `next.config.ts` has Unsplash in `remotePatterns`
3. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

**Fix:**
```bash
# Restart dev server
# Kill current terminal
npm run dev
```

### Can't Sign In

**Check:**
1. Google OAuth enabled in Supabase Dashboard
2. Your email is in test users list (Google Cloud Console)
3. Redirect URI matches exactly

**Debug:**
```typescript
// Check if user exists
const { data } = await supabase.auth.getUser();
console.log('User:', data.user);
```

### Videos Not Uploading

**Check:**
1. Supabase Storage bucket `restaurant-videos` exists
2. Bucket is public
3. Video file < 50 MB
4. Video format is MP4

**Compress video:**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -vf scale=1280:720 output.mp4
```

---

## 📚 Full Documentation

- **Complete Setup:** `COMPLETE-SETUP-GUIDE.md`
- **Auth Details:** `SUPABASE-AUTH-SETUP.md`
- **Storage Strategy:** `FREE-STORAGE-SETUP.md`
- **Auth System Package:** `../siso-app-factory/packages/auth-system/README.md`
- **Integration Guide:** `../siso-app-factory/project-setup-system/integrations/NEXTAUTH-INTEGRATION-GUIDE.md`

---

## 🎯 What's Built

✅ **Authentication**
- Google OAuth (one-click)
- Email/password
- Beautiful UI (HextaUI design)
- Session management
- Route protection

✅ **Images & Video**
- Cloudinary integration
- Supabase Storage for videos
- Image galleries (6 Indonesian dishes)
- Video hero support
- Auto-optimization
- FREE for 100+ restaurants

✅ **Multi-Tenant**
- Tenant isolation (RLS)
- Domain-based routing
- Per-tenant branding
- Shared auth across all tenants

✅ **Saved for Reuse**
- `siso-app-factory/packages/auth-system/`
- Use for bike rental, car hire, tours, etc.

---

**Need help?** Check the full guides or debug with browser console! 🚀
