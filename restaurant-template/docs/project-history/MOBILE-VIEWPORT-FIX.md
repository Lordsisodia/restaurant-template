# Mobile Viewport Horizontal Scroll Fix

**Date Fixed**: 2025-10-25  
**Issue**: Mobile viewport (425x725) was experiencing horizontal scroll with black void on right side
**Status**: ✅ RESOLVED

---

## 🎯 Root Cause

The **Signature Dishes carousel** component was using negative horizontal margins (`-mx-6`) that extended content **beyond the viewport boundaries**, causing the entire page to scroll horizontally.

### Technical Breakdown

```
Container width: 425px
Parent padding: px-6 (24px left + 24px right) = 48px
Negative margin: -mx-6 (-24px left + -24px right) = -48px
Effective extension: Content extends 48px beyond viewport
Result: Page width = 425px + 48px = 473px ❌ OVERFLOW!
```

---

## 🔧 Fixes Applied

### Fix #1: Layout Overflow Protection
**File**: `restaurant-template/src/app/(marketing)/layout.tsx`

```tsx
// BEFORE
<div className="flex min-h-screen flex-col">

// AFTER  
<div className="flex min-h-screen flex-col overflow-x-hidden">
```

**Impact**: Prevents layout from allowing horizontal scroll

---

### Fix #2: Signature Dishes Carousel Containment
**File**: `restaurant-template/src/domains/customer-facing/landing/menu-templates/template-1/components/SignatureDishes.tsx`

**BEFORE:**
```tsx
<section className="mx-auto w-full max-w-5xl px-6 py-10">
  ...
  <div className="sm:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
```

**AFTER:**
```tsx
<section className="w-full py-10 overflow-hidden">
  <div className="mx-auto w-full max-w-5xl px-6">
    <div className="mb-6">
      <h2>Signature Dishes</h2>
      ...
    </div>
  </div>

  {/* Mobile: horizontal snap-scroll carousel */}
  <div className="sm:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6">
    <div className="flex gap-4 pb-4">
      {featured.map((dish) => (
        <div key={dish.id} className="min-w-[85%] snap-center">
```

**Key Changes:**
- ✅ Removed `-mx-6` negative margin
- ✅ Added `overflow-hidden` to section wrapper
- ✅ Restructured padding hierarchy
- ✅ Carousel now contained within proper boundaries

---

### Fix #3: Mobile CTA Cards Stacking
**File**: `restaurant-template/src/domains/customer-facing/landing/hero-templates/shared/CalloutCards.tsx`

```tsx
// BEFORE
<div className="mt-6 flex w-full max-w-2xl gap-3">

// AFTER
<div className="mt-6 flex flex-col sm:flex-row w-full max-w-2xl gap-3">
```

**Impact**: 
- Mobile (< 640px): Cards stack vertically ✅
- Tablet/Desktop: Cards side-by-side ✅
- No overflow from tight spacing

---

### Fix #4: Hero Inner Container Responsive
**File**: `restaurant-template/src/domains/customer-facing/landing/hero-templates/variants/ClassicCenter.tsx`

```tsx
// BEFORE
<div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 pt-24 text-center">

// AFTER
<div className="mx-auto flex min-h-[calc(100vh-5rem)] lg:min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 sm:px-6 pt-20 sm:pt-24 text-center">
```

**Improvements:**
- Mobile: `min-h-[calc(100vh-5rem)]` accounts for header
- Mobile: `px-4` (reduced from `px-6`)
- Mobile: `pt-20` (reduced from `pt-24`)
- Desktop: Maintains original spacing

---

### Fix #5: Global Overflow Protection
**File**: `restaurant-template/src/app/globals.css`

```css
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--color-background);
  color: var(--color-foreground);
  overflow-x: hidden; /* ← ADDED */
}
```

**Impact**: Global safety net to prevent **any** horizontal scroll

---

## 🛡️ Prevention Guidelines

### ⚠️ DO NOT Use These Patterns on Mobile:

```tsx
// ❌ DANGEROUS: Negative horizontal margins
<div className="-mx-6 ...">

// ❌ DANGEROUS: Fixed widths wider than viewport
<div className="w-[500px] ...">  // On 425px viewport!

// ❌ DANGEROUS: Min-widths without max constraints
<div className="min-w-[90%] ...">  // In flex containers
```

### ✅ Safe Mobile Patterns:

```tsx
// ✅ SAFE: Use overflow-hidden on parent
<section className="overflow-hidden">
  <div className="overflow-x-auto px-6">
    {/* Scrollable content */}
  </div>
</section>

// ✅ SAFE: Use responsive max-widths
<div className="w-full max-w-full px-4">

// ✅ SAFE: Stack on mobile, flex on desktop
<div className="flex flex-col sm:flex-row gap-3">

// ✅ SAFE: Responsive padding
<div className="px-4 sm:px-6 lg:px-8">
```

---

## 🧪 Testing Checklist

Before deploying mobile layouts:

- [ ] Test on **425x725** viewport (DevTools)
- [ ] **Disable** horizontal scroll on `<body>` and layout
- [ ] Check for **negative margins** on containers
- [ ] Verify **carousels** are self-contained
- [ ] Test **CTA buttons** stack properly
- [ ] Check **images** have proper constraints
- [ ] Use **`overflow-hidden`** on parent containers
- [ ] Test on **actual mobile devices** (not just DevTools)

---

## 📊 Before vs After

| Issue | Before | After |
|-------|--------|-------|
| Horizontal Scroll | ❌ Can scroll right → black void | ✅ No horizontal scroll |
| Carousel | ❌ Breaks page layout | ✅ Self-contained, works perfectly |
| CTA Buttons | ❌ Too tight on mobile | ✅ Stacked vertically, easy to tap |
| Hero Spacing | ❌ Cramped, awkward | ✅ Optimized padding |
| Page Width | ❌ Extends beyond 425px | ✅ Perfect fit at 425px |

---

## 🔍 Additional Fixes Applied

### Navigation Header Off-Screen Issue
**File**: All hero variant files

```tsx
// BEFORE: Hero pushed header off-screen on mobile
<section className="... -mt-[80px]">

// AFTER: Negative margin only on desktop
<section className="... lg:-mt-[80px]">
```

**Files Updated:**
- `variants/ClassicCenter.tsx`
- `variants/MinimalCenter.tsx`
- `variants/LogoCenter.tsx`
- `variants/SplitLeft.tsx`
- `variants/GradientWords.tsx`
- `template-1/components/HeroSection.tsx`
- `template-1/HeroSection.tsx`

---

## 💡 Lessons Learned

1. **Negative margins are dangerous** on mobile viewports
2. **Always use `overflow-hidden`** on containers that might overflow
3. **Test carousel patterns** thoroughly on real mobile sizes
4. **Stack elements vertically** on mobile, not horizontally
5. **Responsive spacing** is critical (use `px-4 sm:px-6` patterns)
6. **Multi-layer protection** (body + layout + section) prevents edge cases

---

## 📝 Quick Reference

**If you see horizontal scroll on mobile:**

1. Check for `-mx-` negative margins
2. Add `overflow-x-hidden` to layout
3. Add `overflow-hidden` to section wrappers
4. Ensure carousels use `overflow-x-auto` internally
5. Check for fixed widths > viewport width
6. Verify responsive padding (`px-4 sm:px-6`)

---

**Last Updated**: 2025-10-25  
**Next Review**: Before next major layout changes
