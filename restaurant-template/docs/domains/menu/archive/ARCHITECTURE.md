# Menu Domain Architecture

**Clean Domain-Driven Design (DDD) Implementation**

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    PAGES LAYER                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  MenuPage.tsx                                       │    │
│  │  - Orchestrates components                          │    │
│  │  - Manages page-level state                        │    │
│  │  - Handles auth integration                        │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENTS LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ MenuHeader   │  │CategoryTabs  │  │ ItemCard     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │LoadingState  │  │ EmptyState   │  │ ErrorAlert   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    HOOKS LAYER                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  use-menu.ts (React Query)                         │    │
│  │  - useMenuItems()                                  │    │
│  │  - useMenuCategories()                             │    │
│  │  - useMenuItemsByCategory()                        │    │
│  │  - usePrefetchMenuData()                           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVICES LAYER                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  menu.service.ts (Business Logic)                  │    │
│  │  - fetchMenuItems()                                │    │
│  │  - fetchMenuCategories()                           │    │
│  │  - groupMenuItemsByCategory()                      │    │
│  │  - filterMenuItems()                               │    │
│  │  - searchMenuItems()                               │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    TYPES LAYER                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  menu.types.ts                                      │    │
│  │  - MenuItem                                         │    │
│  │  - MenuCategory                                     │    │
│  │  - MenuItemsByCategory                              │    │
│  │  - MenuFilters                                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                 CONSTANTS LAYER                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  menu.constants.ts                                  │    │
│  │  - FALLBACK_MENU_ITEMS                              │    │
│  │  - FALLBACK_CATEGORIES                              │    │
│  │  - MENU_QUERY_CONFIG                                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL LAYER                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Supabase (Database)                                │    │
│  │  - menu_items table                                 │    │
│  │  - menu_categories table                            │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Design Principles

### 1. Separation of Concerns
Each layer has a single responsibility:
- **Pages**: User interaction & routing
- **Components**: UI rendering
- **Hooks**: Data fetching & state
- **Services**: Business logic
- **Types**: Type safety
- **Constants**: Configuration

### 2. Dependency Rule
Dependencies flow downward only:
```
Pages → Components → Hooks → Services → External
         ↓            ↓        ↓
       Types ←────────┴────────┘
         ↓
     Constants
```

### 3. Encapsulation
Everything menu-related lives in `/domains/menu/`
- No cross-domain imports
- Clean boundaries
- Easy to test in isolation

---

## 📊 Data Flow

### Read Flow (Fetching Menu)

```
1. User visits MenuPage
   ↓
2. MenuPage calls useMenuItems()
   ↓
3. Hook checks React Query cache
   ↓
4. If stale, calls fetchMenuItems() service
   ↓
5. Service queries Supabase
   ↓
6. On success: returns data
   On error: returns FALLBACK_MENU_ITEMS
   ↓
7. Hook updates cache & returns data
   ↓
8. MenuPage receives data
   ↓
9. Components render with data
```

### Write Flow (Future: Update Menu)

```
1. Admin updates menu item
   ↓
2. Component calls mutation hook
   ↓
3. Hook calls update service
   ↓
4. Service updates Supabase
   ↓
5. On success: invalidate cache
   ↓
6. React Query refetches
   ↓
7. UI updates automatically
```

---

## 🔄 State Management

### React Query Strategy

```typescript
useQuery({
  queryKey: ["menuItems"],        // Cache key
  queryFn: fetchMenuItems,        // Fetch function
  staleTime: 5 * 60 * 1000,       // 5 min cache
  gcTime: 10 * 60 * 1000,         // 10 min garbage collection
  placeholderData: FALLBACK_ITEMS // Instant UI
})
```

**Benefits**:
- Automatic caching
- Background refetching
- Optimistic updates
- Error retry logic
- Loading states
- Stale-while-revalidate

---

## 🧩 Component Architecture

### Component Hierarchy

```
MenuPage
├── MenuHeader
├── MenuErrorAlert (conditional)
├── MenuEmptyState (conditional)
├── MenuLoadingState (conditional)
└── MenuCategoryTabs
    ├── Tabs (UI)
    └── TabContent
        ├── MenuItemCard[]
        │   ├── Card (UI)
        │   ├── Badge (UI)
        │   └── Element Icons
        └── MenuItemSkeleton[] (loading)
```

### Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| MenuPage | Orchestration, auth check |
| MenuHeader | Title, search, filters |
| MenuCategoryTabs | Tab navigation |
| MenuItemCard | Individual item display |
| MenuLoadingState | Skeleton loader |
| MenuErrorAlert | Error messaging |
| MenuEmptyState | Empty state UI |

---

## 🗄️ Database Schema

### Entity Relationship

```
┌─────────────────────┐
│  menu_categories    │
├─────────────────────┤
│ PK: id              │
│     name            │
│     description     │
│     display_order   │
└──────────┬──────────┘
           │
           │ 1:N
           │
           ▼
┌─────────────────────┐
│    menu_items       │
├─────────────────────┤
│ PK: id              │
│     name            │
│     description     │
│     price           │
│ FK: category        │◄─────┐
│     image_url       │      │
│     is_vegetarian   │      │
│     is_vegan        │      │
│     is_gluten_free  │      │
│     is_spicy        │      │
│     ingredients     │      │
│     calories        │      │
│     popular_score   │      │
└─────────────────────┘      │
                             │
                      References
```

---

## 🎨 Styling Architecture

### Tailwind Strategy

```
Base Classes (Tailwind)
    ↓
Custom Theme (elementree-*)
    ↓
Component-Specific Styles
    ↓
Responsive Modifiers (md:, lg:)
    ↓
State Modifiers (hover:, focus:)
```

### Color System

```typescript
elementree: {
  earth: "#8E9196",  // Browns, grounding
  water: "#8E4A49",  // Blues, fluidity
  fire: "#FEC6A1",   // Oranges, passion
  air: "#F2FCE2",    // Light, airy
  dark: "#1A1F2C",   // Text
  light: "#F6F6F7",  // Backgrounds
}
```

---

## 🚀 Performance Optimizations

### 1. Data Layer
- React Query caching (5 min)
- Placeholder data (instant UI)
- Stale-while-revalidate
- Automatic deduplication

### 2. Component Layer
- Lazy component loading
- Skeleton screens
- Image lazy loading
- Conditional rendering

### 3. Network Layer
- Prefetching on app load
- Batch requests (future)
- Optimistic updates (future)

---

## 🧪 Testing Strategy

### Unit Tests
```
Services → Test business logic
  ├── filterMenuItems()
  ├── searchMenuItems()
  └── groupMenuItemsByCategory()
```

### Integration Tests
```
Hooks → Test data fetching
  ├── useMenuItems()
  ├── useMenuCategories()
  └── Cache behavior
```

### Component Tests
```
Components → Test UI rendering
  ├── MenuItemCard props
  ├── Loading states
  └── Error states
```

### E2E Tests
```
MenuPage → Test full flow
  ├── Navigate to /menu
  ├── Switch categories
  ├── Filter items
  └── View item details
```

---

## 🔐 Security Considerations

### Row-Level Security (RLS)

```sql
-- Public read access to menu (no auth required)
CREATE POLICY "Anyone can read menu items"
  ON menu_items FOR SELECT
  USING (true);

-- Admin write access (requires auth)
CREATE POLICY "Only admins can modify menu"
  ON menu_items FOR ALL
  USING (auth.role() = 'admin');
```

---

## 📈 Scalability

### Current Capacity
- **~1000 menu items**: No performance issues
- **~50 categories**: Fast tab switching
- **1000s users**: React Query caching prevents overload

### Future Scaling
```
Current: Single table queries
    ↓
Next: Add Redis cache layer
    ↓
Next: CDN for images
    ↓
Next: Database read replicas
    ↓
Next: Microservices (if needed)
```

---

## 🔄 Future Enhancements

### Phase 1 (Current)
✅ Menu display
✅ Category filtering
✅ Dietary badges
✅ Loading states

### Phase 2 (Next)
- [ ] Search functionality
- [ ] Price range filters
- [ ] Sort options
- [ ] Favorites system

### Phase 3 (Later)
- [ ] Menu item ratings
- [ ] User reviews integration
- [ ] Nutritional info
- [ ] Allergen warnings

### Phase 4 (Advanced)
- [ ] AI recommendations
- [ ] Dynamic pricing
- [ ] Seasonal menus
- [ ] Multi-language support

---

## 🎓 Learning Path

### Beginner
1. Read this doc
2. Review MenuPage.tsx
3. Understand data flow
4. Modify a component

### Intermediate
1. Add new filter
2. Create custom hook
3. Extend service layer
4. Write unit tests

### Advanced
1. Implement caching strategy
2. Add optimistic updates
3. Create admin panel
4. Build recommendation engine

---

## 📚 Related Patterns

### Repository Pattern
Services act as repositories for data access

### Facade Pattern
`index.ts` provides simplified interface

### Strategy Pattern
Different filter strategies in service

### Observer Pattern
React Query for reactive updates

---

## 🏆 Best Practices

1. **Keep domain isolated** - No external imports
2. **Use barrel exports** - Import from index.ts
3. **Leverage types** - TypeScript everywhere
4. **Cache aggressively** - React Query config
5. **Handle errors gracefully** - Fallback data
6. **Test in layers** - Unit → Integration → E2E
7. **Document changes** - Update this file

---

## 📞 Support

Questions? Check:
1. This architecture doc
2. Domain README
3. Integration guide
4. Component comments

---

**Architecture Version**: 1.0.0
**Pattern**: Domain-Driven Design (DDD)
**Last Updated**: October 2025
