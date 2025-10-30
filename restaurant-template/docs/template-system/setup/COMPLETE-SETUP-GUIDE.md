# 🚀 Restaurant Template - Complete Setup Guide

**Version:** 1.0.0
**Last Updated:** October 22, 2025
**Tech Stack:** Next.js 15 + Supabase + Cloudinary + TypeScript

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Authentication Setup](#authentication-setup)
3. [Image & Video Storage Setup](#image--video-storage-setup)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Running the Project](#running-the-project)
7. [Testing](#testing)
8. [Deploying to Production](#deploying-to-production)
9. [Multi-Tenant Configuration](#multi-tenant-configuration)
10. [Cost Breakdown](#cost-breakdown)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ A Supabase account (free tier)
- ✅ A Google account (for OAuth)
- ✅ A Cloudinary account (free tier)

---

> Need a condensed checklist? See `AUTH-SETUP.md` for day-to-day steps.

## Authentication Setup

### Step 1: Create Google OAuth App (30 mins - ONE TIME for ALL projects)

**Why:** This allows users to sign in with their Google account across ALL your SaaS products.

1. **Go to Google Cloud Console**
   https://console.cloud.google.com

2. **Sign in** with your Google account

3. **Add Payment Details** (required for verification, won't be charged)
   - Click "Billing" or accept prompt
   - Add credit/debit card
   - You get $300 free credit (OAuth is free anyway)

4. **Create New Project**
   - Click "Select a project" dropdown (top left)
   - Click "NEW PROJECT"
   - Name: `SISO-SaaS-Platform`
   - Click "CREATE"

5. **Enable Google+ API**
   - Sidebar: **APIs & Services** → **Library**
   - Search: `Google+ API`
   - Click it → Click **"ENABLE"**

6. **Configure OAuth Consent Screen** (if first time)
   - Sidebar: **APIs & Services** → **OAuth consent screen**
   - User type: **External**
   - Click "CREATE"
   - Fill in:
     - App name: `SISO Restaurant Platform`
     - User support email: your email
     - Developer contact: your email
   - Click "SAVE AND CONTINUE"
   - Scopes: Click "SAVE AND CONTINUE" (default is fine)
   - Test users: Click "+ ADD USERS" → Add your email
   - Click "SAVE AND CONTINUE"

7. **Create OAuth Credentials**
   - Sidebar: **APIs & Services** → **Credentials**
   - Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
   - Application type: **Web application**
   - Name: `SISO SaaS Auth`

8. **Add Authorized Redirect URIs**

   Click **"+ Add URI"** for each:
   ```
   http://localhost:3000/auth/callback
   https://ntrklmkzyfnrtfbpdypd.supabase.co/auth/v1/callback
   ```

   **For future projects**, add more URIs:
   ```
   https://your-bike-rental-project.supabase.co/auth/v1/callback
   https://your-car-hire-project.supabase.co/auth/v1/callback
   ```

9. **Click "CREATE"**

10. **Copy Credentials** (SAVE THESE!)
    - Client ID: `YOUR_CLIENT_ID_HERE.apps.googleusercontent.com`
    - Client Secret: `GOCSPX-YOUR_CLIENT_SECRET_HERE`

**✅ Done! Use these same credentials for ALL your Supabase projects.**

---

### Step 2: Configure Supabase Auth (5 mins per project)

1. **Go to Supabase Dashboard**
   https://supabase.com/dashboard

2. **Select Your Project**
   Click on `ntrklmkzyfnrtfbpdypd` (or your project)

3. **Enable Google Provider**
   - Sidebar: **Authentication**
   - Tab: **Providers**
   - Find **"Google"**
   - Toggle **ON**

4. **Paste Google Credentials**
   - Client ID: `YOUR_CLIENT_ID_HERE.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-YOUR_CLIENT_SECRET_HERE`
   - Click **"Save"**

5. **Enable Email Provider** (optional - for email/password login)
   - Scroll to **"Email"**
   - Should be ON by default
   - Toggle **"Confirm email"** OFF for development (ON for production)

**✅ Done! Google sign-in is now active.**

---

> Day-to-day provisioning steps live in `MEDIA-SETUP.md` if you just need the highlights.

## Image & Video Storage Setup

### Cloudinary Setup (5 mins - FREE 25 GB)

**Why:** Store and optimize all images (menu photos, galleries, hero images)

1. **Sign Up**
   https://cloudinary.com/users/register_free

2. **Go to Dashboard** after signup

3. **Copy Credentials** (top of dashboard):
   - Cloud Name: `dshngtiww`
   - API Key: `724254789351712`
   - API Secret: `0S1bLHETwbRGvMI3bma-NVy36Fo`

**✅ Saved! Add to `.env.local` (see Environment Variables section)**

---

### Supabase Storage Setup (2 mins - FREE 1 GB)

**Why:** Store hero videos (compressed to 5-10 MB each)

1. **Go to Supabase Dashboard**
   https://supabase.com/dashboard/project/ntrklmkzyfnrtfbpdypd

2. **Sidebar:** Click **"Storage"**

3. **Create Bucket**
   - Click **"New bucket"**
   - Name: `restaurant-videos`
   - Public: **Toggle ON** (so videos can be viewed)
   - File size limit: `50` MB
   - Click **"Create bucket"**

4. **Set Bucket Policies** (make it public)
   - Click on `restaurant-videos` bucket
   - Click **"Policies"** tab
   - Click **"New policy"**
   - Template: **"Allow public read access"**
   - Click **"Review"** → **"Save policy"**

**✅ Done! Videos can now be uploaded.**

---

## Environment Variables

Create `.env.local` in the project root with these values:

```bash
# ========================================
# SUPABASE (Database & Auth)
# ========================================
NEXT_PUBLIC_SUPABASE_URL=https://ntrklmkzyfnrtfbpdypd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTgxOTgsImV4cCI6MjA3NjQ3NDE5OH0._hp302cCRB7eVtbOy0hAtZLTLOgFi79tFnYDBFN2KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg

# ========================================
# CLOUDINARY (Images)
# ========================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dshngtiww
CLOUDINARY_API_KEY=724254789351712
CLOUDINARY_API_SECRET=0S1bLHETwbRGvMI3bma-NVy36Fo
CLOUDINARY_URL=cloudinary://724254789351712:0S1bLHETwbRGvMI3bma-NVy36Fo@dshngtiww

# ========================================
# MULTI-TENANT DEFAULTS
# ========================================
DEFAULT_RESTAURANT_ID=00000000-0000-0000-0000-000000000001
DEFAULT_RESTAURANT_SLUG=ayam-bakar-jaya
DEFAULT_TENANT_GROUP=pod-alpha
```

**⚠️ IMPORTANT:** Never commit `.env.local` to git! It's already in `.gitignore`.

---

## Database Setup

### Step 1: Run Migrations (5 mins)

The database migration creates all necessary tables for Supabase Auth.

1. **Go to Supabase Dashboard**
   https://supabase.com/dashboard/project/ntrklmkzyfnrtfbpdypd

2. **Sidebar:** Click **"SQL Editor"**

3. **Click "New query"**

4. **Copy and paste** the entire content from:
   `supabase/migrations/20251021_nextauth_tables.sql`

5. **Click "RUN"**

6. **Verify Success**
   - You should see: "Success. No rows returned"
   - Tables created: `accounts`, `sessions`, `verification_tokens`

**✅ Database is ready!**

---

## Running the Project

### Development Mode

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Server will start on: **http://localhost:3000** (or 3002 if 3000 is busy)

---

## Testing

### Test Authentication

1. **Visit:** http://localhost:3002/auth/signin

2. **You should see:** Beautiful glassmorphic dark sign-in page

3. **Click:** "Continue with Google"

4. **Sign in** with your Google account (must be in test users list!)

5. **Should redirect to:** `/dashboard`

6. **Should see:** Your name in header with "Sign Out" button

**✅ If this works, auth is fully functional!**

---

### Test Image Gallery

1. **Visit:** http://localhost:3002

2. **You should see:**
   - ✅ Hero section with Indonesian food image
   - ✅ Features section
   - ✅ **Image gallery with 6 food photos:**
     - Nasi Goreng
     - Satay
     - Rendang
     - Ayam Bakar
     - Gado-Gado
     - Soto Ayam
   - ✅ Hover effects (images zoom, gradient overlay appears)

**✅ If images show, storage is working!**

---

## Deploying to Production

### Deploy to Vercel (10 mins)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Supabase auth and image galleries"
   git push origin main
   ```

2. **Go to Vercel**
   https://vercel.com/new

3. **Import Repository**
   - Select your GitHub repo
   - Click "Import"

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Copy ALL variables from `.env.local`
   - Paste them in Vercel
   - Click "Deploy"

5. **Update Google OAuth Redirect URI**
   - Go to Google Cloud Console → Credentials
   - Click your OAuth app
   - Add redirect URI:
     ```
     https://your-app.vercel.app/auth/callback
     ```
   - Save

6. **Test Production**
   - Visit your Vercel URL
   - Sign in with Google
   - Should work!

**✅ Live in production!**

---

## Multi-Tenant Configuration

### How Multi-Tenancy Works

**Architecture:**
```
ONE Supabase Project
├── Restaurant 1 (tenant_id: uuid-1)
├── Restaurant 2 (tenant_id: uuid-2)
├── Restaurant 3 (tenant_id: uuid-3)
└── ... 100+ restaurants

All using:
- ✅ Same Google OAuth
- ✅ Same database
- ✅ Same codebase
- ✅ Separated by tenant_id
```

### Adding New Tenants

**In Supabase SQL Editor:**
```sql
-- Add new restaurant tenant
INSERT INTO tenants (id, name, slug, pod)
VALUES (
  gen_random_uuid(),
  'Bali Seafood House',
  'bali-seafood',
  'pod-alpha'
);

-- Get the ID
SELECT id FROM tenants WHERE slug = 'bali-seafood';
```

### Assigning Users to Tenants

**When user signs up, assign them to a tenant:**
```sql
UPDATE users
SET tenant_id = 'tenant-uuid-here',
    role = 'customer'
WHERE email = 'customer@example.com';
```

**Or do it programmatically in the auth callback** (see `src/app/auth/callback/route.ts`)

---

## Cost Breakdown

### FREE Tier (Supports 100+ Restaurants)

| Service | Free Tier | Usage (100 restaurants) | Cost |
|---------|-----------|-------------------------|------|
| **Supabase Database** | 500 MB | ~200 MB | **$0** |
| **Supabase Auth** | 50k MAU | ~20k MAU | **$0** |
| **Supabase Storage** | 1 GB | ~700 MB (videos) | **$0** |
| **Cloudinary** | 25 GB | ~1.8 GB (images) | **$0** |
| **Vercel** | 100 GB bandwidth | ~50 GB/month | **$0** |
| **Google OAuth** | Unlimited | All auth | **$0** |
| **Unsplash Images** | Unlimited | Demo images | **$0** |
| **TOTAL** | | | **$0/month** |

### When You Exceed Free Tier

| Service | Threshold | Next Tier Cost |
|---------|-----------|----------------|
| Supabase Database | 500 MB | $25/mo (8 GB) |
| Supabase Storage | 1 GB videos | $25/mo (100 GB) |
| Cloudinary | 25 GB images | $99/mo (120 GB) |
| Vercel | 100 GB bandwidth | $20/mo (1 TB) |

**Projected scaling:**
- 100 restaurants: **$0/month** ✅
- 200 restaurants: **$25/month** (Supabase Pro)
- 500 restaurants: **$124/month** (Supabase + Cloudinary)

**vs Clerk (for comparison):**
- 100 restaurants × 200 users = 20k MAU
- Clerk cost: **$400/month**
- Your cost: **$0/month**
- **Annual savings: $4,800** 💰

---

## File Structure

```
restaurant-template/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── signin/page.tsx        # Sign-in page
│   │   │   ├── signup/page.tsx        # Sign-up page
│   │   │   ├── callback/route.ts      # OAuth callback
│   │   │   └── error/page.tsx         # Error page
│   │   ├── layout.tsx                 # Root layout with auth
│   │   └── page.tsx                   # Homepage
│   │
│   ├── components/ui/
│   │   ├── modern-stunning-sign-in.tsx    # Sign-in component
│   │   ├── modern-stunning-sign-up.tsx    # Sign-up component
│   │   ├── simple-image-gallery.tsx       # Image gallery
│   │   ├── hero-with-video.tsx            # Video hero
│   │   ├── cloudinary-image.tsx           # Optimized images
│   │   └── video-hero.tsx                 # Alternative video hero
│   │
│   ├── features/auth/
│   │   ├── components/
│   │   │   ├── SignInButton.tsx       # Simple sign-in button
│   │   │   └── UserMenu.tsx           # User dropdown menu
│   │   └── hooks/
│   │       └── useAuth.ts             # Auth state hook
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Client-side Supabase
│   │   │   ├── server.ts              # Server-side Supabase
│   │   │   └── middleware.ts          # Session management
│   │   └── demo-images.ts             # Unsplash image URLs
│   │
│   ├── domains/
│   │   └── landing/
│   │       ├── index.tsx              # Landing page component
│   │       └── components/
│   │           ├── HeroSection.tsx
│   │           ├── QuickGallery.tsx
│   │           ├── MenuOverview.tsx
│   │           └── MapEmbed.tsx
│   │
│   ├── middleware.ts                  # Route protection
│   └── types/                         # TypeScript definitions
│
├── supabase/
│   └── migrations/
│       └── 20251021_nextauth_tables.sql  # Auth tables
│
├── .env.local                         # Environment variables
├── next.config.ts                     # Next.js config
└── package.json                       # Dependencies
```

---

## Key Features

### ✅ What's Included

**Authentication:**
- ✅ Google OAuth (one-click sign-in)
- ✅ Email/Password authentication
- ✅ Beautiful glassmorphic sign-in UI
- ✅ Session management
- ✅ Route protection (middleware)
- ✅ Multi-tenant user assignment

**Images & Media:**
- ✅ Cloudinary integration (images)
- ✅ Supabase Storage (videos)
- ✅ Image gallery component
- ✅ Video hero component
- ✅ Auto WebP optimization
- ✅ Lazy loading
- ✅ Responsive images
- ✅ Unsplash demo images

**UI Components:**
- ✅ Modern sign-in page (HextaUI design)
- ✅ Sign-up page
- ✅ User menu with avatar
- ✅ Hero section with video support
- ✅ Image galleries
- ✅ Responsive layout

**Multi-Tenant:**
- ✅ Tenant isolation (Row Level Security)
- ✅ Domain-based tenant resolution
- ✅ Per-tenant branding
- ✅ Per-tenant image galleries

---

## Troubleshooting

### Auth Issues

**"Access blocked: This app's request is invalid"**
- → Check redirect URI in Google Cloud Console
- → Should be: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`

**"redirect_uri_mismatch"**
- → Same as above

**Can't sign in (only certain users work)**
- → OAuth app is in "Testing" mode
- → Add yourself to test users in Google Cloud Console
- → OR publish the app to production

### Image Issues

**Images not showing**
- → Check `next.config.ts` has `images.unsplash.com` in `remotePatterns`
- → Check browser console for errors
- → Verify Unsplash URLs are correct

**"Image Optimization failed"**
- → Check Vercel image optimization limits (FREE: 1000 images)
- → Check image URL is accessible

### Video Issues

**Videos not uploading**
- → Check Supabase Storage bucket is public
- → Check file size < 50 MB
- → Compress video with ffmpeg or Handbrake

**Videos not playing**
- → Check video URL is correct
- → Check browser supports MP4/H.264 format
- → Check video is publicly accessible

---

## API References

### Supabase Auth

```typescript
// Client-side
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

// Sign in with Google
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${window.location.origin}/auth/callback` }
});

// Sign in with email/password
await supabase.auth.signInWithPassword({ email, password });

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

```typescript
// Server-side
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();

const { data: { user } } = await supabase.auth.getUser();
```

### useAuth Hook

```typescript
import { useAuth } from '@/features/auth/hooks/useAuth';

const { user, loading, isAuthenticated, signOut } = useAuth();
```

### Image Components

```typescript
// Simple gallery (Next.js Image)
import { SimpleImageGallery } from '@/components/ui/simple-image-gallery';

<SimpleImageGallery
  title="Our Dishes"
  subtitle="Fresh Indonesian flavors"
  images={[
    { id: '1', url: 'https://...', alt: 'Nasi Goreng' },
    { id: '2', url: 'https://...', alt: 'Satay' },
  ]}
  columns={3}
/>
```

```typescript
// Cloudinary optimized image
import { CloudinaryImage } from '@/components/ui/cloudinary-image';

<CloudinaryImage
  publicId="restaurant-1/menu/nasi-goreng"
  alt="Nasi Goreng"
  width={800}
  aspectRatio="square"
/>
```

```typescript
// Video hero
import { HeroWithVideo } from '@/components/ui/hero-with-video';

<HeroWithVideo
  title="Experience Authentic Indonesian Cuisine"
  subtitle="Fresh ingredients, traditional recipes"
  videoUrl="https://your-supabase-storage/video.mp4"
  imageUrl="https://fallback-image.jpg"
  ctaPrimary={{ label: 'View Menu', href: '/menu' }}
/>
```

---

## Security Best Practices

### Row Level Security (RLS)

Enable RLS on all tenant-specific tables:

```sql
-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users only see their tenant's data
CREATE POLICY "Tenant isolation"
  ON menu_items FOR SELECT
  USING (
    tenant_id = (
      SELECT tenant_id FROM users WHERE id = auth.uid()
    )
  );
```

### Environment Variables

**Never commit:**
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ `CLOUDINARY_API_SECRET`
- ❌ Google OAuth credentials

**Always use:**
- ✅ `.env.local` for local development
- ✅ Vercel Environment Variables for production
- ✅ `.gitignore` to exclude secrets

---

## Performance Optimization

### Image Optimization

**Current Setup:**
- ✅ Next.js Image component (auto WebP)
- ✅ Lazy loading
- ✅ Responsive sizing
- ✅ Blur placeholders

**Cloudinary Optimization (when you upload real photos):**
```typescript
// Auto format (WebP/AVIF)
img.delivery(format(auto()))

// Auto quality
img.delivery(quality(auto()))

// Responsive resize
img.resize(auto().width(800))
```

### Video Optimization

**Keep videos small:**
- Resolution: 1280×720 (720p)
- Length: 10-15 seconds
- Format: MP4 (H.264)
- Target size: 5-8 MB
- Use ffmpeg or Handbrake to compress

**Lazy loading:**
```html
<video loading="lazy" preload="none">
```

**Mobile bandwidth saving:**
```typescript
// Show image on mobile, video on desktop
const isMobile = window.innerWidth < 768;
{!isMobile && videoUrl ? <video /> : <img />}
```

---

## Reusing for Future Projects

### Copy Auth System

```bash
# From siso-app-factory
cp -r packages/auth-system/* new-project/src/
```

Then:
1. Add new Supabase redirect URI to Google OAuth
2. Paste same Google credentials in new Supabase project
3. Done! Auth works immediately.

### Copy Image Components

```bash
cp src/components/ui/simple-image-gallery.tsx new-project/src/components/ui/
cp src/components/ui/hero-with-video.tsx new-project/src/components/ui/
cp src/lib/demo-images.ts new-project/src/lib/
```

Update `next.config.ts` to allow Unsplash images.

---

## FAQ

### Q: Do I need separate Google OAuth for each product?
**A:** NO! Use the SAME Google OAuth app for all products (restaurant, bike, car, tours). Just add each Supabase redirect URI to Google Cloud Console.

### Q: Do I need separate Supabase projects?
**A:** YES, one per product type:
- Restaurant SaaS → Supabase Project 1
- Bike Rental SaaS → Supabase Project 2
- Car Hire SaaS → Supabase Project 3

But ALL use the same Google OAuth credentials!

### Q: How do I upload real images?
**A:** Use Cloudinary upload widget (I can build this) or restaurant owners can upload via admin panel.

### Q: Will I be charged for Google OAuth?
**A:** NO! OAuth usage is free. Payment details are just for account verification.

### Q: Can I use Cloudinary for videos too?
**A:** Cloudinary free tier limits videos to 10 MB. For longer videos, use Supabase Storage (50 MB limit) or upgrade to paid tier.

### Q: What if I exceed free tiers?
**A:**
- Supabase: $25/mo for Pro (100 GB storage)
- Cloudinary: $99/mo for Plus (120 GB storage)
- Still way cheaper than Clerk ($400/mo for same users)

---

## Support & Documentation

### Official Docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Cloudinary:** https://cloudinary.com/documentation
- **Next.js Images:** https://nextjs.org/docs/app/api-reference/components/image

### Project-Specific Guides
- Auth integration: `SUPABASE-AUTH-SETUP.md`
- Image storage: `FREE-STORAGE-SETUP.md`
- Credentials reference: `.google-oauth-credentials.txt`

### Integration Guides (siso-app-factory)
- `../siso-app-factory/project-setup-system/integrations/NEXTAUTH-INTEGRATION-GUIDE.md`
- `../siso-app-factory/packages/auth-system/README.md`

---

## Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Set up Google OAuth in Google Cloud Console
- [ ] Configure Supabase Auth (enable Google provider)
- [ ] Sign up for Cloudinary (free tier)
- [ ] Create Supabase Storage bucket for videos
- [ ] Add all credentials to `.env.local`
- [ ] Run database migrations in Supabase SQL Editor
- [ ] Start dev server: `npm run dev`
- [ ] Test sign-in: http://localhost:3002/auth/signin
- [ ] Test images: http://localhost:3002 (should see food gallery)
- [ ] Deploy to Vercel
- [ ] Update Google OAuth with production URL
- [ ] Test production deployment

---

## 🎉 Success!

You now have:
- ✅ Complete authentication system (Google OAuth + Email)
- ✅ Beautiful auth UI (glassmorphic design)
- ✅ Image galleries with real photos
- ✅ Video hero support
- ✅ Multi-tenant architecture
- ✅ 100% FREE for 100+ restaurants
- ✅ Ready to deploy to production

**Total setup time:** ~1 hour
**Total cost:** $0/month
**Capacity:** 100+ restaurants, 50k users, 25 GB images, 1 GB videos

---

**Built with ❤️ for SISO Restaurant Platform**
