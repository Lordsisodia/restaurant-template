# Restaurant Template Documentation

Multi-tenant Next.js 15 platform for SISO restaurant clients. Each tenant gets public marketing pages, live ordering views, loyalty/reviews promos, and a Supabase-backed admin console with Clerk authentication.

## 📚 Documentation Structure

### 🚀 [Setup & Installation](./setup/)
Complete guides for getting started:
- [**Complete Setup Guide**](./setup/COMPLETE-SETUP-GUIDE.md) - Full installation walkthrough
- [**Draco Complete Setup**](./setup/DRACO-COMPLETE-SETUP.md) - Draco 3D model integration
- [**Auth Complete Guide**](./setup/AUTH-COMPLETE-GUIDE.md) - Authentication setup
- [**Supabase Auth Setup**](./setup/SUPABASE-AUTH-SETUP.md) - Supabase authentication
- [**Free Storage Setup**](./setup/FREE-STORAGE-SETUP.md) - Storage configuration
- [**Setup Free Images/Video**](./setup/SETUP-FREE-IMAGES-VIDEO.md) - Media setup

### 🏗️ [Architecture & Strategy](./architecture/)
Technical decisions and optimization strategies:
- [**Complete Image Architecture**](./architecture/COMPLETE-IMAGE-ARCHITECTURE.md) - Full image system design
- [**Cloudinary Architecture**](./architecture/CLOUDINARY-ARCHITECTURE.md) - Cloud image management
- [**Hybrid Image Strategy**](./architecture/HYBRID-IMAGE-STRATEGY.md) - Combined approach
- [**Image Strategy Cheatsheet**](./architecture/IMAGE-STRATEGY-CHEATSHEET.md) - Quick reference
- [**Shared Infrastructure Strategy**](./architecture/SHARED-INFRASTRUCTURE-STRATEGY.md) - Multi-tenant architecture
- [**Supabase Optimization Strategy**](./architecture/SUPABASE-OPTIMIZATION-STRATEGY.md) - Database optimization
- [**Vercel 250MB Limit Strategy**](./architecture/VERCEL-250MB-LIMIT-STRATEGY.md) - Deployment constraints
- [**Small Scale Optimization**](./architecture/SMALL-SCALE-OPTIMIZATION.md) - Performance tuning
- [**Hardcode vs Database Decision**](./architecture/HARDCODE-VS-DATABASE-DECISION.md) - Data strategy
- [**Draco Final Architecture**](./architecture/DRACO-FINAL-ARCHITECTURE.md) - 3D model architecture

### ✨ [Features](./features/)
Implementation guides for key features:
- [**Menu Integration Complete**](./features/MENU-INTEGRATION-COMPLETE.md) - Menu system
- [**Menu Filter Feature**](./features/MENU-FILTER-FEATURE.md) - Filtering functionality
- [**Landing Page Strategy**](./features/LANDING-PAGE-STRATEGY.md) - Homepage design
- [**Footer Integration Summary**](./features/FOOTER-INTEGRATION-SUMMARY.md) - Footer implementation
- [**Footer Variations Guide**](./features/FOOTER-VARIATIONS-GUIDE.md) - Footer options
- [**Lazy Loading Guide**](./features/LAZY-LOADING-GUIDE.md) - Performance optimization

### 🚢 [Deployment](./deployment/)
Production deployment guides:
- [**Draco Deployment Guide**](./deployment/DRACO-DEPLOYMENT-GUIDE.md) - Deploying 3D models

### 🔌 [Integrations](./integrations/)
Third-party and component integrations:
- [**Menu Domain Integration Guide**](./integrations/MENU-DOMAIN-INTEGRATION-GUIDE.md) - Menu system integration
- [**Footer Mobile UX Guide**](./integrations/FOOTER-MOBILE-UX-GUIDE.md) - Mobile footer
- [**Restaurant Footer Enhancement Plan**](./integrations/RESTAURANT-FOOTER-ENHANCEMENT-PLAN.md) - Footer improvements
- [**Restaurant Footer Implementation**](./integrations/RESTAURANT-FOOTER-IMPLEMENTATION-GUIDE.md) - Footer guide
- [**Tenant Data Updated**](./integrations/TENANT-DATA-UPDATED.md) - Multi-tenant data

### 📖 [Reference](./reference/)
Quick references and client information:
- [**Quick Reference**](./reference/QUICK-REFERENCE.md) - Cheat sheet
- [**Client Data**](./reference/client-data.md) - Client-specific details

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Supabase CLI (`npm install -g supabase`)
- Access to the project environment variables (Clerk + Supabase keys)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env.local` in `restaurant-template/`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
DEFAULT_RESTAURANT_ID=00000000-0000-0000-0000-000000000001
DEFAULT_RESTAURANT_SLUG=ayam-bakar-jaya
DEFAULT_TENANT_GROUP=pod-alpha
```

(These defaults point the local app at the first seeded tenant.)

### 3. Apply migrations & seed data

```bash
cd restaurant-template
supabase login                     # once
supabase link --project-ref ntrklmkzyfnrtfbpdypd
supabase db push                   # runs migrations in supabase/migrations
supabase db query < supabase/seed_demo.sql   # or use psql/pgcli if preferred
```

The seed populates demo restaurants, menu items, specials, orders, loyalty members, reviews, assistant macros, and homepage PageBlocks so the UI is immediately populated.

### 4. Run the app locally

```bash
npm run dev
```

Open http://localhost:3000 to see the marketing site. Visit:

- `/orders`, `/loyalty`, `/reviews`, `/chat` – public data pulled from Supabase.
- `/admin` – Clerk-protected admin shell. Use the Clerk dashboard to create a test user and assign it to the tenant.

### 5. Useful scripts

```bash
npm run lint        # eslint
npm run build       # production build
```

## Structure highlights

- `src/app/(marketing)/*` – tenant-facing pages (orders tracker, loyalty highlights, reviews, chat assistant, etc.)
- `src/app/admin/*` – admin CRUD consoles for menu, specials, orders, loyalty, reviews, chat assistant macros, PageBlocks.
- `src/shared/data/*` – Supabase data-access helpers (multi-tenant aware via headers + service role).
- `supabase/migrations` – database schema. `202510200940__orders_loyalty_reviews_chat.sql` adds the new domains.
- `supabase/seed_demo.sql` – deterministic demo data referenced above.

With migrations applied and the dev server running, you'll see the complete restaurant template experience end-to-end.

---

**📝 For detailed guides, explore the documentation categories above!**
