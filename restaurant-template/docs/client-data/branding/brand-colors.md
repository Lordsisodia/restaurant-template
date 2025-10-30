# Draco Coffee and Eatery - Brand Colors & Design System

## Primary Color Scheme

### Main Theme
- **Background:** Black (#000000)
- **Text:** White (#FFFFFF)
- **Style:** High contrast, modern, bold

## Color Palette

```css
:root {
  /* Primary Colors */
  --color-primary-bg: #000000;      /* Black background */
  --color-primary-text: #FFFFFF;    /* White text */

  /* Accent Colors (to be refined) */
  --color-accent: #D4AF37;          /* Gold/Coffee accent suggestion */
  --color-accent-hover: #C5A028;    /* Darker gold for hover states */

  /* Semantic Colors */
  --color-success: #10B981;         /* Green for success messages */
  --color-warning: #F59E0B;         /* Amber for warnings */
  --color-error: #EF4444;           /* Red for errors */

  /* Neutral Shades */
  --color-gray-900: #111111;        /* Darkest gray */
  --color-gray-800: #1F1F1F;        /* Dark gray */
  --color-gray-700: #2D2D2D;        /* Medium dark gray */
  --color-gray-600: #404040;        /* Medium gray */
  --color-gray-500: #737373;        /* Mid gray */
  --color-gray-400: #A3A3A3;        /* Light gray */
  --color-gray-300: #D4D4D4;        /* Lighter gray */
  --color-gray-200: #E5E5E5;        /* Very light gray */
  --color-gray-100: #F5F5F5;        /* Almost white */

  /* Coffee-inspired accents */
  --color-coffee-dark: #3E2723;     /* Dark brown */
  --color-coffee-medium: #6D4C41;   /* Medium brown */
  --color-coffee-light: #A1887F;    /* Light brown */
  --color-cream: #FFF8E7;           /* Cream/beige */
}
```

## Typography

```css
:root {
  /* Font Families (suggestions - TBD with client) */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-heading: 'Poppins', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

## Spacing System

```css
:root {
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
}
```

## Border Radius

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;  /* Fully rounded */
}
```

## Design Principles

### Visual Hierarchy
1. **Bold Contrast** - Black background creates dramatic impact
2. **Clean Typography** - White text ensures perfect readability
3. **Strategic Accents** - Use gold/coffee tones sparingly for emphasis
4. **Whitespace** - Let the black breathe, don't overcrowd

### Component Styling

#### Buttons
```css
/* Primary Button */
.btn-primary {
  background: #FFFFFF;
  color: #000000;
  border: 2px solid #FFFFFF;
}

.btn-primary:hover {
  background: transparent;
  color: #FFFFFF;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  border: 2px solid #FFFFFF;
}

.btn-secondary:hover {
  background: #FFFFFF;
  color: #000000;
}
```

#### Cards
```css
.card {
  background: #1F1F1F;
  border: 1px solid #404040;
  color: #FFFFFF;
}
```

#### Input Fields
```css
.input {
  background: #1F1F1F;
  border: 1px solid #404040;
  color: #FFFFFF;
}

.input:focus {
  border-color: #FFFFFF;
  outline: none;
}
```

## Logo Usage

**Primary Logo:** TBD - Need client logo files
**Formats Needed:**
- SVG (vector, scalable)
- PNG (high-res, transparent background)
- Favicon (16x16, 32x32, 64x64)

**Logo Variations:**
- White logo on black background (primary)
- Black logo on white background (inverse, if needed)

## Image Treatment

**Photography Style:**
- High contrast
- Moody lighting
- Focus on texture and detail
- Black backgrounds where possible
- Natural coffee/food tones

**Filters:**
- Slight desaturation
- Increased contrast
- Warmer tone for food
- Cooler tone for ambiance shots

## Mobile Considerations

- Maintain black/white theme
- Ensure touch targets are minimum 44x44px
- Keep text size readable (minimum 16px for body)
- Use white text on black for readability in bright conditions

## Accessibility Notes

- **WCAG AAA Compliant** - Black (#000000) and White (#FFFFFF) provide 21:1 contrast ratio
- **Perfect Readability** - Highest possible contrast
- **Color Blind Safe** - No reliance on color for information
- **Night Mode Ready** - Already optimized for low-light viewing

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'draco-black': '#000000',
        'draco-white': '#FFFFFF',
        'draco-gold': '#D4AF37',
        'draco-coffee': '#6D4C41',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      },
    },
  },
}
```

---

**Document Version:** 1.0
**Last Updated:** October 24, 2025
**Status:** Initial Draft - Black/White theme confirmed by client
**Pending:** Logo files, exact accent color preferences, font choices
