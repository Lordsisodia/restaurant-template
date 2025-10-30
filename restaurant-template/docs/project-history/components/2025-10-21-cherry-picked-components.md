# Cherry-Picked Components from Elementree

## 🎯 Selected Components

### 1. ⭐ Taste Profile / AI Recommendation System

**Location**:
- `src/components/RecommendationForm.tsx`
- `src/components/HomePage/RecommendationsSection.tsx`

**What it does**:
- User fills out taste preferences (text input)
- Dietary checkboxes (vegetarian, vegan, gluten-free, spicy)
- "Get Recommendations" button
- Shows personalized dish recommendations with match % scores
- Beautiful card layout with element colors (earth, water, fire, air)

**Features**:
- Mock AI simulation (1.5s delay for UX)
- Dynamic recommendations based on checkboxes
- Match percentage calculation
- Element-based color coding
- Responsive grid layout

**Preview Panel** (right side):
- "Your Personal Taste Profile" card
- Shows flavor preferences tags
- Shows dietary preferences tags
- Lists recommended dishes with match %
- Animated floating background elements

**Dependencies needed**:
```
- Button, Input, Textarea, Checkbox, Label (from UI)
- Card component
- useToast hook
- Custom theme colors (elementree-water, etc.)
```

---

### 2. 🔥 Elemental Approach Section (Optional but Cool)

**Location**: `src/components/HomePage/ElementalApproachSection.tsx`

**What it does**:
- 4-card grid (Earth, Water, Fire, Air)
- Each card has icon, title, description
- Hover effects with shadow transitions
- Backdrop blur effect on cards
- Staggered animation delays

**Features**:
- Clean philosophy explanation
- Beautiful visual design
- Responsive (4 columns → 2 → 1)
- Icon animations on hover
- Custom element icons (SVG)

---

### 3. 🎨 Hero Section (High Impact)

**Location**: `src/components/HomePage/HeroSection.tsx`

**What it does**:
- Full-screen hero with background image
- Gradient overlay (black/70)
- Animated fade-in content
- Dual CTA buttons (Book Table, Explore Menu)
- Bouncing scroll indicator
- Ken Burns effect (slow zoom on background)

**Features**:
- Smooth opacity + translate animations
- Background image scale animation (8s duration)
- Text shadow on heading
- Decorative circular elements
- Mobile responsive

---

## 📦 Extraction Steps

### Step 1: Copy UI Components

From `src/components/ui/`, copy these files:
```bash
button.tsx
input.tsx
textarea.tsx
checkbox.tsx
label.tsx
card.tsx
toast.tsx (includes toaster.tsx, use-toast.ts)
```

### Step 2: Copy Core Files

**Recommendation System**:
```bash
cp src/components/RecommendationForm.tsx → your_project/src/components/
cp src/components/HomePage/RecommendationsSection.tsx → your_project/src/components/
cp src/components/SectionHeading.tsx → your_project/src/components/
```

**Optional - Elemental Section**:
```bash
cp src/components/HomePage/ElementalApproachSection.tsx → your_project/src/components/
```

**Optional - Hero**:
```bash
cp src/components/HomePage/HeroSection.tsx → your_project/src/components/
```

### Step 3: Copy Theme Colors

From `tailwind.config.ts`, add to your config:

```typescript
theme: {
  extend: {
    colors: {
      'elementree-dark': '#1a1a1a',
      'elementree-light': '#f5f5f5',
      'elementree-earth': '#8b7355',
      'elementree-water': '#4a90a4',
      'elementree-fire': '#d97638',
      'elementree-air': '#e8d4b8',
    },
    fontFamily: {
      serif: ['Playfair Display', 'serif'],
      sans: ['Inter', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fadeIn 0.6s ease-out',
      'float': 'float 3s ease-in-out infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
  },
}
```

### Step 4: Install Dependencies

```bash
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge
npm install sonner # for toast notifications
```

### Step 5: Integration

**Example usage in your page**:

```tsx
import RecommendationsSection from '@/components/RecommendationsSection'
import ElementalApproachSection from '@/components/ElementalApproachSection'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ElementalApproachSection />
      <RecommendationsSection />
    </>
  )
}
```

---

## 🎨 Customization Options

### For Taste Profile:

1. **Replace mock data** with real AI API:
   - Update `handleSubmit` in RecommendationForm.tsx
   - Call OpenAI, Claude, or custom model
   - Parse response into recommendation format

2. **Customize checkboxes**:
   - Add more dietary options (nut-free, dairy-free)
   - Add spice level slider
   - Add price range filter

3. **Adjust match algorithm**:
   - Currently simple mock logic
   - Integrate with real menu database
   - Calculate scores based on ingredients

### For Elemental Section:

1. **Change elements** to your restaurant concept:
   - Keep structure, change icons/text
   - Update colors in theme
   - Adjust descriptions

2. **Add interactive features**:
   - Click to filter menu by element
   - Link to element-specific pages
   - Add video/image backgrounds

### For Hero:

1. **Replace background image**:
   - Update `backgroundImage` URL
   - Use your restaurant photos
   - Consider video background

2. **Adjust CTA buttons**:
   - Change links to your routes
   - Update text
   - Add third CTA if needed

---

## 🎯 Quick Start (Minimal Setup)

**Just want the Taste Profile?**

1. Copy these 3 files:
   - `RecommendationForm.tsx`
   - `RecommendationsSection.tsx`
   - `SectionHeading.tsx`

2. Copy UI folder: `components/ui/`

3. Add theme colors to `tailwind.config.ts`

4. Drop into your page:
   ```tsx
   <RecommendationsSection />
   ```

Done! 🎉

---

## 📊 Component Dependencies Tree

```
RecommendationsSection
├── SectionHeading
└── RecommendationForm
    ├── Button (UI)
    ├── Input (UI)
    ├── Textarea (UI)
    ├── Checkbox (UI)
    ├── Label (UI)
    ├── Card (UI)
    └── useToast (hook + UI)

ElementalApproachSection
├── SectionHeading
├── Card (UI)
└── lucide-react icons

HeroSection
├── Button (UI)
├── lucide-react (ChevronDown)
└── react-router-dom (Link)
```

---

## 🔧 Path Adjustments

The code uses `@/` alias for imports. Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Or find/replace:
- `@/components/` → `./` (or your path)
- `@/domains/shared/hooks/` → `../hooks/` (or your path)

---

## 🎨 Design Tokens

**Colors Used**:
- `elementree-water` (primary) - Used in buttons, badges, matches
- `elementree-earth` - Brown/tan for earth element
- `elementree-fire` - Orange for fire element
- `elementree-air` - Beige for air element
- `elementree-light` - Background (#f5f5f5)
- `elementree-dark` - Text (#1a1a1a)

**Typography**:
- Headers: `font-serif` (Playfair Display)
- Body: `font-sans` (Inter)

**Shadows**:
- Cards: `shadow-lg`, `shadow-xl` on hover
- Smooth transitions: `transition-shadow`

---

## 💡 Pro Tips

1. **Mock data is perfect for prototyping** - Keep it while building, replace later
2. **The taste profile is impressive for demos** - Clients love interactive features
3. **Element colors create unique brand identity** - Consider adapting to your theme
4. **Animations are subtle but polished** - Adds professional feel
5. **Mobile-responsive out of the box** - Works on all devices

---

## 🚀 Next Steps

1. ✅ Copy files listed in Step 1-2
2. ✅ Set up Tailwind theme
3. ✅ Test RecommendationsSection in your app
4. 🔄 Connect to real menu data (optional)
5. 🔄 Integrate AI API for real recommendations (optional)
6. ✨ Customize colors/text for your brand

---

**Estimated Setup Time**: 30-45 minutes
**Estimated Customization Time**: 1-2 hours

**Result**: Beautiful, interactive recommendation system that impresses clients! 🎯
