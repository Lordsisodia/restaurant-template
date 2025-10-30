# Menu Domain - Integration Guide

**Domain-Based Architecture Implementation**

Complete guide to integrating the menu domain into your restaurant project.

---

## 📦 What's Included

**16 Files** organized in clean domain structure:

```
domains/menu/
├── components/       # 9 UI components
├── hooks/            # React Query hooks
├── services/         # Business logic
├── types/            # TypeScript definitions
├── constants/        # Fallback data & config
├── pages/            # MenuPage component
├── index.ts          # Barrel exports
└── README.md         # Documentation
```

---

## 🚀 Quick Integration (5 Minutes)

### Step 1: Copy the Domain

```bash
# Copy entire menu domain to your project
cp -r domains/menu YOUR_PROJECT/src/domains/

# Or integrate with existing structure
cp -r domains/menu YOUR_PROJECT/src/features/
```

### Step 2: Install Dependencies

```bash
npm install @tanstack/react-query lucide-react
# Already have Supabase? Skip this
npm install @supabase/supabase-js
```

### Step 3: Set Up React Query (If Not Already)

```tsx
// In your main App.tsx or _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

### Step 4: Use MenuPage

```tsx
// In your router (Next.js example)
import { MenuPage } from '@/domains/customer-facing/menu';

export default function Menu() {
  return <MenuPage />;
}
```

**Done!** 🎉 Your menu page is live!

---

## 🎯 Integration Options

### Option A: Drop-In Replacement (Simplest)

**Use MenuPage as-is**:

```tsx
import { MenuPage } from '@/domains/customer-facing/menu';

export default function MenuRoute() {
  return <MenuPage isSignedIn={false} />;
}
```

**What you get**:
- ✅ Complete menu page with tabs
- ✅ Category filtering
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ About section

---

### Option B: Custom Layout (Moderate)

**Use components individually**:

```tsx
import {
  useMenuItems,
  useMenuCategories,
  MenuCategoryTabs,
  MenuHeader,
  groupMenuItemsByCategory
} from '@/domains/customer-facing/menu';

export default function CustomMenuPage() {
  const { data: items, isLoading } = useMenuItems();
  const { data: categories } = useMenuCategories();

  if (isLoading) return <div>Loading...</div>;

  const grouped = groupMenuItemsByCategory(items || []);

  return (
    <div className="container">
      <MenuHeader />
      <MenuCategoryTabs
        categories={categories || []}
        menuItemsByCategory={grouped}
      />
    </div>
  );
}
```

---

### Option C: Fully Custom (Advanced)

**Build your own UI with domain logic**:

```tsx
import {
  useMenuItems,
  MenuItemCard,
  filterMenuItems,
  searchMenuItems,
  type MenuItem
} from '@/domains/customer-facing/menu';
import { useState } from 'react';

export default function AdvancedMenu() {
  const { data: allItems } = useMenuItems();
  const [filters, setFilters] = useState({ vegan: false });
  const [search, setSearch] = useState('');

  // Apply domain logic
  let items = allItems || [];
  items = filterMenuItems(items, filters);
  items = searchMenuItems(items, search);

  return (
    <div>
      {/* Your custom header */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search menu..."
      />

      <label>
        <input
          type="checkbox"
          checked={filters.vegan}
          onChange={(e) => setFilters({ vegan: e.target.checked })}
        />
        Vegan Only
      </label>

      {/* Render with domain components */}
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🗄️ Database Setup

### Supabase Tables

```sql
-- 1. Menu Categories
CREATE TABLE menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Menu Items
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT REFERENCES menu_categories(id),
  image_url TEXT,
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_spicy BOOLEAN DEFAULT false,
  ingredients TEXT,
  calories INTEGER,
  popular_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Indexes for performance
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_popular ON menu_items(popular_score DESC);
```

### Seed Data (Optional)

```sql
-- Insert categories
INSERT INTO menu_categories (id, name, description, display_order) VALUES
('starters', 'Starters', 'Small plates perfect for sharing', 0),
('mains', 'Mains', 'Signature main courses', 1),
('pizzas', 'Pizzas', 'Wood-fired Neapolitan pizzas', 2),
('desserts', 'Desserts', 'Sweet finales', 3);

-- Insert sample items
INSERT INTO menu_items (id, name, description, price, category, is_vegetarian, popular_score) VALUES
('item1', 'Truffle Risotto', 'Arborio rice, wild mushrooms, truffle', 18.00, 'mains', true, 85),
('item2', 'Margherita Pizza', 'Tomatoes, mozzarella, basil', 14.00, 'pizzas', true, 92);
```

---

## 🎨 Styling & Theming

### Required Tailwind Colors

Add to your `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      elementree: {
        earth: "#8E9196",
        water: "#8E4A49",
        fire: "#FEC6A1",
        air: "#F2FCE2",
        dark: "#1A1F2C",
        light: "#F6F6F7",
      },
    },
  },
}
```

### Optional: Custom Colors

Want to use your restaurant's colors? Update components:

```tsx
// In MenuItemCard.tsx, find:
className="bg-elementree-water"

// Replace with:
className="bg-primary" // Your color
```

---

## 🔌 Required Dependencies

### UI Components Needed

The domain uses these UI components (from Shadcn/ui):

```tsx
// From cherry-picked-components/ui/
button.tsx
card.tsx
badge.tsx
tabs.tsx
alert.tsx
skeleton.tsx
```

### Copy to Your Project

```bash
cp cherry-picked-components/ui/*.tsx YOUR_PROJECT/src/components/ui/
```

---

## 🧪 Testing Integration

### Quick Test

```tsx
// Test page (test-menu.tsx)
import { MenuPage } from '@/domains/customer-facing/menu';

export default function TestMenu() {
  console.log('Menu domain loaded');
  return <MenuPage />;
}
```

### Expected Behavior

1. **Without Database**:
   - Shows fallback data (6 items)
   - Categories: Starters, Mains, Pizzas, Desserts
   - All features work with mock data

2. **With Database**:
   - Fetches real data
   - Falls back on error
   - Caches for 5 minutes

---

## 🚨 Common Issues & Fixes

### Issue 1: Import Errors

**Error**: `Cannot find module '@/domains/customer-facing/menu'`

**Fix**: Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue 2: Supabase Not Found

**Error**: `Cannot find module '@/integrations/supabase/client'`

**Fix**: Create Supabase client:

```tsx
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fromTable = (table: string) => supabase.from(table);
```

### Issue 3: UI Components Missing

**Error**: Components like `Button` not found

**Fix**: Copy UI components:

```bash
cp cherry-picked-components/ui/* YOUR_PROJECT/src/components/ui/
```

### Issue 4: Theme Colors Not Working

**Error**: `elementree-water` etc. not styling

**Fix**: Add colors to Tailwind config (see Styling section above)

---

## 📈 Performance Optimization

### 1. Prefetch on App Load

```tsx
// In your App.tsx or layout
import { usePrefetchMenuData } from '@/domains/customer-facing/menu';
import { useEffect } from 'react';

export default function App() {
  const { prefetchMenuData } = usePrefetchMenuData();

  useEffect(() => {
    // Prefetch menu data on app startup
    prefetchMenuData();
  }, []);

  return <YourApp />;
}
```

### 2. Image Optimization

Update `MenuItemCard.tsx` for Next.js:

```tsx
// Replace <img> with Next.js Image
import Image from 'next/image';

<Image
  src={item.image_url}
  alt={item.name}
  width={880}
  height={600}
  className="..."
/>
```

### 3. Lazy Loading

```tsx
// Load MenuPage lazily
import { lazy, Suspense } from 'react';

const MenuPage = lazy(() => import('@/domains/customer-facing/menu').then(m => ({ default: m.MenuPage })));

export default function Menu() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <MenuPage />
    </Suspense>
  );
}
```

---

## 🎓 Advanced Usage

### Custom Filtering

```tsx
import { useMenuItems, filterMenuItems } from '@/domains/customer-facing/menu';

function VeganMenu() {
  const { data: items } = useMenuItems();
  const veganItems = filterMenuItems(items || [], { vegan: true });

  return (
    <div>
      <h2>Vegan Menu ({veganItems.length} items)</h2>
      {/* Render veganItems */}
    </div>
  );
}
```

### Search Functionality

```tsx
import { useMenuItems, searchMenuItems } from '@/domains/customer-facing/menu';
import { useState } from 'react';

function SearchableMenu() {
  const { data: items } = useMenuItems();
  const [query, setQuery] = useState('');

  const results = searchMenuItems(items || [], query);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for dishes..."
      />
      <p>Found {results.length} results</p>
      {/* Render results */}
    </>
  );
}
```

### Featured Items

```tsx
import { useMenuItems } from '@/domains/customer-facing/menu';

function FeaturedMenu() {
  const { data: items } = useMenuItems();

  // Get top-rated items (popular_score > 80)
  const featured = items?.filter(item => item.popular_score > 80);

  return (
    <section>
      <h2>Chef's Recommendations</h2>
      {/* Render featured */}
    </section>
  );
}
```

---

## 🔄 Migration from Old Code

### If you have existing menu code:

1. **Keep your old code** temporarily
2. **Add menu domain** alongside
3. **Test new domain** on separate route
4. **Gradually migrate** data/components
5. **Remove old code** when confident

### Migration Checklist

- [ ] Copy menu domain to project
- [ ] Install dependencies
- [ ] Set up Supabase client
- [ ] Copy UI components
- [ ] Add Tailwind colors
- [ ] Test MenuPage on `/test-menu`
- [ ] Migrate data to new schema
- [ ] Update routes to use new domain
- [ ] Remove old menu code

---

## 📊 Domain Stats

- **16 files** total
- **9 components** (UI layer)
- **1 hook file** (3 hooks)
- **1 service file** (6 functions)
- **1 type file** (4 types)
- **1 constants file** (fallback data)
- **1 page** (complete menu page)

**Estimated Integration Time**: 30-60 minutes

---

## 🎯 Success Metrics

After integration, you should have:

✅ Working menu page at `/menu`
✅ Category tabs switching smoothly
✅ Menu items displaying with images
✅ Dietary badges showing correctly
✅ Loading skeletons on initial load
✅ Fallback data if database empty
✅ Error handling if database fails
✅ Mobile responsive design
✅ Fast page loads (<2s)
✅ Cached data (no re-fetching on revisit)

---

## 🆘 Need Help?

1. **Read the domain README**: `domains/menu/README.md`
2. **Check examples**: See usage examples above
3. **Review component files**: Well-commented code
4. **Test with fallback data**: Works without database

---

## 🚀 Next Steps

1. ✅ Integrate menu domain
2. 🔄 Customize styling to match brand
3. 🔄 Add real menu data to database
4. 🔄 Add menu images
5. 🔄 Integrate with orders domain (future)
6. 🔄 Add admin panel for menu management

---

**Domain Version**: 1.0.0
**Architecture**: Domain-Driven Design (DDD)
**Framework Agnostic**: Works with Next.js, Vite, CRA
**Last Updated**: October 2025

---

**Happy Coding! 🍕🍝🥗**
