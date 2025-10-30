# Restaurant Template - Domain-Based Architecture

## 🏗️ Architecture Overview

This project uses **Domain-Driven Design (DDD)** with Next.js App Router.

### Directory Structure

```
src/
├── app/                                # Next.js App Router (routes only)
│   ├── page.tsx                        # → imports from domains/landing
│   ├── menu/page.tsx                   # → imports from domains/menu
│   ├── reviews/page.tsx                # → imports from domains/reviews
│   ├── loyalty/page.tsx                # → imports from domains/loyalty
│   ├── admin/(marketing)/layout.tsx    # Thin layouts (no business logic)
│   └── ...
│
├── domains/                            # Business logic, UI, and data per domain
│   ├── landing/
│   │   ├── hero-templates/
│   │   │   ├── primary/
│   │   │   │   └── index.tsx
│   │   │   ├── gradient-words/
│   │   │   │   └── index.tsx
│   │   │   └── video-overlay/
│   │   │       └── index.tsx
│   │   ├── review-templates/
│   │   │   ├── primary/
│   │   │   ├── masonry/
│   │   │   └── glass-swiper/
│   │   ├── components/                 # Landing-only building blocks
│   │   ├── hooks/                      # Landing hooks (hero timers, scroll, etc.)
│   │   ├── utils/                      # Helpers shared by landing templates
│   │   ├── LandingHost.tsx             # Chooses hero/review variants
│   │   └── index.ts                    # Export surface for app router
│   │
│   ├── menu/
│   │   ├── menu-templates/
│   │   │   └── primary/
│   │   │       └── index.tsx
│   │   ├── components/                 # MenuItemCard, MenuCategoryTabs, etc.
│   │   ├── hooks/                      # useMenuFilters, useMenuSearch
│   │   ├── actions.ts                  # Supabase queries & mutations
│   │   ├── utils/                      # Formatters (prices, badges)
│   │   └── pages/
│   │       ├── MenuPage.tsx            # Customer experience
│   │       └── AdminMenuPage.tsx       # Admin CRUD shell
│   │
│   ├── reviews/
│   │   ├── RatingsSummary/
│   │   │   ├── templates/{primary,template-2}/index.tsx
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   ├── ReviewCard/...
│   │   ├── FilterBar/...
│   │   ├── templates/template-1..3/    # Page-level layouts (grid, masonry, carousel)
│   │   ├── ReviewsHost.tsx
│   │   └── pages/{ReviewsPage,AdminReviewsPage}.tsx
│   │
│   ├── blog/                           # Same pattern (list/post templates, host, pages)
│   ├── chat/                           # Chat widget/full-page variants + pages
│   ├── loyalty/                        # Hero, tier highlights, leaderboard components
│   ├── admin/                          # Upload components, seed utilities, feedback log
│   └── shared/
│       ├── components/                 # Cross-domain building blocks (SectionHeading, EssentialsChip)
│       ├── hooks/                      # useTenant, analytics helpers
│       └── data/                       # Shared queries and schema types
│
├── components/ui/                      # shadcn primitives only (Button, Input, Dialog, ...)
├── shared/                             # (Legacy) migrating into domains/shared
└── lib/                                # Core utilities (formatting, analytics, config)
```

## 🎯 Key Principles

### 1. Domain-Based Organization
**✅ DO:** Organize by business domain
```typescript
// ✅ CORRECT
src/domains/customer-facing/landing/shared/components/testimonials-columns-1.tsx
src/domains/admin/components/gallery-uploader.tsx
src/domains/customer-facing/menu/components/MenuHeader.tsx
```

**❌ DON'T:** Put domain logic in generic components folder
```typescript
// ❌ WRONG
src/components/testimonials-columns-1.tsx
src/components/gallery-uploader.tsx
```

### 2. App Directory = Routing Only
The `/src/app/` directory is a **thin routing layer** that imports from domains.

```typescript
// src/app/page.tsx
import LandingPage from '@/domains/customer-facing/landing';
export default LandingPage;

// src/app/menu/page.tsx
import MenuPage from '@/domains/customer-facing/menu';
export default MenuPage;
```

**Never put business logic or components directly in `/app/`**

### 3. Components/UI = Primitives Only
Only put **reusable, style-agnostic primitives** in `/src/components/ui/`:
- shadcn components (button, input, dialog, popover, etc.)
- Small composition helpers that have zero business rules

If a component knows anything about a tenant, feature, or layout, it belongs under its domain (or `domains/shared` if used across domains).

### 4. Shared vs Domain
**Shared components:**
- Used across multiple domains
- Generic, reusable
- No domain-specific business logic

**Domain components:**
- Specific to one domain
- Contains business logic
- Even if used in multiple places within the domain

## 📁 Component Location Decision Tree

```
Is it a shadcn/UI primitive (button, input, etc.)?
├─ YES → /src/components/ui/
└─ NO → Is it used across multiple domains?
    ├─ YES → /src/domains/shared/components/
    └─ NO → Which domain does it belong to?
        ├─ Landing → /src/domains/customer-facing/landing/shared/components/
        ├─ Menu → /src/domains/customer-facing/menu/components/
        ├─ Admin → /src/domains/admin/components/
        └─ etc.
```

## 🔄 Import Patterns

### From App Router (pages)
```typescript
// ✅ Import domain root components
import LandingPage from '@/domains/customer-facing/landing';
import MenuPage from '@/domains/customer-facing/menu';
```

### From Domain Components
```typescript
// ✅ Import UI primitives
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ✅ Import shared utilities
import SectionHeading from '@/shared/components/SectionHeading';
import { useTenant } from '@/providers/TenantProvider';

// ✅ Import from same domain (relative)
import { TestimonialsColumn } from '../components/testimonials-columns-1';
import { HeroRenderer } from './hero-section';

// ✅ Import from other domain (absolute, when necessary)
import SeedDataButton from '@/domains/client-facing/admin/components/SeedDataButton';
```

### From Shared Components
```typescript
// ✅ Import UI primitives
import { Button } from '@/components/ui/button';

// ✅ Import shared utilities
import { cn } from '@/lib/utils';
```

## 🚀 Recent Cleanup (Oct 2024)

### Moved Components

**To Landing Domain:**
- `testimonials-columns-1.tsx` → `/domains/landing/shared/components/`
- `testimonials-demo.tsx` → `/domains/landing/shared/components/`
- `reviews-section.tsx` → `/domains/landing/shared/components/`

**To Admin Domain:**
- `gallery-uploader.tsx` → `/domains/admin/components/`
- `menu-item-uploader.tsx` → `/domains/admin/components/`
- `client-image-uploader.tsx` → `/domains/admin/components/`
- `SeedDataButton.tsx` → `/domains/admin/components/`

**To Shared:**
- `SectionHeading.tsx` → `/shared/components/`

**Removed:**
- `lazy-loading-demo.tsx` (demo file)

## ✅ Verification

Build status: ✅ **All builds passing**

All imports have been updated and verified.

## 📋 Quick Reference

| File Type | Location |
|-----------|----------|
| Landing page components | `/src/domains/customer-facing/landing/shared/components/` |
| Menu components | `/src/domains/customer-facing/menu/components/` |
| Admin components | `/src/domains/admin/components/` |
| UI primitives (buttons, inputs) | `/src/components/ui/` |
| Shared components | `/src/shared/components/` |
| Routes/Pages | `/src/app/` |
| Utilities | `/src/lib/` |

## 🎯 Best Practices

1. **Keep `/app/` thin** - Only routing logic
2. **Domain components stay in their domain** - Don't pollute shared
3. **UI primitives in `/components/ui/`** - shadcn components only
4. **Shared = truly shared** - Used across 2+ domains
5. **Use relative imports within domain** - Better encapsulation
6. **Use absolute imports for cross-domain** - Clear dependencies

---

## 🎨 Template Architecture Pattern (CRITICAL!)

### The Component-Level Template System ✅ NEW

This app uses a **Component-Level Template** pattern where each component has its own template variants and shared code.

#### Pattern Overview

```
ComponentName/                  # Each component is self-contained
├── templates/
│   ├── primary/               # Default template variant
│   │   └── index.tsx
│   ├── template-2/            # Alternative variant
│   │   └── index.tsx
│   └── template-3/            # Alternative variant
│       └── index.tsx
├── types/                     # Shared types (ALL templates)
├── hooks/                     # Shared hooks (ALL templates)
└── utils/                     # Shared utils (ALL templates)
```

**Key Principle:** Types/hooks/utils are at component level, NOT inside each template.

#### Why This Pattern?

**✅ DRY Principle**
- Types/hooks/utils shared across all template variants
- Update once, affects all templates
- No duplicate code

**✅ Clear Separation**
- Templates = UI presentation only
- Shared code = Logic and types
- Easy to understand and maintain

**✅ Scalable**
- Add template-4, template-5 easily
- No need to duplicate folders
- Clean structure

#### How It Works

**1. Template Variants** - Multiple UI layouts for the same data:
```typescript
// domains/blog/templates/template-1/index.tsx
export default function BlogTemplate1({ posts, tenant }: BlogTemplateProps) {
  return <div>Classic blog list layout</div>;
}

// domains/blog/templates/template-2/index.tsx
export default function BlogTemplate2({ posts, tenant }: BlogTemplateProps) {
  return <div>Magazine grid layout</div>;
}
```

**2. Host Component** - Selects which template to render:
```typescript
// domains/blog/templates/BlogHost.tsx
const VARIANTS: Record<BlogVariant, Component> = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
};

export function BlogHost({ variant = 'template-1', ...props }) {
  const Component = VARIANTS[variant] ?? Template1;
  return <Component {...props} />;
}
```

**3. Page Component** - Fetches data, passes to Host:
```typescript
// domains/blog/pages/BlogPage.tsx
export default async function BlogPage() {
  const tenant = await getTenantFromRequest();
  const posts = await listPosts();

  // Get variant from config
  const variant = config.blog.variant || 'template-1';

  return <BlogHost variant={variant} posts={posts} tenant={tenant} />;
}
```

**4. App Router** - Thin wrapper (3-5 lines):
```typescript
// app/blog/page.tsx
import { BlogPage } from '@/domains/customer-facing/blog';
export default BlogPage;
```

#### Real-World Examples

**Landing Domain** (Most Complete):
- `hero-section/` - 14 variants (gradient-words, classic-center, video-overlay, etc.)
- `review-section/` - 12 variants (classic, grid, glass-swiper, masonry, etc.)
- `essentials-section/`, `menu-section/`, `story-section/`, `map-section/`, `cta-section/`, `specials-section/`, `instagram-section/` – all aligned to shared section registry
- `HeroRenderer`, `ReviewRenderer`, `MenuRenderer`, etc. select variants based on tenant config

**Menu Domain**:
- `menu-section/` (landing highlights) + `src/domains/customer-facing/menu` customer/admin flows
- Customer page + Admin page in same domain

**Blog Domain** (Scaffolded):
- `templates/template-1,2,3/` - Placeholder structures
- `BlogHost.tsx` - Ready for variants
- `BlogPage.tsx` + `BlogPostPage.tsx` - Customer pages
- `AdminBlogPage.tsx` - Admin CRUD

### 🎯 Domains with Template Architecture

| Domain | Customer Page | Admin Page | Templates | Status |
|--------|---------------|------------|-----------|--------|
| **landing** | ✅ LandingPage | N/A | ✅ Section registries (hero, review, essentials, menu, story, map, cta, specialty, instagram) | Complete |
| **menu** | ✅ MenuPage | ✅ AdminMenuPage | ✅ Menu templates | Complete |
| **blog** | ✅ BlogPage + BlogPostPage | ✅ AdminBlogPage | 🚧 3 placeholders | Scaffold Ready |
| **reviews** | ✅ ReviewsPage | ✅ AdminReviewsPage | 🚧 3 placeholders | Scaffold Ready |
| **specials** | ✅ SpecialsPage | ✅ AdminSpecialsPage | 🚧 3 placeholders | Scaffold Ready |
| **gift-cards** | ✅ GiftCardsPage | ✅ AdminGiftCardsPage | 🚧 3 placeholders | Scaffold Ready |
| **chat** | ✅ ChatPage | ✅ AdminChatPage | 🚧 Future | Scaffold Ready |
| **reservations** | ✅ ReservationsPage | ✅ AdminReservationsPage | Future | Functional |
| **loyalty** | ✅ LoyaltyPage | ✅ AdminLoyaltyPage | Future | Functional |
| **orders** | ✅ OrdersPage | ✅ AdminOrdersPage | Future | Functional |

---

## 🎨 Adding Templates from v0.dev / 21st.dev

### Step-by-Step Guide

**1. Get Template from v0.dev**
```bash
# Go to v0.dev and generate a blog list template
# Prompt: "Modern blog list with cards, images, and read time"
```

**2. Drop into Template Folder**
```typescript
// src/domains/customer-facing/blog/templates/template-4/index.tsx
import type { BlogTemplateProps } from '../types';

export default function BlogTemplate4({ posts, tenant }: BlogTemplateProps) {
  // 👇 PASTE v0.dev TEMPLATE CODE HERE
  return (
    <div className="...">
      {/* Your fancy v0.dev template */}
    </div>
  );
}
```

**3. Register in Host Component**
```typescript
// src/domains/customer-facing/blog/templates/BlogHost.tsx
import Template4 from './template-4';

const VARIANTS = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
  'template-4': Template4, // 👈 Add here
};
```

**4. Update Types**
```typescript
// src/domains/customer-facing/blog/templates/types.ts
export type BlogVariant =
  | 'template-1'
  | 'template-2'
  | 'template-3'
  | 'template-4'; // 👈 Add to type
```

**5. Configure in siteConfig**
```typescript
// Tenant config
features: {
  blog: {
    variant: 'template-4', // 👈 Use new template
  }
}
```

### Template Requirements

**Each template MUST:**
- Accept the domain's `TemplateProps` interface
- Use tenant data for personalization
- Work with real data (not hardcoded)
- Be responsive (mobile-first)
- Match the design system (Tailwind CSS)

**Each template CAN:**
- Use shadcn/ui components from `@/components/ui/`
- Import shared components from `@/domains/shared/components/`
- Add custom components in the template folder
- Use animations (framer-motion is installed)

### Where to Find Each Domain's README

Each domain has a detailed README with template import instructions:

- `src/domains/customer-facing/blog/README.md`
- `src/domains/customer-facing/reviews/README.md`
- `src/domains/specials/README.md`
- `src/domains/gift-cards/README.md`
- `src/domains/customer-facing/chat/README.md`

---

## ⚠️ Server Actions & Template Limitations

**Problem:** Templates with server actions can't use the Host pattern due to Next.js client/server boundary.

**Solution:** For pages with server actions (forms, mutations):

```typescript
// ❌ CAN'T DO THIS (server actions in template)
<BlogHost variant="template-1" />

// ✅ DO THIS INSTEAD
// Keep server actions in the page file, not in templates
// Or import page directly from domains/blog/pages/BlogPage.tsx
```

**Admin pages always import directly** (not through barrel exports):
```typescript
// ✅ CORRECT
import AdminBlogPage from '@/domains/customer-facing/blog/pages/AdminBlogPage';

// ❌ WRONG (breaks with server actions)
import { AdminBlogPage } from '@/domains/customer-facing/blog';
```

---

## 📋 Complete Domain Structure (October 2025)

```
src/domains/
├── customer-facing/      # Public/customer experiences
│   ├── landing/           # Homepage with shared section scaffold
│   ├── about-us/
│   ├── blog/
│   ├── chat/
│   ├── loyalty/
│   ├── menu/
│   └── reviews/
├── client-facing/        # Internal/admin experiences
│   └── admin/
├── archive/              # Legacy domains + reference implementations
└── shared/               # Cross-domain primitives (components, hooks, etc.)
```
│   ├── pages/OrdersPage.tsx
│   └── pages/AdminOrdersPage.tsx
│
├── leads/                # Lead management ✅
│   └── pages/AdminLeadsPage.tsx
│
├── pages/                # Custom page builder ✅
│   └── pages/AdminPagesPage.tsx
│
├── admin/                # Shared admin components ✅
│   └── components/
│
└── shared/               # Shared across domains ✅
    └── components/
```

---

## 🎯 Best Practices (Updated)

1. **Keep `/app/` thin** - Only routing logic (3-5 lines max)
2. **Domain components stay in their domain** - Don't pollute shared
3. **UI primitives in `/components/ui/`** - shadcn components only
4. **Use templates for customer pages** - Enable easy design swapping
5. **Create Host components** - Central template selection
6. **Each domain has README.md** - Template import instructions
7. **Server actions stay in page files** - Not in templates
8. **Admin pages import directly** - Avoid barrel exports with server actions

---

**Last Updated:** October 25, 2025
**Status:** ✅ Template Architecture + DDD Enforced
**Next:** Import v0.dev templates into placeholder scaffolding
