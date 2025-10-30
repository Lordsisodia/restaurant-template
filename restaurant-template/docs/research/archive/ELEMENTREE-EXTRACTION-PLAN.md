# Elementree Component Extraction Plan

## Project Overview
**Source**: https://github.com/samsiso/elementree
**Location**: `/Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/elementree-reference`

## Tech Stack Analysis

### Elementree Tech Stack
- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom theme
- **UI Library**: Shadcn/ui (50+ Radix UI components)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Auth**: Clerk authentication
- **Forms**: React Hook Form + Zod validation
- **State**: TanStack Query (React Query)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate

### Perfect Alignment for Restaurant Site ✅
All technologies align with modern restaurant web app requirements!

---

## 🎯 Priority 1: Core UI Components (Copy First)

### Location: `src/components/ui/` (52 components)
These are Shadcn/ui components - ready to use immediately:

#### Essential Components
- ✅ **button.tsx** - Multiple variants (outline, ghost, destructive, etc.)
- ✅ **card.tsx** - Menu item cards, feature cards
- ✅ **badge.tsx** - Dietary tags (vegan, gluten-free, etc.)
- ✅ **dialog.tsx** - Modals for reservations, order details
- ✅ **dropdown-menu.tsx** - Navigation, user menus
- ✅ **tabs.tsx** - Menu categories
- ✅ **form.tsx** - Contact, reservation forms
- ✅ **input.tsx** - Form fields
- ✅ **label.tsx** - Form labels
- ✅ **toast.tsx** - Notifications
- ✅ **sheet.tsx** - Mobile navigation drawer
- ✅ **scroll-area.tsx** - Long menu lists
- ✅ **separator.tsx** - Visual separators

#### Nice-to-Have Components
- **accordion.tsx** - FAQ sections
- **alert-dialog.tsx** - Confirmation dialogs
- **avatar.tsx** - User profiles
- **calendar.tsx** - Reservation date picker
- **carousel.tsx** - Image galleries
- **progress.tsx** - Order tracking
- **slider.tsx** - Price filters
- **tooltip.tsx** - Helpful hints

**Action**: Copy entire `src/components/ui/` folder to our project

---

## 🍽️ Priority 2: Restaurant-Specific Components

### HomePage Components (`src/components/HomePage/`)

#### HeroSection.tsx ⭐⭐⭐
**Features**:
- Full-screen hero with background image
- Smooth scroll animations
- Gradient overlays
- CTA buttons (Book Table, Explore Menu)
- Animated scroll indicator
- Ken Burns effect (slow zoom)

**What to Extract**:
```typescript
- Fade-in animations on mount
- Background image with overlay
- Dual CTA button layout
- Bouncing chevron scroll indicator
```

#### MenuHighlightsSection.tsx ⭐⭐⭐
**Features**:
- Showcases featured menu items
- Grid layout with hover effects
- Element-based categorization (earth, water, fire, air)

#### AboutSection.tsx ⭐⭐
**Features**:
- Restaurant story
- Image + text layout
- Brand messaging

#### CallToActionSection.tsx ⭐⭐⭐
**Features**:
- Conversion-focused section
- Bold buttons
- Urgency messaging

#### RecommendationsSection.tsx ⭐⭐
**Features**:
- Personalized dish recommendations
- AI-powered suggestions

---

### Menu Components (`src/components/menu/`)

#### MenuItemCard.tsx ⭐⭐⭐
**Critical Component!**
```typescript
Features:
- Image + description layout
- Price display
- Dietary badges (vegan, vegetarian, gluten-free, spicy)
- Calorie information
- Element icons (fire, water, earth, air)
- Hover effects with scale animation
- Responsive (side-by-side on desktop, stacked on mobile)
```

**Database Schema Required**:
```sql
menu_items {
  id, name, description, price, image_url,
  category, is_vegetarian, is_vegan,
  is_gluten_free, is_spicy, calories,
  popular_score
}
```

#### MenuCategoryTabs.tsx ⭐⭐⭐
**Features**:
- Tab navigation for menu categories
- Smooth transitions
- Active state styling

#### MenuHeader.tsx ⭐⭐
**Features**:
- Page title
- Search functionality
- Filter toggles

#### MenuAboutSection.tsx ⭐
**Features**:
- Restaurant philosophy
- Ingredient sourcing story

#### Loading & Error States
- **MenuLoadingState.tsx** - Skeleton loaders
- **MenuItemSkeleton.tsx** - Individual card skeleton
- **MenuErrorAlert.tsx** - Error messaging
- **MenuEmptyState.tsx** - No results state

**Action**: Extract MenuItemCard + skeleton states first, then category tabs

---

### Review Components (`src/components/reviews/`)

#### ReviewCard.tsx ⭐⭐⭐
**Features**:
- User avatar
- Star rating display
- Review text
- Date formatting
- Helpful votes

#### ReviewForm.tsx ⭐⭐⭐
**Features**:
- Star rating input
- Text area
- Image upload
- Form validation (Zod)
- Submit handling

#### ReviewFilters.tsx ⭐⭐
**Features**:
- Filter by rating
- Sort options (newest, highest rated)
- Dietary filters

#### ReviewPagination.tsx ⭐
**Features**:
- Page navigation
- Results count

**Action**: Full review system extraction - critical for credibility

---

## 🏗️ Priority 3: Layout Components

### Core Layout (`src/components/`)

#### Navbar.tsx ⭐⭐⭐
**Features**:
- Logo
- Navigation links
- User menu
- Responsive hamburger menu
- Scroll behavior (transparent → solid)
- Sticky positioning

#### Footer.tsx ⭐⭐⭐
**Features**:
- Multiple columns (About, Menu, Hours, Contact)
- Social media links
- Newsletter signup
- Copyright notice
- Beautiful spacing and typography

#### MobileNavigation.tsx ⭐⭐
**Features**:
- Bottom tab bar for mobile
- Icon-based navigation
- Active state

#### Layout.tsx ⭐⭐⭐
**Features**:
- Wrapper component
- Header + Footer + Content
- Consistent spacing

**Action**: Extract complete layout system for consistent navigation

---

## 📄 Priority 4: Full Pages

### Essential Pages

#### HomePage.tsx ⭐⭐⭐
**Structure**:
```typescript
<Layout>
  <HeroSection />
  <AboutSection />
  <MenuHighlightsSection />
  <ElementalApproachSection />
  <RecommendationsSection />
  <CallToActionSection />
</Layout>
```

#### MenuPage.tsx ⭐⭐⭐
**Features**:
- Category tabs
- Menu item grid
- Loading states
- Error handling
- Empty states

#### ReservationsPage.tsx ⭐⭐⭐
**Features**:
- Date picker (react-day-picker)
- Time slot selection
- Party size selection
- Special requests
- Confirmation flow

#### ReviewsPage.tsx ⭐⭐
**Features**:
- Review list
- Filters
- Pagination
- Add review form

#### ContactPage.tsx ⭐⭐
**Features**:
- Contact form
- Map integration
- Address/hours
- Social links

---

## 🗄️ Priority 5: Backend & Database

### Supabase Integration (`src/integrations/supabase/`)

#### Database Tables Needed
```sql
-- Core tables
menu_items
categories
reservations
reviews
orders
order_items

-- User & Loyalty (optional for MVP)
user_profiles
loyalty_points
loyalty_rewards
user_rewards

-- Settings (optional)
app_settings
billing
```

#### Key Hooks (`src/hooks/`)
- **use-menu.ts** - Menu items query
- **use-reviews.ts** - Reviews CRUD
- **use-reservations.ts** - Reservation management

**Action**: Copy Supabase client setup + type definitions

---

## 🎨 Priority 6: Styling & Theme

### Tailwind Configuration (`tailwind.config.ts`)

**Custom Theme**:
```typescript
colors: {
  elementree-dark: "#1a1a1a",
  elementree-light: "#f5f5f5",
  elementree-earth: "#8b7355",
  elementree-water: "#4a90a4",
  elementree-fire: "#d97638",
  elementree-air: "#e8d4b8"
}

fontFamily: {
  serif: ["Playfair Display", "serif"],
  sans: ["Inter", "sans-serif"]
}

boxShadow: {
  elegant: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
}
```

**Custom Animations**:
- `animate-fade-in`
- `animate-slide-up`
- Card hover effects
- Button transitions

**Action**: Copy custom theme colors + animations

---

## 🔐 Priority 7: Authentication (Modify)

### Current: Clerk Auth
**Files**:
- `src/utils/auth.tsx`
- `src/components/ProtectedRoute.tsx`
- Auth pages (SignIn, SignUp, etc.)

### Decision Point
**Option A**: Keep Clerk (easiest)
- Pro: Already integrated
- Con: Additional service cost

**Option B**: Switch to Supabase Auth (recommended)
- Pro: Unified backend, lower cost
- Con: Need to refactor auth logic

**Action**: Evaluate client requirements

---

## 📦 Extraction Strategy

### Phase 1: Foundation (Day 1)
1. ✅ Copy `components/ui/` folder (all Shadcn components)
2. ✅ Copy `tailwind.config.ts` (custom theme)
3. ✅ Copy `components.json` (Shadcn config)
4. ✅ Set up Supabase client (`src/integrations/supabase/`)
5. ✅ Copy utility functions (`src/utils/`)

### Phase 2: Core Features (Day 2-3)
1. ✅ MenuItemCard + menu components
2. ✅ Layout (Navbar, Footer, MobileNav)
3. ✅ HeroSection
4. ✅ MenuPage with tabs & loading states

### Phase 3: User Features (Day 4-5)
1. ✅ ReviewCard + review system
2. ✅ ReservationsPage
3. ✅ Auth flow (decide on provider)

### Phase 4: Polish (Day 6-7)
1. ✅ About & Contact pages
2. ✅ Loading states & error handling
3. ✅ Responsive testing
4. ✅ Performance optimization

---

## 🚀 Quick Wins (Start Here!)

### Immediate Extractions
1. **MenuItemCard.tsx** - Core menu display
2. **HeroSection.tsx** - Landing page impact
3. **Navbar.tsx + Footer.tsx** - Navigation structure
4. **Button.tsx + Card.tsx** - Foundation components

### Demo-Ready MVP
```
HomePage with:
- HeroSection ✨
- MenuHighlightsSection (4-6 items)
- CallToAction

MenuPage with:
- MenuItemCard grid
- Simple category filter
```

---

## 📋 Dependencies to Install

```bash
npm install @radix-ui/react-* # (multiple packages - see package.json)
npm install @supabase/supabase-js
npm install @tanstack/react-query
npm install react-router-dom
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react
npm install date-fns
npm install class-variance-authority clsx tailwind-merge
npm install sonner # toast notifications
```

**Or** copy entire `package.json` and run:
```bash
npm install
```

---

## 🎯 Success Metrics

### Must-Have Features
- ✅ Responsive menu display with categories
- ✅ Beautiful hero section
- ✅ Working navigation
- ✅ Supabase integration
- ✅ Basic reservations

### Nice-to-Have Features
- ✅ Review system
- ✅ User authentication
- ✅ Loyalty points
- ✅ Order tracking

---

## 🔗 Key File Paths Reference

### Components
```
elementree-reference/src/components/
├── HomePage/
│   ├── HeroSection.tsx
│   ├── MenuHighlightsSection.tsx
│   ├── AboutSection.tsx
│   └── CallToActionSection.tsx
├── menu/
│   ├── MenuItemCard.tsx ⭐
│   ├── MenuCategoryTabs.tsx
│   └── MenuHeader.tsx
├── reviews/
│   ├── ReviewCard.tsx
│   └── ReviewForm.tsx
├── ui/ (52 files) ⭐
├── Navbar.tsx ⭐
├── Footer.tsx ⭐
└── Layout.tsx ⭐
```

### Pages
```
elementree-reference/src/pages/
├── HomePage.tsx
├── MenuPage.tsx ⭐
├── ReservationsPage.tsx
├── ReviewsPage.tsx
└── ContactPage.tsx
```

### Backend
```
elementree-reference/src/
├── integrations/supabase/
│   ├── client.ts
│   └── types.ts
├── hooks/
│   ├── use-menu.ts
│   └── use-reviews.ts
└── utils/
```

---

## 💡 Notes & Recommendations

### Color Theme
The "elemental" theme (earth, water, fire, air) is unique but can be easily adapted:
- Keep it if client likes the concept
- Or replace with restaurant-specific brand colors

### Database Structure
Elementree has a **comprehensive schema** with:
- Menu management
- Reviews
- Reservations
- Orders
- Loyalty program

**Recommendation**: Start with just menu + reservations, add features incrementally

### Images
Elementree uses placeholder images from `/lovable-uploads/`
**Action**: Replace with client's actual food photography

### Mobile-First
All components are responsive - great starting point!

---

## ⚠️ Potential Gotchas

1. **Clerk Auth**: Need to decide if keeping or switching to Supabase Auth
2. **Custom fonts**: Playfair Display (serif) - ensure license/hosting
3. **Image optimization**: Add lazy loading for menu images
4. **SEO**: Add meta tags, structured data for restaurant
5. **Loading states**: Comprehensive but might need customization

---

## 🎉 Why This is a Goldmine

✅ **Production-ready components** - Not prototypes
✅ **Restaurant-specific** - Perfect domain match
✅ **Modern tech stack** - Latest best practices
✅ **Responsive design** - Mobile-first approach
✅ **Complete UI library** - 52 Shadcn components
✅ **Full features** - Menu, reservations, reviews, auth
✅ **Supabase backend** - Scalable database
✅ **Beautiful styling** - Professional design system

**Estimated time savings: 2-3 weeks of development** 🚀

---

## Next Steps

1. Review this plan with team/client
2. Decide on auth provider (Clerk vs Supabase)
3. Set up new project or adapt existing one
4. Start with Phase 1 (Foundation)
5. Iterate on design based on brand requirements

---

**Last Updated**: October 22, 2025
**Analyzed By**: SISO SuperClaude
**Repository**: elementree-reference/
