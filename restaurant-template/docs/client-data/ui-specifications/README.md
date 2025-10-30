# UI Specifications

This folder captures client preferences for user interface design.

## Files to Create:

### 1. `color-palette.md`
```markdown
# UI Color Palette

## Primary Colors (Actions, Links, Buttons)
- **Primary:** [#HEXCODE] - Used for primary CTAs
- **Primary Hover:** [#HEXCODE]
- **Primary Light:** [#HEXCODE] - Backgrounds, highlights

## Secondary Colors
- **Secondary:** [#HEXCODE] - Secondary actions
- **Secondary Hover:** [#HEXCODE]

## Neutral Colors (Backgrounds, Text)
- **Background:** [#HEXCODE] - Main background
- **Surface:** [#HEXCODE] - Card backgrounds
- **Border:** [#HEXCODE] - Dividers, borders
- **Text Primary:** [#HEXCODE] - Main text
- **Text Secondary:** [#HEXCODE] - Subdued text
- **Text Disabled:** [#HEXCODE]

## Semantic Colors (Feedback)
- **Success:** [#HEXCODE] - Success messages
- **Warning:** [#HEXCODE] - Warnings
- **Error:** [#HEXCODE] - Error states
- **Info:** [#HEXCODE] - Information

## Special Colors
- **Overlay:** [rgba(0,0,0,0.5)] - Modal overlays
- **Shadow:** [rgba(0,0,0,0.1)] - Card shadows

## Usage Examples
**Button Primary:**
- Background: Primary color
- Text: White
- Hover: Primary Hover

**Card:**
- Background: Surface
- Border: Border color
- Shadow: Shadow color
```

### 2. `typography.md`
```markdown
# UI Typography

## Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Playfair Display', Georgia, serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

## Type Scale
| Purpose | Size (rem/px) | Weight | Line Height | Letter Spacing |
|---------|---------------|--------|-------------|----------------|
| Display | 4rem / 64px | 700 | 1.1 | -0.02em |
| H1 | 3rem / 48px | 700 | 1.2 | -0.01em |
| H2 | 2.25rem / 36px | 600 | 1.3 | 0 |
| H3 | 1.5rem / 24px | 600 | 1.4 | 0 |
| H4 | 1.25rem / 20px | 600 | 1.5 | 0 |
| Body Large | 1.125rem / 18px | 400 | 1.6 | 0 |
| Body | 1rem / 16px | 400 | 1.6 | 0 |
| Body Small | 0.875rem / 14px | 400 | 1.5 | 0 |
| Caption | 0.75rem / 12px | 500 | 1.4 | 0.05em |

## Responsive Typography
```css
/* Mobile */
H1: 2rem (32px)
H2: 1.5rem (24px)
Body: 1rem (16px)

/* Tablet */
H1: 2.5rem (40px)
H2: 2rem (32px)

/* Desktop */
H1: 3rem (48px)
H2: 2.25rem (36px)
```
```

### 3. `component-preferences.md`
```markdown
# Component Preferences

## Buttons

### Primary Button
- **Style:** [Solid / Outline / Ghost]
- **Shape:** [Rounded / Pill / Square]
- **Border Radius:** [0.5rem / 1rem / full]
- **Padding:** [Vertical] x [Horizontal]
- **Shadow:** [Yes/No - depth level]
- **Hover Effect:** [Darken / Lift / Scale / Glow]

**Example:**
- Solid background
- Rounded corners (0.5rem)
- Medium padding (0.75rem x 1.5rem)
- Subtle shadow
- Hover: Slightly darker + lift

### Secondary Button
[Same format as primary]

### Text Button
[Format for text-only buttons]

---

## Cards

### Card Style
- **Background:** [White / Subtle gray / Transparent]
- **Border:** [Yes/No - thickness, color]
- **Border Radius:** [0.5rem / 1rem]
- **Shadow:** [None / Subtle / Medium / Heavy]
- **Padding:** [1rem / 1.5rem / 2rem]
- **Hover Effect:** [Lift / Glow / Border change / None]

**Example:**
- White background
- 1px subtle border
- Rounded (0.75rem)
- Medium shadow
- Hover: Lift slightly

---

## Forms

### Input Fields
- **Style:** [Outline / Filled / Underline]
- **Border Radius:** [0.5rem]
- **Height:** [2.5rem / 3rem]
- **Label Position:** [Above / Floating / Inside]
- **Focus State:** [Border color / Glow / Underline]
- **Error State:** [Red border / Icon / Message below]

### Select Dropdowns
- **Style:** [Native / Custom dropdown]
- **Icon:** [Chevron down]

### Checkboxes & Radio Buttons
- **Style:** [Default / Custom styled]
- **Size:** [1rem / 1.25rem]

---

## Navigation

### Header/Navbar
- **Position:** [Fixed / Static / Sticky]
- **Height:** [4rem / 5rem]
- **Background:** [Transparent / Solid / Blur]
- **Shadow on Scroll:** [Yes/No]
- **Mobile Menu:** [Hamburger / Drawer / Full screen]

### Footer
- **Layout:** [Columns / Centered / Minimal]
- **Background:** [Dark / Light]

---

## Spacing System
- **Base Unit:** [4px / 8px]
- **Scale:** [0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem]

---

## Animations & Transitions

### Timing
- **Fast:** 150ms - Hover effects
- **Medium:** 300ms - Modals, drawers
- **Slow:** 500ms - Page transitions

### Easing
- **Default:** ease-in-out
- **Bounce:** spring-like for interactions
- **Smooth:** linear for loading states

### Preferences
- **Page Transitions:** [Yes/No - type]
- **Scroll Animations:** [Yes/No - subtle/dramatic]
- **Loading States:** [Skeleton / Spinner / Progress bar]
- **Micro-interactions:** [Button clicks, form validation, etc.]

---

## Icons
- **Library:** [Heroicons / Lucide / Font Awesome / Custom]
- **Style:** [Outline / Solid / Duotone]
- **Size:** [1rem / 1.5rem / 2rem]
```

### 4. `page-designs/`
Create separate `.md` files for each major page:

#### `homepage.md`
```markdown
# Homepage Design Preferences

## Hero Section
- **Layout:** [Full-width image / Split / Video background]
- **Headline Position:** [Center / Left / Right]
- **CTA Style:** [Button / Button group]
- **Height:** [Viewport height / Fixed]

## Featured Sections
1. **Featured Products/Menu**
   - Layout: [Grid / Carousel / List]
   - Items to show: [3 / 6 / 9]

2. **About Us**
   - Layout: [Image + Text / Text only]
   - Position: [Left / Right]

3. **Reviews/Testimonials**
   - Style: [Cards / Quotes / Carousel]
   - Show: [3-6 reviews]

4. **Call to Action**
   - Style: [Banner / Section / Inline]

## Reference/Inspiration
[Links to similar sites client likes]
```

---

## How to Use

1. **Initial Client Meeting:** Gather preferences for each section
2. **Show Examples:** Use reference sites to clarify preferences
3. **Document Choices:** Fill out each file based on client feedback
4. **Design Mockups:** Create mockups based on these specs
5. **Update During Development:** Adjust as client provides feedback
