# 🎨 Template Import Guide - v0.dev / 21st.dev Integration

## 🎯 Quick Start

This restaurant app is **scaffolded** and ready for beautiful templates from v0.dev or 21st.dev!

### What's Ready

✅ **Template Architecture** - Host components + variant system
✅ **Domain Structure** - All customer pages organized
✅ **Data Layer** - Supabase integration complete
✅ **Build System** - Next.js 15 + Turbopack

### What's Needed

🚧 **Fancy UI Templates** - Replace placeholder templates with v0.dev designs!

---

## 📁 Template-Ready Domains

| Domain | Customer Page | Templates Folder | README | Priority |
|--------|---------------|------------------|--------|----------|
| **Blog** | /blog | `src/domains/customer-facing/blog/templates/` | [View](src/domains/customer-facing/blog/README.md) | 🔴 High |
| **Reviews** | /reviews | `src/domains/customer-facing/reviews/templates/` | [View](src/domains/customer-facing/reviews/README.md) | 🔴 High |
| **Specials** | /specials | `src/domains/specials/templates/` | [View](src/domains/specials/README.md) | 🟡 Medium |
| **Gift Cards** | /gift-cards | `src/domains/gift-cards/templates/` | [View](src/domains/gift-cards/README.md) | 🟡 Medium |
| **Chat** | /chat | `src/domains/customer-facing/chat/templates/` | [View](src/domains/customer-facing/chat/README.md) | 🟢 Low |

---

## 🚀 How to Import a v0.dev Template

### Example: Blog Template

**1. Generate template on v0.dev**
```
Prompt: "Modern blog post grid with featured image,
excerpt, read time, and category tags. Use Tailwind CSS
and make it responsive."
```

**2. Copy v0.dev code**
- Click "Copy Code" button
- Get the React component code

**3. Drop into template folder**
```typescript
// src/domains/customer-facing/blog/templates/template-4/index.tsx
import type { BlogTemplateProps } from '../types';

export default function BlogTemplate4({ posts, tenant }: BlogTemplateProps) {
  // 👇 PASTE v0.dev CODE HERE
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="...">
          {/* v0.dev generated JSX */}
        </article>
      ))}
    </div>
  );
}
```

**4. Adapt the data mapping**
```typescript
// v0.dev might use different prop names
// Adapt to match BlogTemplateProps interface

// v0.dev example:
{posts.map(post => <div>{post.title}</div>)}

// Your data structure (BlogTemplateProps):
interface BlogPost {
  id: string;
  title: string;        // ✅ Use this
  slug: string;
  excerpt: string | null;
  content: string | null;
  publishedAt: string | null;
}
```

**5. Register template**
```typescript
// src/domains/customer-facing/blog/templates/BlogHost.tsx
import Template4 from './template-4'; // Add import

const VARIANTS = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
  'template-4': Template4, // Add here
};
```

**6. Update types**
```typescript
// src/domains/customer-facing/blog/templates/types.ts
export type BlogVariant =
  | 'template-1'
  | 'template-2'
  | 'template-3'
  | 'template-4'; // Add variant
```

**7. Test it**
```bash
npm run dev
# Visit http://localhost:3000/blog
```

**8. Configure variant (optional)**
```typescript
// Tenant config (siteConfig)
features: {
  blog: {
    variant: 'template-4', // Use your new template
  }
}
```

---

## 📦 Data Interfaces by Domain

### Blog
```typescript
interface BlogTemplateProps {
  posts: BlogPost[];
  tenant: { displayName: string; slug: string };
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  publishedAt: string | null;
}
```

### Reviews
```typescript
interface ReviewsTemplateProps {
  reviews: Review[];
  tenant: { displayName: string; slug: string };
}

interface Review {
  id: string;
  authorName: string;
  rating: number; // 1-5
  comment: string | null;
  publishedAt: string | null;
}
```

### Specials
```typescript
interface SpecialsTemplateProps {
  specials: Special[];
  tenant: { displayName: string; slug: string };
}

interface Special {
  id: string;
  title: string;
  description: string;
  type: 'percent' | 'fixed' | 'bogo';
  value: number;
  savings: string; // e.g., "20% off"
  startDate: string | null;
  endDate: string | null;
}
```

### Gift Cards
```typescript
interface GiftCardsTemplateProps {
  tenant: { displayName: string; slug: string };
  denominations?: number[]; // [50000, 100000, 200000]
}

// Note: Gift cards page has server actions (form submission)
// So templates might need to be in the page file directly
```

---

## 💡 Pro Tips

### Reusing Existing Templates

**Landing page has amazing templates already built!**

```typescript
// Instead of building from scratch, reuse:
import { ReviewRenderer } from '@/domains/customer-facing/landing/sections/review-section';
import { SpecialsRenderer } from '@/domains/customer-facing/landing/sections/specials-section/template-1';

// Landing has:
// - 14 hero variants
// - 11 review variants
// - Multiple menu/gallery/map templates
```

### v0.dev Prompts That Work Well

**Blog:**
- "Modern blog grid with featured posts, images, and tags"
- "Minimal blog list with large typography and spacing"
- "Magazine-style blog with hero post and sidebar"

**Reviews:**
- "Customer testimonial cards with star ratings and avatars"
- "Animated testimonial carousel with glassmorphism"
- "Masonry grid of customer reviews with photos"

**Specials:**
- "Restaurant deals cards with countdown timer and discount badge"
- "Promotional banner with gradient and CTA button"
- "Special offers carousel with swipe animation"

**Gift Cards:**
- "Gift card purchase form with animated card preview"
- "E-gift card interface with amount selection and personalization"

### Common Adaptations Needed

**1. Data mapping:**
```typescript
// v0.dev might use:
{item.name}

// Your data uses:
{post.title} // Adapt prop names
```

**2. Styling integration:**
```typescript
// v0.dev might use:
className="bg-blue-500"

// You use CSS variables:
className="bg-primary" // Use design tokens
```

**3. Links:**
```typescript
// v0.dev might use:
<a href="/blog/post-1">

// You use Next.js:
import Link from 'next/link';
<Link href={`/blog/${post.slug}`}>
```

---

## 🏗️ Template Folder Structure

Each domain follows this pattern:

```
domain/
├── templates/
│   ├── template-1/
│   │   ├── index.tsx        # Main template component
│   │   ├── components/      # Template-specific components (optional)
│   │   └── README.md        # Template-specific notes (optional)
│   ├── template-2/
│   ├── template-3/
│   ├── DomainHost.tsx       # Template selector
│   └── types.ts             # Shared types
│
├── pages/
│   ├── CustomerPage.tsx     # Main customer page
│   └── AdminPage.tsx        # Admin management
│
├── components/              # Domain-specific shared components
└── index.ts                 # Public API
```

---

## 🎓 Learning the Pattern

**Start here:**
1. Read `ARCHITECTURE.md` - Understand DDD structure
2. Explore `src/domains/customer-facing/landing/` - See complete template examples
3. Check `src/domains/customer-facing/blog/README.md` - Follow step-by-step guide
4. Import your first v0.dev template
5. Test with `npm run dev`

**Reference implementations:**
- **Best example:** `src/domains/customer-facing/landing/hero-templates/` (14 variants!)
- **Simple example:** `src/domains/customer-facing/blog/templates/` (scaffolded)
- **Complex example:** `src/domains/customer-facing/landing/sections/review-section/` (11 variants)

---

## ⚠️ Common Gotchas

### 1. Server Actions in Templates
❌ **Don't** put server actions inside template components
✅ **Do** keep server actions in page files

### 2. Barrel Exports with Server Actions
❌ **Don't** export pages with server actions through `index.ts`
✅ **Do** import directly from `pages/AdminPage.tsx`

### 3. Client/Server Boundaries
❌ **Don't** mix `'use client'` and `'use server'` in same file
✅ **Do** separate client components from server actions

### 4. Import Paths
✅ Use `@/` for absolute imports
✅ Use `../` for relative within domain
❌ Don't use `../../` to escape domain boundaries

---

## 🔥 Next Steps

**To complete the customer-facing experience:**

1. **Import Blog Template** (30 mins)
   - Go to v0.dev
   - Generate "modern blog grid"
   - Drop into `blog/templates/template-1/index.tsx`

2. **Import Reviews Template** (20 mins)
   - Or reuse `landing/sections/review-section/`
   - Full-page reviews layout

3. **Import Specials Template** (20 mins)
   - Or reuse `landing/sections/specials-section/`
   - Deals showcase page

4. **Polish Gift Cards** (30 mins)
   - Animated card preview
   - Better form UX

5. **Add About/Contact Templates** (optional)
   - Currently functional but basic

---

**Last Updated:** October 25, 2025
**Author:** SISO SuperClaude
**Status:** 🚧 Scaffolding Complete - Ready for v0.dev Templates!
