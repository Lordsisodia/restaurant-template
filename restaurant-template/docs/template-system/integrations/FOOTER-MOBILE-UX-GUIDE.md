# 📱 Mobile-First Footer UX Guide
**Designing for Thumbs, Not Cursors**

---

## 🎯 The Mobile Context for Restaurants

### User Journey on Mobile:
1. **Customer discovers restaurant** (Google Maps, Instagram, friend recommendation)
2. **Scrolls through menu/photos** (evaluating options)
3. **Reaches footer** (decision time: order or leave)
4. **Needs action** → Call, Order, Get Directions, or Save for Later

**Footer Goal:** Make the next action obvious and effortless

---

## 📏 Mobile Touch Zones (Based on How Users Hold Phones)

```
┌─────────────────────┐
│   ❌ HARD TO REACH  │  Top 25% of screen
│    (Header area)    │  User has to shift grip
├─────────────────────┤
│                     │
│   ✅ THUMB ZONE     │  Middle 50% of screen
│   (Sweet spot)      │  Easy one-handed reach
│                     │
├─────────────────────┤
│   ⚠️  STRETCH ZONE  │  Bottom 25%
│  (Footer + Nav Bar) │  Requires thumb extension
└─────────────────────┘
```

### Implications for Footer Design:
- **Primary CTAs**: Place in upper-middle of footer (first thing user sees)
- **Secondary info**: Can go lower (copyright, legal)
- **Navigation**: Keep at very bottom (users expect it there)

---

## 🎨 Visual Hierarchy for Mobile

### Information Density Rules:
```
Desktop Footer:      3-4 columns × many rows = 12-16 info blocks
Mobile Footer:       1 column × stacked sections = same info, easier to scan
```

### Reading Pattern on Mobile:
```
👁️ F-Pattern (Desktop) → 🔻 Z-Pattern (Mobile)

Desktop:                Mobile:
┌─────┬─────┬─────┐     ┌─────────────┐
│ ▓▓▓ │ ▓▓  │     │     │ ▓▓▓▓▓▓▓     │  ← Logo
├─────┼─────┼─────┤     ├─────────────┤
│     │     │     │     │ ▓▓▓▓▓▓▓▓▓   │  ← Primary CTA
└─────┴─────┴─────┘     ├─────────────┤
                         │ ▓▓▓▓▓       │  ← Secondary CTA
Users skim rows →        ├─────────────┤
                         │ ▓▓▓         │  ← Tertiary info
                         └─────────────┘

                         Users scan down ↓
```

---

## 🖱️ Tap Target Sizes (Official Guidelines)

### Platform Standards:
| Platform | Minimum | Recommended | Ideal |
|----------|---------|-------------|-------|
| **iOS (Apple HIG)** | 44×44 px | 48×48 px | 56×56 px |
| **Android (Material)** | 48×48 px | 56×56 px | 64×64 px |
| **Web (WCAG AAA)** | 44×44 px | 48×48 px | 56×56 px |

### Practical Application:
```tsx
/* ❌ Too Small - Hard to tap */
<button className="h-8 w-8 p-1"> {/* 32×32 px */}
  <Phone className="h-4 w-4" />
</button>

/* ✅ Just Right - Easy to tap */
<button className="h-12 w-12 p-3"> {/* 48×48 px */}
  <Phone className="h-5 w-5" />
</button>

/* ⭐ Perfect - Forgiving touch area */
<button className="h-14 w-14 p-4"> {/* 56×56 px */}
  <Phone className="h-6 w-6" />
</button>
```

### Spacing Between Tap Targets:
**Minimum:** 8px
**Recommended:** 12-16px
**Why:** Prevents mis-taps (fat finger problem)

```tsx
/* ❌ Too Close */
<div className="flex gap-2"> {/* 8px gap */}
  <Button>Call</Button>
  <Button>WhatsApp</Button>
</div>

/* ✅ Perfect */
<div className="flex gap-4"> {/* 16px gap */}
  <Button>Call</Button>
  <Button>WhatsApp</Button>
</div>
```

---

## 📱 Safe Area Insets (iPhone X+ and Android Gesture Nav)

### The Problem:
Modern phones have rounded corners, notches, and gesture bars that overlap content.

```
iPhone with Notch:
┌──────▼──────┐
│    Notch    │  ← safe-area-inset-top
├─────────────┤
│             │
│   Content   │
│             │
├─────────────┤
│   Home Bar  │  ← safe-area-inset-bottom
└─────────────┘
```

### The Solution:
```css
/* Always add safe area padding to footer */
.footer {
  padding-bottom: calc(24px + env(safe-area-inset-bottom));
}

/* For fixed bottom bars (like QuickActionsBar) */
.quick-actions {
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Real Example:
```tsx
<footer
  className="pb-6 md:pb-12"
  style={{
    paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))'
  }}
>
  {/* Footer content */}
</footer>
```

**Result:**
- iPhone X: Adds 34px bottom padding
- iPhone 14 Pro: Adds 34px bottom padding
- Android with gesture nav: Adds 16px bottom padding
- Desktop/older phones: Adds 0px (graceful fallback)

---

## 🎨 Color & Contrast for Mobile

### Readability in Sunlight:
Mobile users are often outdoors. Your footer needs to work in:
- ☀️ **Direct sunlight** (beach, outdoor seating)
- 🌙 **Low light** (evening dining, dark mode)
- 🚗 **Moving vehicles** (checking menu while in transit)

### Contrast Ratios (WCAG 2.1):
```
Text Size    | AA (Minimum) | AAA (Enhanced)
─────────────┼──────────────┼───────────────
Normal text  |    4.5:1     |     7:1
Large text   |    3:1       |    4.5:1
```

### Practical Tips:
```tsx
/* ❌ Low Contrast - Hard to read in sunlight */
<p className="text-gray-400">Call us at +62 811-1234-5678</p>

/* ✅ Good Contrast */
<p className="text-gray-700 dark:text-gray-300">
  Call us at +62 811-1234-5678
</p>

/* ⭐ Excellent - Uses semantic colors */
<a href="tel:+628111234567" className="text-primary">
  Call us at +62 811-1234-5678
</a>
```

---

## 🔠 Typography for Mobile

### Font Size Hierarchy:
```tsx
/* Headers */
text-base    // 16px - minimum for readability
font-semibold
uppercase
tracking-wider

/* Body text */
text-sm      // 14px - comfortable reading
leading-relaxed  // 1.625 line height

/* Labels/metadata */
text-xs      // 12px - absolute minimum
text-muted-foreground
```

### Line Length (Measure):
**Ideal:** 45-75 characters per line
**Mobile:** Usually auto-limited by screen width, but:

```tsx
/* ❌ Too Wide - Hard to track lines */
<p className="max-w-full">
  Very long paragraph that spans the entire width...
</p>

/* ✅ Optimal - Easy to read */
<p className="max-w-md"> {/* ~448px = 50-60 chars */}
  Comfortably readable paragraph width...
</p>
```

---

## 🧭 Navigation Patterns for Mobile Footer

### Option 1: Vertical List (Best for 5+ items)
```tsx
<nav className="space-y-2">
  <Link href="/menu">Menu</Link>
  <Link href="/specials">Specials</Link>
  <Link href="/about">About</Link>
  <Link href="/contact">Contact</Link>
  <Link href="/reservations">Reservations</Link>
</nav>
```
**Pros:** Easy to scan, large tap targets
**Cons:** Takes vertical space

---

### Option 2: Horizontal Wrap (Best for 3-5 items)
```tsx
<nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
  <Link href="/menu">Menu</Link>
  <Link href="/specials">Specials</Link>
  <Link href="/about">About</Link>
</nav>
```
**Pros:** Compact, fits many items
**Cons:** Can look cluttered with 6+ items

---

### Option 3: Grouped Sections (Best for 10+ items)
```tsx
<div className="space-y-6">
  <div>
    <h4 className="mb-2 text-xs font-semibold uppercase">Menu</h4>
    <nav className="space-y-1">
      <Link href="/menu/appetizers">Appetizers</Link>
      <Link href="/menu/mains">Main Dishes</Link>
    </nav>
  </div>
  <div>
    <h4 className="mb-2 text-xs font-semibold uppercase">Info</h4>
    <nav className="space-y-1">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </div>
</div>
```
**Pros:** Organized, scannable
**Cons:** Tall footer

---

## 🎯 Call-to-Action Button Design

### Anatomy of a Perfect Mobile CTA:
```tsx
<a
  href="tel:+628111234567"
  className="
    flex items-center justify-center gap-3    // Layout
    w-full h-14                                // Size (56px height)
    px-6 py-4                                  // Padding
    rounded-full                               // Shape
    bg-primary text-primary-foreground         // Colors
    font-semibold text-base                    // Typography
    shadow-lg shadow-primary/20                // Depth
    hover:bg-primary/90                        // Interaction
    active:scale-95                            // Feedback
    transition-all duration-200                // Animation
  "
>
  <Phone className="h-5 w-5" />
  <span>Call Now</span>
</a>
```

### CTA Priority System:
```
Primary CTA:     Full width, solid color, above the fold
Secondary CTA:   Full width or half, outline, mid-footer
Tertiary:        Text link, bottom of footer
```

### Example Layout:
```tsx
<div className="space-y-3">
  {/* Primary: Order Now */}
  <Button size="lg" className="w-full">
    <ShoppingCart /> Order Now
  </Button>

  {/* Secondary: Call or Reserve */}
  <div className="grid grid-cols-2 gap-3">
    <Button size="lg" variant="outline">
      <Phone /> Call
    </Button>
    <Button size="lg" variant="outline">
      <Calendar /> Reserve
    </Button>
  </div>

  {/* Tertiary: View menu link */}
  <Link href="/menu" className="text-sm text-center block">
    View Full Menu →
  </Link>
</div>
```

---

## 🖼️ Images & Icons on Mobile

### Icon Sizes:
```tsx
/* Social media icons */
h-5 w-5      // 20px - for buttons
h-4 w-4      // 16px - inline with text

/* Feature icons (location, phone) */
h-6 w-6      // 24px - primary
h-5 w-5      // 20px - secondary

/* Logo */
h-12 w-12    // 48px - footer brand
h-8 w-8      // 32px - if you have limited space
```

### Image Optimization:
```tsx
/* ❌ Unoptimized - Slows page load */
<img src="/logo.png" alt="Logo" />

/* ✅ Optimized with Next.js Image */
<Image
  src="/logo.png"
  alt="Logo"
  width={48}
  height={48}
  loading="lazy"      // Don't load until user scrolls to footer
  quality={75}        // Balance quality vs. file size
/>
```

### Logo Placement:
```tsx
/* Centered (matches stacked layout) */
<div className="flex justify-center mb-6">
  <div className="rounded-full bg-primary/10 p-6">
    <Image src="/logo.svg" width={48} height={48} />
  </div>
</div>
```

---

## 📊 Performance Considerations

### Footer Should Load Last:
```tsx
/* Lazy load footer */
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-96 bg-muted/50" />, // Skeleton
});

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Defer Non-Critical Content:
```tsx
/* Load social media SDKs only when footer is visible */
import { useInView } from 'react-intersection-observer';

export function SocialMediaSection() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {inView && (
        <div className="social-media-widgets">
          {/* Facebook/Instagram widgets here */}
        </div>
      )}
    </div>
  );
}
```

---

## 🧪 Testing Checklist for Mobile Footer

### Device Testing:
- [ ] iPhone SE (smallest modern screen - 375×667)
- [ ] iPhone 12/13/14 standard (390×844)
- [ ] iPhone 14 Pro Max (430×932)
- [ ] Samsung Galaxy S21 (360×800)
- [ ] Pixel 7 (412×915)

### Orientation Testing:
- [ ] Portrait mode (primary)
- [ ] Landscape mode (ensure no horizontal scroll)

### Browser Testing:
- [ ] Safari iOS (uses WebKit)
- [ ] Chrome Android (uses Blink)
- [ ] Samsung Internet (popular in Asia)

### Interaction Testing:
- [ ] Tap all buttons (no mis-taps)
- [ ] Verify tel: links open phone dialer
- [ ] Verify mailto: links open email app
- [ ] Verify maps links open navigation app
- [ ] Test with gloves (winter markets)
- [ ] Test with wet fingers (post-meal)

### Performance Testing:
- [ ] Footer loads within 2 seconds
- [ ] No layout shift when footer appears
- [ ] Images are optimized (WebP + lazy load)
- [ ] No janky animations

### Accessibility Testing:
- [ ] Screen reader announces all buttons
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators are visible
- [ ] Touch targets are 44px minimum

---

## 🎨 Responsive Breakpoints Strategy

### Mobile-First Approach:
```tsx
/* Base styles = Mobile (default) */
<div className="px-4 py-6">

/* Tablet = md: (768px+) */
<div className="px-4 py-6 md:px-6 md:py-8">

/* Desktop = lg: (1024px+) */
<div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
```

### Footer Specific:
```tsx
<footer className="
  /* Mobile: Single column, stacked */
  flex flex-col items-center gap-6 px-4 py-6

  /* Tablet: Slightly wider, more spacing */
  md:gap-8 md:px-6 md:py-8

  /* Desktop: Multi-column, lots of space */
  lg:grid lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-12
">
```

---

## 💡 Mobile UX Best Practices (Summary)

### DO's ✅
1. **Design for one-handed use** (center important actions)
2. **Make tap targets 48×48px minimum**
3. **Use large, readable fonts** (14px+ for body)
4. **Add spacing between buttons** (16px+ gaps)
5. **Respect safe area insets** (iOS notch/Android gestures)
6. **Load footer content lazily** (performance)
7. **Test on real devices** (not just simulator)
8. **Use system fonts** (faster loading)
9. **Optimize images** (WebP, lazy load)
10. **Provide instant feedback** (active states)

### DON'Ts ❌
1. **Don't make users zoom** (font too small)
2. **Don't use hover states** (no cursor on mobile)
3. **Don't auto-play videos** (data usage)
4. **Don't show modals on load** (annoying)
5. **Don't hide important info in carousels** (hidden = doesn't exist)
6. **Don't use tiny icons** (minimum 20px)
7. **Don't create horizontal scroll** (always full-width)
8. **Don't use complex forms** (keep it simple)
9. **Don't block safe areas** (notch, home bar)
10. **Don't skip touch testing** (real hands, not mouse)

---

## 📱 Mobile-First CSS Utilities (Tailwind)

### Quick Reference:
```css
/* Spacing */
p-4         /* 16px padding - mobile default */
p-6         /* 24px padding - tablet */
p-8         /* 32px padding - desktop */

/* Touch-friendly sizes */
h-12        /* 48px - minimum tap target */
h-14        /* 56px - recommended */
h-16        /* 64px - extra comfortable */

/* Typography */
text-sm     /* 14px - body text */
text-base   /* 16px - important text */
text-lg     /* 18px - headers */

/* Responsive visibility */
hidden md:block    /* Hide on mobile, show on tablet+ */
block md:hidden    /* Show on mobile, hide on tablet+ */

/* Grid layouts */
grid-cols-1         /* Mobile: single column */
md:grid-cols-2      /* Tablet: 2 columns */
lg:grid-cols-3      /* Desktop: 3 columns */

/* Safe areas (iOS/Android) */
pb-safe              /* Custom utility for safe-area-inset-bottom */
```

---

## 🚀 Performance Budget for Mobile

### Target Metrics:
| Metric | Target | Why |
|--------|--------|-----|
| **Footer HTML** | < 10 KB | Fast rendering |
| **Footer CSS** | < 5 KB | No render blocking |
| **Footer Images** | < 50 KB total | Quick load on 3G |
| **Footer JS** | < 15 KB | Optional interactions |
| **Time to Interactive** | < 3s | User doesn't wait |

### Monitoring Tools:
- Chrome DevTools → Network tab (throttle to Slow 3G)
- Lighthouse → Performance audit
- WebPageTest → Mobile test (Indonesia location)

---

## 🌏 Indonesian Market Specifics

### Network Conditions:
- **Average speed:** 10-20 Mbps (slower than US/EU)
- **Common plans:** 2-10 GB/month (data-conscious)
- **Peak hours:** 12-2pm (lunch), 6-9pm (dinner)

### User Behavior:
- **Primary device:** Smartphone (90%+ of traffic)
- **Preferred apps:** WhatsApp > Phone > Email
- **Payment:** GoPay, OVO, QRIS (not credit cards)
- **Discovery:** Instagram, Google Maps, TikTok

### Design Implications:
1. **Optimize for slow connections** (compress images)
2. **Prioritize WhatsApp** over email forms
3. **Show local payment methods** (GoPay, OVO)
4. **Include delivery platform links** (GoFood, GrabFood)

---

## 📚 Resources & References

### Official Guidelines:
- [Apple Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures)
- [Material Design - Touch Targets](https://m3.material.io/foundations/accessible-design/accessibility-basics)
- [WCAG 2.1 - Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

### Tools:
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Safe Area Visualizer](https://devtools.glitch.me/safe-area/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Ready to Build?**
Say **"Implement Phase 1"** and I'll create the mobile-optimized restaurant footer! 🚀📱
