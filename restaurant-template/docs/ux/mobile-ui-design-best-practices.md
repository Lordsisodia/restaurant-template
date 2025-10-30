# Mobile UI Design Best Practices - Comprehensive Guide

**Last Updated:** October 2025
**Sources:** Material Design, Apple HIG, Nielsen Norman Group, Baymard Institute, Smashing Magazine, Restaurant App Design Research

> **Note:** This is an extensively researched document covering 20+ critical mobile UI design areas. Use the table of contents to navigate to specific sections.

---

## 📑 Table of Contents

1. [Core Design Principles](#core-design-principles)
2. [Platform-Specific Guidelines](#platform-specific-guidelines)
3. [Visual Design](#visual-design)
4. [Navigation Patterns](#navigation-patterns)
5. [Touch & Interaction Design](#touch-interaction-design)
6. [Form Design Best Practices](#form-design-best-practices)
7. [Animation & Micro-interactions](#animation-micro-interactions)
8. [Onboarding Patterns](#onboarding-patterns)
9. [State Management](#state-management)
10. [Card Design Patterns](#card-design-patterns)
11. [Bottom Sheets & Modals](#bottom-sheets-modals)
12. [Typography Systems](#typography-systems)
13. [Icon Design & Touch Targets](#icon-design-touch-targets)
14. [Search, Filter & Sort UI](#search-filter-sort-ui)
15. [Mobile Payment & Checkout](#mobile-payment-checkout)
16. [Biometric Authentication](#biometric-authentication)
17. [Push Notifications](#push-notifications)
18. [Progressive Disclosure](#progressive-disclosure)
19. [Pull-to-Refresh & Swipe Gestures](#pull-to-refresh-swipe-gestures)
20. [Haptic Feedback](#haptic-feedback)
21. [Dark Mode Design](#dark-mode-design)
22. [Restaurant App Specific](#restaurant-app-specific)
23. [Performance Best Practices](#performance-best-practices)
24. [Usability & Accessibility Checklists](#usability-accessibility-checklists)

---

## 🎯 Core Design Principles

### 1. **Simplicity & Clarity**
- Users should complete priority tasks with minimum steps
- Keep navigation straightforward - if users can't find key actions in 2 taps, you've lost them
- Remove unnecessary options and focus on core functionality
- Use clear, legible text and precise icons

### 2. **Consistency**
- Maintain consistent theme, colors, and fonts throughout
- Follow platform-specific guidelines (Material Design for Android, HIG for iOS)
- Use familiar patterns that users already understand

### 3. **Accessibility First**
- Dynamic type sizing for different user needs
- High contrast modes for visibility
- VoiceOver/TalkBack support built-in from start
- Touch targets minimum 44x44pt (iOS) / 48x48dp (Android)

---

## 📱 Platform-Specific Guidelines

### iOS (Human Interface Guidelines)

**Three Fundamental Principles:**
1. **Clarity** - Easy to understand with legible text and precise icons
2. **Deference** - UI helps users interact with content without competing with it
3. **Depth** - Visual layers and realistic motion convey hierarchy

**Key Elements:**
- Use SF Pro font family for consistency
- Respect safe areas and avoid notch intrusion
- Use native iOS components (Tab Bar, Navigation Bar)
- Implement smooth, purposeful animations
- Design for one-handed use when possible

### Android (Material Design)

**Core Principles:**
- **Material You** - Dynamic color/theming based on user wallpaper
- **Expressive Motion** - Physics-informed, springy animations
- **Adaptive Layouts** - Gracefully adjust to different screen sizes

**Key Elements:**
- Use Roboto font family
- Floating Action Buttons (FAB) for primary actions
- Cards and grid-based layouts for content
- Bottom Navigation for 3-5 top-level destinations
- Elevation and shadows to show hierarchy

---

## 🎨 Visual Design Best Practices

### Typography
- **Primary Text:** 16-17px minimum for body copy
- **Headings:** Clear hierarchy (H1: 28-32px, H2: 24-28px, H3: 20-24px)
- **Line Height:** 1.4-1.6 for readability
- **Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text

### Color
- **Primary Color:** Brand identity, main actions
- **Secondary Color:** Accents, less prominent actions
- **Error/Success States:** Clear visual feedback
- **Dark Mode:** Support both light and dark themes
- **Dynamic Color (Android):** Let system generate palette from wallpaper

### Spacing & Layout
- **Grid System:** 8pt grid for consistent spacing
- **Margins:** 16-24px edge margins on mobile
- **Content Width:** Max 600px for optimal readability
- **Padding:** Minimum 12-16px around interactive elements
- **White Space:** Generous use to reduce cognitive load

### Imagery
- **High Quality:** Use crisp, optimized images (WebP format preferred)
- **Aspect Ratios:** Consistent across similar content types
- **Loading States:** Skeleton screens or progressive loading
- **File Size:** Optimize for performance (<200KB per image ideal)

---

## 🧭 Navigation Patterns

### Primary Navigation

**Tab Bar (iOS) / Bottom Navigation (Android)**
- 3-5 top-level destinations
- Always visible, sticky at bottom
- Icons + labels for clarity
- Highlight active tab clearly

**Hamburger Menu**
- Use for secondary/less frequent actions
- Not recommended for primary navigation
- Users expect it in top-left corner
- Should reveal on swipe from left edge

**Top Navigation Bar**
- Shows current location/context
- Back button for hierarchical navigation
- Actions/overflow menu on right

### Content Navigation

**Hub-and-Spoke:** Central home screen with paths to features
**Deck-of-Cards:** Horizontal swipe between full-screen views
**Vertical Scroll:** Infinite scroll for feeds and lists
**Tabs:** Switch between related content types
**Carousels:** Browse multiple items (use sparingly)
**Grids:** Browse visual content efficiently

---

## 👆 Touch & Interaction Design

### Touch Targets
- **Minimum Size:** 44x44pt (iOS) / 48x48dp (Android)
- **Spacing:** 8px minimum between tap targets
- **Primary Actions:** Larger, more prominent (56x56dp for FAB)
- **Edge Zones:** Easier to reach with thumb (bottom 2/3 of screen)

### Gestures
- **Tap:** Primary selection action
- **Long Press:** Secondary actions/context menus
- **Swipe:** Navigate between screens, reveal actions
- **Pull to Refresh:** Update content lists
- **Pinch to Zoom:** Images and maps
- **Standard Only:** Don't invent new gestures

### Feedback
- **Visual:** Button state changes, ripple effects
- **Haptic:** Light feedback for successful actions (iOS)
- **Audio:** Subtle sounds for important actions (optional)
- **Loading States:** Show progress for actions >1 second

---

## 📝 Form Design Best Practices

### Input Field Design

**Single-Column Layouts**
- **Always use single column** on mobile - easier completion, faster error correction
- Multi-column layouts confuse users and reduce submission rates

**Field Optimization**
- **Auto-format data** with field masking (phone: (555) 123-4567, credit card: 1234 5678 9012 3456)
- **Smart keyboard display** - dialpad for phone/credit card, email keyboard for email, date picker for dates
- **Autofill & predictive text** - auto-populate common fields from past entries
- **Voice input** - speed up data entry, especially helpful for accessibility

**Label & Placeholder Strategy**
- **Labels above fields** - never inside (disappears when typing)
- **Floating labels** acceptable if well-implemented
- **Placeholders** for examples only ("john@example.com") - not for instructions

### Validation Best Practices

**Inline/Real-Time Validation**
- Validate **immediately after field completion** - not on every keystroke (annoying)
- Show success state (green checkmark) for completed valid fields
- Delay error messages until user finishes typing (debounce 500ms)

**Error Messages**
- Position **directly below the problem field**
- Be **specific**: ❌ "Invalid input" → ✅ "Phone number must be 10 digits including area code"
- Use **red text + icon** for visibility
- **Keep field value** - let users fix it, don't clear it

**Error Prevention**
- **Disable submit button** until form is valid
- **Show requirements** upfront (password must be 8+ characters, include number)
- **Progressive validation** - check each field before moving to next

### Form Structure

**Keep Forms Concise**
- Only include **essential fields** - every field increases abandonment by ~11%
- Use **optional** label sparingly - assume everything is required unless marked

**Multi-Step Forms**
- Break long forms into **3-5 steps maximum**
- Show **progress indicator** (Step 2 of 4)
- Allow **back navigation** without losing data
- **Save progress** automatically

**Modern Features (2025)**
- **Express checkout** options (Apple Pay, Google Pay) - bypass form entirely
- **Biometric autofill** (Face ID/Touch ID for passwords)
- **Smart defaults** based on location (country code, time zone)
- **Conditional fields** - only show relevant fields based on previous answers

### Mobile-Specific Considerations

- **Minimum field height:** 44pt (iOS) / 48dp (Android)
- **Field spacing:** 16-24px between fields
- **CTA button:** Full-width, prominent, 56dp height minimum
- **Avoid dropdowns** if <5 options - use radio buttons instead
- **Date pickers** over manual entry
- **Address lookup** API integration (Google Places)

---

## ✨ Animation & Micro-interactions

### Timing Guidelines

**Duration Standards**
- **Quick actions:** 100-200ms (button taps, checkboxes)
- **Standard animations:** 200-300ms (screen transitions, dialogs)
- **Complex animations:** 300-500ms (elaborate transitions)
- **Never exceed 500ms** - feels slow and frustrating

**Easing Functions**
- **Ease-out** (deceleration) - objects entering view
- **Ease-in** (acceleration) - objects exiting view
- **Ease-in-out** - objects moving within view
- **Avoid linear** - feels robotic and unnatural

### Core Design Principles

**Purposeful & Functional**
- Every animation **serves a purpose** (feedback, guidance, delight)
- **Frequent actions** = modest animation
- **Infrequent/major actions** = more substantial animation
- Never animate just because you can

**Simplicity**
- Keep animations **straightforward** - avoid complexity
- Serve **one specific purpose** per animation
- Don't distract from core functionality

**Longevity Considerations**
- What's delightful **once** may be **annoying after 100x use**
- Make animations **skippable** or **disableable** for power users
- Respect **reduced motion** accessibility settings

### Micro-interaction Types

**Button Feedback**
- **Press state** - slight scale down (0.95x) + color change
- **Ripple effect** (Material Design) - visual confirmation
- **Haptic feedback** on tap (iOS) - tactile confirmation
- **Loading state** - spinner replaces button text during processing

**Toggle & Switch**
- **Smooth slide animation** (200ms)
- **Color transition** showing on/off state clearly
- **Haptic bump** at toggle point (iOS)

**Form Interactions**
- **Focus state** - subtle scale up + border glow
- **Success state** - checkmark fade-in (300ms)
- **Error shake** - horizontal vibration (500ms) for failed validation

**List Interactions**
- **Swipe reveal** - actions slide in smoothly
- **Pull-to-refresh** - loading spinner with pull distance feedback
- **Delete animation** - item slides out + fade (300ms)

### Performance Optimization

- **Use transform & opacity** - GPU-accelerated properties only
- **Avoid animating** layout properties (width, height, top, left)
- **Target 60fps** - test on low-end devices
- **Reduce motion** media query support: `@media (prefers-reduced-motion: reduce)`

---

## 🚀 Onboarding Patterns

### Critical Statistics
- **77% of users abandon** within first 3 days
- **90% abandon** within first month
- **Good onboarding improves retention by 50%+**
- **1 in 4 users abandon after first use**

### Onboarding Patterns

**1. Welcome Screens**
- Keep to **2-3 screens maximum**
- Focus on **core value proposition**
- Use **illustrations/visuals** - not just text
- Include **skip button** - respect user time
- **Swipeable cards** for multi-screen flows

**2. Product Tours**
- **Contextual tooltips** appear when relevant
- **Highlight 3-5 key features only** - not everything
- **Interactive walkthrough** - let users try features
- **Dismissible** - users can exit anytime

**3. Progressive Onboarding**
- **Just-in-time education** - teach features when needed
- **Spread across app experience** - not all upfront
- **Trigger-based tips** - appear on first use of feature
- Example: Show "swipe to delete" hint on first list interaction

**4. Personalization/Self-Segmentation**
- **Ask user intent** early ("I want to: Order food / Browse menu / Find locations")
- **Customize experience** based on answers
- **Collect preferences** (dietary restrictions, favorite cuisines)
- **Persona-based flows** for different user types

**5. Checklists**
- **Gamify onboarding** with progress tracking
- **3-7 achievable tasks** with completion checkmarks
- **Reward completion** (discount, badge, full access)
- Example: ✅ Add profile photo, ✅ Save favorite restaurant, ⬜ Place first order

**6. Empty States as Onboarding**
- **First-time user sees helpful prompts** instead of blank screens
- "No favorites yet? Browse our popular dishes →"
- **Call-to-action buttons** prominently placed

### Best Practices

**Don't Use Onboarding to Fix Bad UX**
- If your UI needs extensive explanation, **simplify the UI first**
- Onboarding should **enhance**, not compensate for poor design

**Respect User Time**
- **Allow skip** at any point
- **Save progress** if user exits
- **Don't repeat** on every app open

**Test Rigorously**
- **A/B test** different onboarding flows
- **Track completion rates** for each step
- **Identify drop-off points** and optimize

**Mobile-Specific**
- **Use native gestures** during tutorial
- **Show, don't tell** - visual demonstrations > text
- **Keep text minimal** - 1-2 sentences per screen max

---

## 🔄 State Management

### The Four Critical States

Every screen must handle:
1. **Loading State** - content is being fetched
2. **Content State** - data successfully loaded
3. **Empty State** - no data to display
4. **Error State** - something went wrong

### Loading States

**Skeleton Screens (Preferred for Mobile)**
- **Show layout wireframe** while content loads
- **Better perceived performance** than spinners
- **Maintain consistency** with final loaded screen
- **Include motion effects** (shimmer/wave animation) to show it's not stuck
- **Use for**: Lists, cards, image grids, text content

**Implementation Tips:**
- Show skeleton for **primary structural elements only**
- **Exclude** small elements (labels, buttons, icons)
- **Avoid frame-only** displays (looks broken)
- **Great for mobile** - network conditions unpredictable

**Progressive Loading**
- Load **critical content first** (above fold)
- **Lazy load** images as user scrolls
- Show **partial content** better than blocking everything

**Loading Spinners (Use Sparingly)**
- **Small operations** (<2 seconds expected)
- **Full-screen blocker** for critical operations
- **Avoid on page load** - use skeleton instead

### Empty States

**Design Goals:**
1. **Educate** - explain why it's empty
2. **Delight** - use friendly illustrations
3. **Prompt action** - clear CTA to populate

**Types of Empty States:**

**First-Time User**
- "Start building your collection →"
- **Welcoming tone** with clear next step
- **Visual guidance** (arrows, illustrations)

**No Search Results**
- "No matches for 'pizza'"
- **Suggest alternatives** ("Try: Italian, pasta")
- **Relaxed search** button (remove filters)

**No Data Yet**
- "Your order history will appear here"
- **Explain when it will populate**
- **Link to relevant action** ("Browse menu →")

**User Cleared Data**
- "All notifications cleared ✓"
- **Positive confirmation** of action
- **Option to undo** if applicable

### Error States

**Error Message Components:**
1. **Icon** - visual indicator (⚠️ or custom)
2. **Headline** - what went wrong (user-friendly language)
3. **Description** - why it happened (if known)
4. **Action** - what user can do (Try Again, Go Back, Contact Support)

**Error Types:**

**Network Errors**
- "No internet connection"
- "Show cached content" option if available
- "Retry when online" auto-retry option

**404 / Not Found**
- "This page doesn't exist"
- **Link to home** or relevant section
- **Search bar** to find what they need

**Permission Denied**
- "Camera access required"
- **Explain why** permission is needed
- **Link to settings** to enable

**Server Errors**
- "Something went wrong on our end"
- **Avoid technical jargon** (no "Error 500")
- "We're working on it" reassurance

**Form Validation Errors**
- **Inline next to field** (covered in Forms section)
- **Summary at top** if multiple errors
- **Scroll to first error** automatically

### Best Practices

- **Consistent styling** across all states
- **Appropriate tone** (empty = friendly, error = helpful, not scolding)
- **Clear actions** - always provide next step
- **Test all states** - don't forget error paths
- **Avoid jargon** - speak user language, not developer language

---

## 🎴 Card Design Patterns

### What Makes Good Card Design

**Core Card adopted in 2014 with Material Design, now ubiquitous in mobile design**

### Benefits of Cards

- **Organize content into scannable chunks**
- **Avoid long unreadable text walls**
- **Perfect for mobile** - adapt to all screen sizes
- **Touch-friendly** - easy to tap, swipe
- **One concept per card** - maintain simplicity

### Card Structure

**Essential Elements:**
- **Container** - defined boundary (border, shadow, or color)
- **Primary content** - image, text, or both
- **Supporting info** - metadata, timestamps
- **Actions** - buttons or swipe gestures (optional)

**Visual Hierarchy:**
- **Largest element** = primary focus (usually image)
- **Bold text** for titles
- **Muted text** for descriptions
- **Negative space** prevents clutter

### Card Elevation (Material Design)

- **Level 1 (2dp)** - Resting elevation, minimal shadow
- **Level 2 (8dp)** - Raised on interaction (hover/tap)
- **Level 3 (24dp)** - Modals, dialogs

iOS alternative: **Subtle border + background color** instead of shadows

### Card Patterns

**Product Cards (E-commerce)**
```
┌─────────────────┐
│   [Image]       │
│   Product Name  │
│   $19.99 ★★★★☆ │
│   [Add to Cart] │
└─────────────────┘
```

**Content Cards (Feed)**
```
┌─────────────────┐
│ [@] Name • 2h   │
│ Post text...    │
│   [Image]       │
│ 👍💬🔗         │
└─────────────────┘
```

**Restaurant Menu Cards**
```
┌────────────────────┐
│ [Dish Image]       │
│ Dish Name          │
│ Short description  │
│ $12.99    [+ Add]  │
└────────────────────┘
```

### Best Practices

**Spacing & Padding**
- **Internal padding:** 16-24px
- **Card gap:** 16-20px between cards
- **Edge margins:** 16px from screen edges

**Touch Targets**
- **Entire card tappable** if it leads somewhere
- **Action buttons** inside card: 48x48dp minimum
- **Swipe actions** must be discoverable (teaser animation)

**Performance**
- **Lazy load images** as cards scroll into view
- **Limit cards per page** - paginate or infinite scroll
- **Optimize images** - use WebP, responsive sizes

**Accessibility**
- **Sufficient contrast** for text on image overlays
- **Alt text** for all images
- **Screen reader** announces card structure clearly
- **Keyboard navigation** support (web)

---

## 📱 Bottom Sheets & Modals

### Bottom Sheet Definition

**Overlay anchored to bottom of screen** displaying additional details or actions.

### Types

**1. Modal Bottom Sheets**
- **Takes over screen** - blocks other interactions
- **Dims background** UI
- **Used for:** Critical decisions, forms, confirmations
- **Dismissal:** Tap outside, swipe down, close button

**2. Non-Modal (Persistent) Bottom Sheets**
- **Allows background interaction** while visible
- **Used for:** Music player, maps info, filters
- **Dismissal:** User explicitly closes or navigates away

### Platform Differences

**iOS:**
- **Close button ("X")** in top corner
- **Can drag from top** to close
- **Rounded top corners**
- **Tap outside** to dismiss modals

**Android:**
- **Drag handle** at top (grabber indicator)
- **Swipe down** to dismiss
- **Rounded top corners**
- **Tap outside** to dismiss modals

### Common Use Cases

**Music/Media Player**
- Persistent bottom sheet
- **Expands to full screen** when tapped
- **Always accessible** while browsing

**Map Details (Google Maps)**
- Shows location info
- **Drag up** to expand details
- **Drag down** to collapse (can't fully dismiss)
- **Swipe horizontally** between locations

**Filters & Sorting**
- Modal bottom sheet
- **Apply/Cancel buttons** at bottom
- **Show count** of filtered results
- **Scrollable content** if many options

**Action Sheets (iOS) / Bottom Menus**
- List of actions for selected item
- **Destructive action** in red at bottom
- **Cancel** button separated

### Design Guidelines

**Height:**
- **Initial:** 40-50% of screen height
- **Expanded:** 80-90% (leave space for status bar)
- **Never 100%** - use full-screen modal instead

**Drag Behavior:**
- **Snap points:** Define resting positions (collapsed, half, expanded)
- **Spring animation** when released
- **Momentum scrolling** respects velocity

**Content:**
- **Title/Handle area:** 56-64dp tall
- **Scrollable content:** If content exceeds sheet height
- **Fixed actions:** Buttons stay at bottom when scrolling

**Accessibility:**
- **Focus trap** - screen reader stays within modal sheet
- **Announce when opened** ("Settings dialog opened")
- **ESC key closes** (keyboard support)

---

## 📐 Typography Systems

### Base Font Sizes

**Mobile Standard:** 16px (1rem)
- **iOS default:** 17px
- **Android default:** 16sp
- **Never go below 14px** for body text

### Type Scale Systems

**Modular Scale Ratios:**
- **Minor Third (1.2)** - Subtle, text-heavy apps
- **Major Third (1.25)** - Moderate, versatile (recommended)
- **Perfect Fourth (1.333)** - Clear hierarchy
- **Golden Ratio (1.618)** - High contrast, visual impact

**Example Major Third Scale (16px base):**
```
12px  - Caption
14px  - Small text
16px  - Body (base)
20px  - Subheading (16 × 1.25)
25px  - H3 (20 × 1.25)
31px  - H2 (25 × 1.25)
39px  - H1 (31 × 1.25)
```

### Responsive Implementation

**Use Relative Units:**
- **rem** - scales with root font size
- **em** - scales with parent element
- **Avoid px** - doesn't scale with user preferences

**CSS Example:**
```css
body { font-size: 16px; } /* Base */
h1 { font-size: 2.441rem; } /* 39px */
h2 { font-size: 1.953rem; } /* 31px */
p { font-size: 1rem; } /* 16px */
small { font-size: 0.875rem; } /* 14px */
```

**Fluid Typography:**
```css
font-size: clamp(14px, 4vw, 18px);
/* Min 14px, scales with viewport, max 18px */
```

### Line Height

- **Body text:** 1.5-1.6 (24-26px for 16px font)
- **Headings:** 1.2-1.3 (tighter)
- **Small text:** 1.4 minimum
- **Never below 1.2** for readability

### Font Weights

**Standard Scale:**
- 300 - Light (sparingly)
- 400 - Regular (body text)
- 500 - Medium (emphasis)
- 600 - Semi-Bold (subheadings)
- 700 - Bold (headings)
- 800+ - Heavy (rarely)

**Mobile Considerations:**
- **Thin fonts (<300)** hard to read on small screens
- **Stick to 2-3 weights** for consistency
- **Bold for hierarchy**, not decoration

### Platform Fonts

**iOS:**
- **SF Pro** - System font
- **SF Pro Display** - Large text (>20pt)
- **SF Pro Text** - Small text (<20pt)
- **SF Compact** - watchOS
- **SF Mono** - Code/numbers

**Android:**
- **Roboto** - Primary
- **Roboto Condensed** - Narrow spaces
- **Roboto Mono** - Code/numbers

**Web/Custom:**
- **Fallback stack:** `font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`

### Best Practices

- **Limit to 2 font families** maximum (heading + body)
- **Establish hierarchy** through size, weight, color - not font family
- **Test on devices** - rendering varies across platforms
- **Support dynamic type** (iOS) - users can adjust system font size
- **Accessibility:** Respect user's font size preferences

---

## 🎯 Icon Design & Touch Targets

### Touch Target Size Standards

**Minimum Sizes:**
- **iOS:** 44x44pt minimum
- **Android:** 48x48dp minimum
- **WCAG 2.5.5:** Physical size ~9mm (0.35in) minimum
- **Best practice:** 11mm (42-46px) to prevent rage taps

**Location-Based Sizing (Steven Hoober Research):**
- **Top of screen:** 11mm (42px) minimum
- **Center of screen:** 7mm (27px) acceptable
- **Bottom of screen:** 12mm (46px) minimum
- **Thumb zone (bottom third):** Most accessible, larger targets less critical

**Spacing:**
- **Between targets:** 8dp minimum (Android)
- **Comfortable spacing:** 16dp preferred
- **Dense UIs:** 8dp acceptable if targets are 48dp

### Visual vs. Touch Size

**Padding Extends Beyond Visual:**
```
┌────────────────┐
│   ┌──────┐    │  48x48dp touch target
│   │ Icon │    │  24x24dp visual icon
│   └──────┘    │  12dp padding all sides
└────────────────┘
```

**Implementation:**
```css
.icon-button {
  width: 24px;  /* Visual size */
  height: 24px;
  padding: 12px;  /* Touch padding */
  /* Total: 48x48px touch target */
}
```

### Icon Design Principles

**Size Guidelines:**
- **Toolbar icons:** 24x24dp (Android) / 28x28pt (iOS)
- **System icons:** 18-24px
- **Contextual icons:** 16-20px
- **App icons:** 1024x1024px (various sizes generated)

**Visual Weight:**
- **2px stroke** for outlined icons (standard)
- **1.5px stroke** for dense UIs
- **Filled icons** for active/selected states
- **Consistent weight** across icon set

**Grid System:**
- Design on **24x24dp grid** (Android)
- **Live area:** 20x20dp (content)
- **Trim area:** 2dp padding minimum
- **Keyline shapes:** Circle, square, vertical/horizontal rectangles

**Style Consistency:**
- **Single style** throughout app (outlined OR filled, not mixed)
- **Rounded corners** preferred (2-3px radius)
- **Avoid excessive detail** - icons should be recognizable at small sizes
- **Test at actual size** - not just zoomed in design view

### Accessibility

**Color Contrast:**
- **Icons as UI elements:** 3:1 contrast minimum (WCAG 2.1)
- **Informational icons:** 4.5:1 contrast with background
- **Don't rely on color alone** - use shape/position too

**Meaningful Icons:**
- **Universal symbols** preferred (magnifying glass = search)
- **Label ambiguous icons** (text label or tooltip)
- **Alt text** for screen readers
- **Active/inactive states** clearly distinguishable

**Touch Feedback:**
- **Visual state change** on tap (color, opacity)
- **Ripple effect** (Material Design)
- **Scale animation** (iOS) - slight press down
- **Haptic feedback** for important actions (iOS)

### Common Icon Mistakes

❌ **Icons too small** - users can't tap accurately
❌ **Insufficient spacing** - adjacent icons get tapped accidentally
❌ **Inconsistent style** - mixing filled and outlined icons
❌ **No visual feedback** - users unsure if tap registered
❌ **Obscure symbols** - users don't understand meaning
❌ **Color-only differentiation** - fails for colorblind users

---

## 🔍 Search, Filter & Sort UI

### Search Patterns

**Auto-Complete (Most Common)**
- **Instant results** as user types
- **Suggestions below input** (dropdown or fullscreen)
- **Highlight matching text** in results
- **Recent searches** when input is focused
- **Popular searches** for first-time users

**Search Box Design:**
- **Prominent placement** - top of screen, sticky
- **Magnifying glass icon** (universal symbol)
- **Placeholder text** - "Search dishes, restaurants..."
- **Clear button (X)** appears when typing
- **Voice search** icon option
- **Cancel button** (iOS) / Back arrow (Android)

**Search Behavior:**
- **Trigger search** - after 300-500ms typing pause (debounce)
- **Minimum 2-3 characters** before showing results
- **Show result count** - "24 results for 'pizza'"
- **Search history** - allow clearing individual or all

**No Results:**
- "No results for 'xyz'"
- **Did you mean:** suggestions for typos
- **Relax filters** option if active
- **Browse categories** as alternative
- **Contact support** for special requests

### Filter Patterns

**Filter Presentation:**

**1. Fullscreen Filters** (Complex filtering)
- New screen with all filter options
- **Done/Apply** button with result count
- **Clear all** option
- **Best for:** Many filter criteria (20+)

**2. Bottom Sheet Filters** (Moderate filtering)
- Slide up from bottom
- **Show result count** as filters change
- **Apply & Cancel** buttons
- **Best for:** 5-15 filter options

**3. Horizontal Chips** (Quick filtering)
- **Scrollable row** of filter pills
- **Tap to toggle** on/off
- **Active state** clearly visible (filled vs outlined)
- **Best for:** 3-7 quick filters

**4. Side Drawer Filters** (Desktop/Tablet)
- Collapsible panel on left
- **Persist while browsing** results
- **Less common on mobile** (screen space limited)

**Filter Types:**

**Single Select** - Radio buttons or segmented control
- Example: "Sort by: Price | Rating | Distance"

**Multi-Select** - Checkboxes
- Example: Dietary: ☑ Vegetarian ☐ Vegan ☑ Gluten-Free

**Range** - Sliders or inputs
- Example: Price: $$ to $$$$

**Toggle** - Switch or checkbox
- Example: ☑ Open now

**Date** - Date picker or preset ranges
- Example: Today | This Week | This Month

### Best Practices

**Transparency:**
- **Show active filter count** - "Filters (3)"
- **Display applied filters** as removable chips above results
- **Show result count** before applying - "Show 18 results"

**Performance:**
- **Instant feedback** - update count as filters change (local filtering if possible)
- **Loading state** for server filtering
- **Debounce range sliders** (update after 500ms pause)

**Defaults:**
- **Remember last filters** per session
- **Clear on new search** or provide option
- **Smart defaults** based on context (lunch time → open now)

### Sort Patterns

**Common Sort Options:**
- **Relevance** (default for search results)
- **Price:** Low to High / High to Low
- **Rating:** Highest first
- **Distance:** Nearest first
- **Alphabetical:** A-Z
- **Date:** Newest / Oldest
- **Popularity:** Most ordered / Trending

**Sort UI:**
- **Dropdown menu** or bottom sheet
- **Selected option** clearly indicated (checkmark)
- **Persists** until user changes
- **Position:** Top right of results, next to filters

**Sort + Filter Integration:**
- **Separate controls** - don't combine
- **Filter first, then sort** (filter narrows, sort orders)
- **Clear filter ≠ clear sort** (independent)

---

## 💳 Mobile Payment & Checkout

### Critical Statistics
- **35% conversion increase** possible with optimized checkout
- **69% cart abandonment rate** on mobile
- **Top reason:** Unexpected costs at checkout

### Express Payment Methods (Priority #1)

**Best checkout doesn't use forms at all:**
- **Apple Pay** (iOS)
- **Google Pay** (Android)
- **PayPal** express
- **Amazon Pay**
- **Shop Pay**

**Implementation:**
- **Prominent placement** - above manual entry
- **One-tap purchase** - pre-filled shipping/billing
- **70-80% faster** than manual forms

### Form Optimization

**Auto-Fill Features:**
- **Browser autofill** support (proper input types + autocomplete attributes)
- **Saved payment methods** for returning users
- **Address lookup** APIs (Google Places)
- **Same as shipping** checkbox for billing address

**Field Optimization:**
- **Single column layout** always
- **Minimal required fields** - name, card, expiry, CVV, billing ZIP only
- **Smart keyboard** - number pad for card/CVV
- **Card type detection** - show card logo as user types
- **Expiry formatting** - auto-insert "/" (12/25)
- **Inline validation** - check card validity in real-time

### Multi-Step vs. Single Page

**Multi-Page Checkout (Recommended for Mobile):**
- **Step 1:** Shipping address
- **Step 2:** Shipping method
- **Step 3:** Payment
- **Step 4:** Review & Place Order

**Benefits:**
- Less scrolling on mobile
- Clear progress (2 of 4)
- Prevents errors (validate each step)

**Single-Page (Use for Short Forms Only):**
- **<10 fields total**
- **Accordion sections** to manage height
- **Sticky CTA button** always visible

### Cost Transparency

**Order Summary:**
- **Sticky card** visible at top or expandable
- **Subtotal:** Item costs
- **Shipping:** Show amount or "Free" if applicable
- **Taxes:** Calculate early, show estimate
- **Total:** Large, bold, impossible to miss
- **No surprises** - show all costs before final step

**Error Handling:**
- **Real-time validation** prevents submission errors
- **Inline errors** next to problem fields
- **Don't clear field values** - let user fix
- **Scroll to first error** automatically

### Trust & Security

**Visual Trust Signals:**
- **Lock icon** + "Secure checkout" badge
- **SSL certificate** indicator
- **Payment logos** (Visa, Mastercard, etc.)
- **Security badges** (Norton, McAfee) if applicable
- **Money-back guarantee** if offered

**Security Best Practices:**
- **Never store CVV** (PCI compliance)
- **Tokenize cards** (Stripe, Braintree)
- **3D Secure** for fraud prevention
- **Address verification** (AVS)

### Mobile-Specific

**Performance:**
- **Preload checkout** - fetch form while user is in cart
- **Optimize images** - compress trust badges
- **Minimize redirects** - stay in app if possible

**UX:**
- **Save progress** - don't lose data on app backgrounding
- **Session timeout warning** - "You have 5 minutes left"
- **Back button safety** - confirm before leaving checkout

### Post-Purchase

**Confirmation:**
- **Clear success message** - "Order placed! 🎉"
- **Order number** prominently displayed
- **Email confirmation** - immediate send
- **Next steps** - delivery estimate, tracking link
- **Continue shopping** CTA

---

## 🔐 Biometric Authentication

### Platform Support

**iOS (Face ID / Touch ID):**
- **Face ID:** iPhone X and newer
- **Touch ID:** iPhone 5s through iPhone 8, iPad, MacBook Pro
- **LocalAuthentication framework** - unified API

**Android (Fingerprint / Face Unlock):**
- **Fingerprint:** Android 6.0+ with hardware support
- **Face unlock:** Android 10+ (varies by device)
- **BiometricPrompt API** - unified API (Android 9+)

### When to Use Biometric Auth

**Appropriate Use Cases:**
- **App unlock** - quick reauth after backgrounding
- **Payment confirmation** - approve transactions
- **Sensitive actions** - view account details, change settings
- **Password-less login** - faster than typing

**When NOT to Use:**
- **First-time setup** - no biometrics enrolled yet
- **Every single action** - annoying and excessive
- **Public spaces** - user may want manual password option
- **Shared devices** - family tablets, etc.

### UX Best Practices

**Fallback Options:**
- **Always provide alternative** - password, PIN, pattern
- **Biometric failure** - allow retry + fallback
- **Biometric unavailable** - auto-show fallback
- **User preference** - option to disable biometrics

**Permission & Privacy:**
- **Request permission** appropriately
- **Explain why** - "Use Face ID for faster login?"
- **Privacy assurance** - biometric data stays on device
- **Opt-in, not forced** - users can decline

**Timing:**
- **Instant prompt** - no delay after trigger
- **Timeout:** 30-60 seconds if user doesn't respond
- **Background/foreground** - re-auth if >5 minutes backgrounded

### UI Patterns

**iOS Face ID:**
- **System dialog** - can't customize (Apple design)
- **Reason text** - "Unlock to view your orders"
- **Cancel button** - user can skip
- **Automatic** - scans face immediately

**iOS Touch ID:**
- **System dialog** with fingerprint icon
- **"Touch ID for [App Name]"** title
- **Custom reason** below title
- **Fallback** - "Enter Password" button

**Android Biometric Prompt:**
- **System dialog** - consistent across apps
- **Title:** "Verify it's you"
- **Subtitle:** "Use fingerprint to continue"
- **Description:** Additional context (optional)
- **Negative button:** "Cancel" or "Use PIN"

### Error Handling

**Failed Attempts:**
- **1-2 failures:** "Try again"
- **3+ failures:** Suggest fallback
- **5+ failures:** Force fallback, temporary lockout

**Error Messages:**
- **iOS Face ID:** "Face ID didn't work. Try again or enter passcode."
- **iOS Touch ID:** "Touch ID didn't recognize your fingerprint."
- **Android:** "Biometric not recognized"
- **Avoid blame** - neutral language

### Security Considerations

**Best Practices:**
- **Local device only** - biometric data never leaves device
- **Require fallback** - password/PIN must exist
- **Session management** - biometric auth = short session, require re-auth for sensitive actions
- **Accessibility:** Biometric auth fails for some users (gloves, injuries) - fallback critical

---

## 🔔 Push Notifications

### Critical Statistics
- **71% uninstall apps** due to annoying notifications
- **64% stop using app** if >5 notifications/week
- **Engagement drops 50%** with poor notification strategy

### Timing Best Practices

**Optimal Send Times:**
- **6-8 PM:** Highest engagement for most apps
- **Avoid 12 AM - 6 AM:** Risk waking users (instant uninstall)
- **Respect time zones** - send at local user time, not your server time
- **Consider user schedule** - lunch time for restaurants (11 AM - 1 PM)

**Contextual Timing:**
- **Order status:** Immediately when status changes
- **Delivery:** 5 min before arrival
- **Promotions:** Tue-Thu afternoon (avoid Mon morning, Fri evening)
- **Re-engagement:** After 7-14 days inactivity

### Frequency Best Practices

**Safe Frequency:**
- **2-5 notifications/week** works for most apps
- **Start slow:** 1-2/week initially, increase if engagement positive
- **User control:** Let users set notification preferences

**Frequency Strategies:**
- **Transactional:** No limit (order confirmations, shipping updates)
- **Promotional:** Max 1-2/week
- **Content/News:** Max 3-5/week
- **Time-sensitive:** Any time, but must be genuinely urgent

### Content & Design

**Anatomy of Great Notifications:**

**Title (Bold):**
- **Clear and specific** - "Your pizza is 5 min away 🍕"
- **Max 40-50 characters**
- **Front-load important info**

**Body:**
- **Actionable** - explain what user can do
- **Personalized** - use name, order details
- **Max 120 characters** for visibility

**Image (Optional):**
- **Rich notifications** show image thumbnail
- **Relevant visual** - food photo, map, product
- **Optimized size** - <500KB

**Actions (Optional):**
- **2 action buttons** max
- **Clear CTAs** - "View Order" / "Track Delivery"
- **Avoid yes/no** - be specific about action

**Example:**
```
🍕 Luigi's Pizzeria
Your Margherita Pizza will arrive in 5 minutes!
[Track Delivery] [Call Driver]
```

### Personalization

**Behavioral Triggers:**
- **Cart abandonment:** "You left items in your cart 🛒"
- **Browse abandonment:** "Still thinking about that burger?"
- **Milestone:** "You've ordered from us 10 times! Here's 20% off"
- **Favorite available:** "Truffle Pasta is back on the menu!"

**Segmentation:**
- **Location-based:** "New restaurant opened near you"
- **Preference-based:** "New vegan options at your favorite spot"
- **Usage pattern:** Frequent lunch orderers get lunchtime promos

**Smart Triggers:**
- **Weather:** "It's cold! Hot soup delivered in 30 min?"
- **Events:** "Game tonight? Order party food now"
- **Time-based:** "Breakfast deal ends in 1 hour!"

### Permissions & Opt-In

**Request Strategy:**
- **Don't request immediately** - wait until value is clear
- **Explain value first** - "Get notified when your order is ready"
- **Soft ask → Hard ask** - custom screen before system prompt
- **Provide examples** - show what notifications look like

**Permission States:**
- **Granted:** Send notifications
- **Denied:** Can't send (respect this!)
- **Provisional (iOS 12+):** Quiet notifications, no prompt needed
- **Not determined:** Haven't asked yet

### Notification Categories

**Transactional (Always OK):**
- Order confirmations
- Shipping updates
- Delivery arrival
- Account security

**Engagement (Use Sparingly):**
- Discounts & promotions
- New features
- Content updates
- Re-engagement

**Marketing (Very Limited):**
- Sales & special offers
- Loyalty rewards
- Referral bonuses

### iOS vs. Android Differences

**iOS:**
- **Lock screen:** Large preview
- **Notification Center:** Grouped by app
- **Banners:** Temporary at top
- **Critical Alerts:** Bypass Do Not Disturb (require Apple approval)

**Android:**
- **Notification Channels:** Users control by category
- **Priority levels:** Default, High, Low, Min
- **Bundling:** Group related notifications
- **Heads-up:** Full-screen takeover (use sparingly!)

### Best Practices Summary

✅ **DO:**
- Personalize based on behavior
- Respect user's time zone
- Provide value every time
- Allow granular control
- A/B test everything
- Track opt-out rates

❌ **DON'T:**
- Send at night (12 AM - 6 AM)
- Use clickbait
- Send too frequently (>5/week)
- Use all caps or excessive emojis
- Ignore user preferences
- Send "Hello!" or generic messages

---

## 📂 Progressive Disclosure

### Definition

**Progressive disclosure = Show only what's needed, when it's needed**

Manages information complexity by revealing features/content gradually as user progresses.

### Why Critical for Mobile

- **Limited screen space** - can't show everything
- **Reduce cognitive load** - don't overwhelm users
- **Focus on primary actions** - hide secondary features
- **Improve completion rates** - simpler interface = higher success

### UI Patterns

**1. Accordions**
- **Use for:** FAQs, settings groups, content sections
- **Interaction:** Tap to expand/collapse
- **Visual:** Chevron (▼) indicates expandable
- **Keep:** Only one section expanded at a time (optional)

**Example: Restaurant Menu Categories**
```
▼ Appetizers (8)
  - Bruschetta $8
  - Calamari $12
  ...
▶ Main Courses (15)
▶ Desserts (6)
```

**2. Tabs**
- **Use for:** Organizing related content into categories
- **Interaction:** Tap to switch views
- **Best for:** 3-5 categories maximum
- **Reduce:** Vertical scrolling by categorizing content

**Example: Restaurant Info**
```
[Menu] [About] [Reviews] [Hours]
```

**3. Hamburger Menus**
- **Use for:** Secondary navigation, settings
- **NOT for:** Primary features (use tab bar instead)
- **Visual:** ≡ three-line icon
- **Discoverable but hidden** until needed

**4. Dropdown Menus**
- **Use for:** Forms with many options (country, state)
- **Keep simple:** Show common options first
- **Search within:** For long lists (>20 items)

**5. Modal/Bottom Sheets**
- **Use for:** Complex actions, forms, details
- **Dismissible:** Easy to close and return
- **Focus:** Single task completion

**6. Show More / Load More**
- **Use for:** Long content, lists
- **Initial load:** Show 10-20 items
- **"Show more"** button or infinite scroll
- **Performance:** Better than loading everything upfront

**7. Expandable Cards**
- **Use for:** Product listings, articles
- **Preview:** Title, image, snippet
- **Tap to expand:** Full details in place or new screen

### Implementation Strategies

**Start Simple, Add Complexity:**
1. **Default view:** Core functionality only
2. **Progressive reveal:** Advanced features as user becomes proficient
3. **User-triggered:** User requests more info/options
4. **Context-aware:** Show relevant options based on current task

**Example: Camera App**
- **Default:** Shutter button, flip camera, flash toggle
- **Advanced:** Tap settings for HDR, timer, grid, filters
- **Pro mode:** Separate tab for manual controls (ISO, shutter speed)

### Benefits

- **Smaller cognitive workload** - process less info at once
- **Simplifies UI** - cleaner, less cluttered
- **Faster task completion** - remove distractions
- **Scalable** - add features without bloating UI

### When NOT to Use

❌ **Don't hide primary features** - must be immediately visible
❌ **Don't hide frequently used actions** - creates friction
❌ **Don't hide time-sensitive info** - delivery status must be prominent
❌ **Don't nest too deep** - max 2-3 levels

### Accessibility

- **Screen readers** must announce expandable items
- **ARIA attributes:** `aria-expanded="true/false"`
- **Keyboard navigation:** Enter/Space to expand
- **Visual indicators:** Clear affordance (arrows, +/- icons)

---

## 🔄 Pull-to-Refresh & Swipe Gestures

### Pull-to-Refresh

**When to Use:**
- **Lists sorted by recent** (newest first)
- **Feeds** (social media, news)
- **Inbox/messages**
- **Order history**

**When NOT to Use:**
- **Maps** (no primary direction)
- **Non-ordered lists** (alphabetical, categorical)
- **Lists sorted oldest-first** (use refresh button instead)
- **Static content** (doesn't update frequently)

**Design Pattern:**
1. **User pulls down** from top of scrollable content
2. **Resistance felt** - visual indicator appears (spinner)
3. **Release to refresh** - must exceed threshold (~60px)
4. **Loading** - spinner animates, content updates
5. **Complete** - spinner disappears, new content shown

**Visual Feedback:**
- **Circular spinner** most common
- **Opacity/speed changes** as user pulls
- **Threshold indicator** - shows when far enough
- **Animation** smooth, spring-like release

**Accessibility:**
- **Not discoverable** - hidden gesture
- **Provide alternative** - refresh button in toolbar
- **Visual indicator** helps discoverability (arrow + "Pull to refresh")

### Swipe Gestures

**Common Swipe Actions:**

**1. Swipe to Delete** (Left swipe on iOS, varies on Android)
- **Primary use:** Remove items from lists
- **Visual:** Red background revealed behind item
- **Confirmation:** "Delete" button or immediate action
- **Undo option:** Snackbar with "Undo" for 5 seconds

**2. Swipe to Reveal Actions**
- **Leading edge swipe:** Primary actions (complete, mark read)
- **Trailing edge swipe:** Secondary actions (delete, archive)
- **Visual:** Icon + color-coded background
- **Multiple actions:** Show 2-3 buttons max

**Example: Email App**
```
<-- Swipe right: Mark Read (blue)
    Swipe left: Delete (red) -->
```

**3. Swipe Between Screens**
- **Horizontal swipe:** Navigate between tabs/views
- **Visual:** Pages slide in/out
- **Pagination indicators:** Dots show which screen
- **Smooth animation:** Follow finger, spring on release

**4. Swipe to Dismiss** (Modals, Notifications)
- **Vertical swipe down:** Dismiss bottom sheets
- **Horizontal swipe:** Dismiss notifications
- **Threshold:** Must swipe >40% to dismiss
- **Spring back:** If threshold not met

### Best Practices

**Discoverability:**
- **Hidden controls** - users may not know they exist
- **Teaser animation:** Slightly shift items to hint at swipe (first use)
- **Tutorial:** Show swipe gestures in onboarding
- **Icons visible:** Don't rely solely on swipe - show overflow menu too

**Affordances:**
- **Large swipe area:** 48dp minimum height
- **Visual feedback:** Item moves with finger
- **Resistance:** Can't swipe too far (max 200-300px)
- **Color coding:** Red = destructive, Green = positive, Blue = info

**Accessibility:**
- **Long-press alternative:** Context menu with same actions
- **Button alternatives:** Tap to select, show actions
- **Screen reader:** Announce "Swipeable list item"
- **Motor impairments:** Swipe can be difficult, always provide alternative

**Performance:**
- **60fps animations:** Use transform, not layout properties
- **Debounce actions:** Don't trigger on accidental swipes
- **Cancel gesture:** Swipe back cancels action

### Common Patterns

**Mail Apps:**
- Swipe right: Mark as read / Archive
- Swipe left: Delete
- Full swipe: Immediate action
- Partial swipe: Reveal buttons

**Task Apps:**
- Swipe right: Complete
- Swipe left: Delete
- Long swipe: Additional options

**Social Apps:**
- Swipe between tabs (Stories, Feed, Messages)
- Swipe on items: Hide, Save, Report

### Platform Differences

**iOS:**
- **Swipe-to-delete** expected on list items
- **Full swipe** for immediate action
- **Back swipe** from left edge to go back (system gesture)

**Android:**
- **Swipe-to-dismiss** for notifications
- **Swipe actions** less standardized (varies by app)
- **Back button** preferred over back gesture

---

## 📳 Haptic Feedback

### Platform Capabilities

**iOS (Taptic Engine):**
- **Nuanced control** via Core Haptics
- **High-quality actuators** in all modern iPhones
- **Consistent feel** across devices
- **3 impact types:** Light, Medium, Heavy
- **Notification types:** Success, Warning, Error

**Android:**
- **Varies by device** - quality differs significantly
- **HapticFeedbackConstants** - action-oriented (recommended)
- **VibrationEffect** - custom patterns (use cautiously)
- **Fallback behavior** - system provides defaults
- **Shifting toward** iOS-style predefined effects

### Types of Haptics

**1. Clear Haptics** (Recommended)
- **Crisp, clean sensations** for discrete events
- **Mimics mechanical action** (button click)
- **Examples:** Keyboard taps, toggle switches, picker scrolls

**2. Rich Haptics** (Use Sparingly)
- **Expressive, complex patterns**
- **Requires wide frequency bandwidth**
- **Examples:** Game feedback, immersive experiences

**3. Buzzy Haptics** (Avoid)
- **Low-quality vibrations**
- **Legacy Android pattern**
- **Rule:** Buzzy haptics or no haptics? Choose no haptics.

### When to Use Haptic Feedback

**Appropriate Use Cases:**
- **Button presses** - confirm interaction
- **Toggle switches** - tactile "click" at transition
- **Success actions** - payment confirmed, order placed
- **Error states** - form validation failed
- **Selection** - picker wheel stops on selection
- **Drag & drop** - item picked up, dropped
- **Pull-to-refresh** - threshold reached
- **System gestures** - swipe to go back (iOS)

**When NOT to Use:**
- **Every tap** - becomes annoying fast
- **Scrolling** - too frequent
- **Typing** (optional) - user preference
- **Background events** - app not in focus
- **Rapidly repeated** - vibration fatigue

### Design Principles

**Match Other Feedback:**
- **Haptic + Visual + Audio** must align
- **Timing:** Simultaneous, not delayed
- **Intensity:** Matches importance of action

**Consistency:**
- **Similar actions** = similar haptics
- **System alignment** - match platform conventions
- **App-wide patterns** - don't vary randomly

**Frequency & Importance:**
- **Frequent actions** - light or no haptic
- **Rare important actions** - medium to strong haptic
- **Critical actions** - strong haptic (payment, delete)

### iOS Implementation

**UIImpactFeedbackGenerator:**
- **Light:** Minor interactions (keyboard)
- **Medium:** Moderate interactions (button tap)
- **Heavy:** Significant interactions (deletion)

**UINotificationFeedbackGenerator:**
- **Success:** Positive outcome (✓ saved)
- **Warning:** Caution (⚠️ low storage)
- **Error:** Negative outcome (✗ failed)

**UISelectionFeedbackGenerator:**
- **Selection changes:** Picker, segmented control

### Android Implementation

**HapticFeedbackConstants (Recommended):**
- **VIRTUAL_KEY** - Keyboard tap
- **LONG_PRESS** - Long press activation
- **KEYBOARD_TAP** - System keyboard
- **CONTEXT_CLICK** - Right-click equivalent
- **Action-oriented** - matches user intent

**Avoid Legacy `vibrate()`:**
- Deprecated in newer Android versions
- Use **VibrationEffect** if custom patterns needed
- Always check device capability

### Accessibility Considerations

**User Sensitivities:**
- **Too intense** = overwhelming for some users
- **Unexpected** = jarring for sensory processing differences
- **Preference:** Provide setting to reduce/disable haptics

**Best Practices:**
- **Crisp & predictable** - short, clear pulses
- **Test on real devices** - simulator doesn't convey feel
- **Gather feedback** - comfort, clarity, annoyance levels
- **System settings** - respect user's haptic preferences

### Testing

**Critical:**
- **Must test on physical devices** - simulators can't replicate feel
- **Vary by device** - iPhone 8 ≠ iPhone 15 Pro
- **Android fragmentation** - test across brands (Samsung, Google, OnePlus)
- **User testing** - ask about comfort and clarity

---

## 🌙 Dark Mode Design

### Why Support Dark Mode

- **User preference** - 70%+ enable dark mode
- **Battery savings** - OLED screens (30-40% less power)
- **Eye strain** - easier viewing in low light
- **Accessibility** - some users need it for visual impairments
- **Modern expectation** - users expect it in 2025

### Color Foundations

**Background Colors:**
- **Avoid pure black (#000000)** - causes eye strain, halation effect
- **Use dark gray (#121212)** - Material Design recommendation
- **iOS dark:** #1C1C1E (slightly warmer)
- **Alternative:** #0D0D0D for true dark lovers

**Surface Elevation:**
```
Level 0: #121212 (base)
Level 1: #1E1E1E (cards)
Level 2: #232323 (nav bar)
Level 3: #272727 (modals)
Level 4: #2C2C2C (dialogs)
```

Higher surfaces = slightly lighter (easier to see depth)

**Text Colors:**
- **Primary:** 87% white (#DEDEDE) - main content
- **Secondary:** 60% white (#999999) - supporting text
- **Disabled:** 38% white (#616161) - inactive elements
- **Never pure white** - too harsh, strains eyes

### Color Contrast Standards

**WCAG Requirements:**
- **Normal text:** 4.5:1 contrast minimum
- **Large text (18pt+ / 14pt+ bold):** 3:1 minimum
- **UI components:** 3:1 vs adjacent colors
- **Test with tools:** Contrast Analyzer, Stark plugin

**Saturation Matters:**
- **Desaturate colors** in dark mode (pastels)
- **Saturated colors** appear overly intense, cause eye strain
- **Example:** Blue #0066FF (light mode) → #5A9FFF (dark mode)

**Color Vibration:**
- **High saturation + dark background** = visual vibration
- **Solution:** Reduce saturation 20-30%
- **Test:** Stare at UI for 30 seconds - does it hurt?

### Imagery & Media

**Photos & Illustrations:**
- **Reduce brightness 10-20%** - prevent eye strain
- **Overlay:** 10-20% black overlay on bright images
- **Thumbnails:** Subtle border so edges are visible on dark bg

**Icons:**
- **Outlined icons** preferred in dark mode
- **Filled icons** for active states
- **Color:** White/light gray, not colored (less distraction)

### Practical Implementation

**System Detection:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #121212;
    --text-primary: #E0E0E0;
    --accent: #5A9FFF;
  }
}
```

**User Toggle:**
- **Respect system preference** as default
- **Allow manual override** - stored in user settings
- **Easy toggle** - settings, menu bar, or profile
- **Sync across devices** for logged-in users

**Smooth Transition:**
```css
* {
  transition: background-color 0.3s ease,
              color 0.3s ease;
}
```

### Testing

**Multiple Devices:**
- **OLED vs LCD** - appearance differs
- **iPhone, Samsung, Pixel** - different calibrations
- **Brightness levels** - test at 20%, 50%, 100%
- **Different lighting** - dark room, sunlight, office

**Automated Testing:**
- **Contrast checker** - all text meets WCAG
- **Color blindness simulation** - accessible for all
- **Screenshot comparison** - light vs dark consistency

**User Testing:**
- **Astigmatism users** may struggle with white-on-dark
- **Offer high-contrast option** for those who need it
- **Monitor feedback** - eye strain, readability issues

### Common Mistakes

❌ **Pure black background** - too harsh
❌ **Pure white text** - too harsh
❌ **Saturated colors** - cause vibration
❌ **Same colors as light mode** - adjust saturation
❌ **No elevation** - everything flat, hard to distinguish
❌ **Forgetting images** - bright photos strain eyes
❌ **Forcing dark mode** - always allow user choice

### Best Practices

✅ **Test in actual darkness** - not just office lighting
✅ **Provide toggle** - easy to switch
✅ **Consistent elevation** - clear depth hierarchy
✅ **Desaturate colors** - reduce intensity
✅ **Accessibility first** - contrast, color blindness
✅ **System integration** - respect user's OS preference
✅ **Document colors** - design system with dark variants

---

## 🍽️ Restaurant App Specific Best Practices

### Menu Browsing
- **Search First:** Prominent search bar at top
- **Visual Menu:** High-quality food photos
- **Quick Filters:** Dietary restrictions, categories
- **Clear Pricing:** Always visible, no surprises
- **Item Details:** Tap for ingredients, allergens, customization

### Ordering Flow
- **Cart Access:** Persistent cart icon with item count
- **One-Tap Add:** Add to cart from list view
- **Easy Modification:** Edit items directly in cart
- **Clear Checkout:** Step-by-step with progress indicator
- **Multiple Payment:** Cards, digital wallets, split bills

### Order Tracking
- **Real-Time Status:** Clear progress indicators
- **GPS Tracking:** Live courier location on map
- **Time Estimates:** Accurate delivery/pickup times
- **Notifications:** Push alerts for status changes
- **Contact Options:** Quick access to support

### Personalization
- **Past Orders:** Quick reorder with one tap
- **Favorites:** Save frequently ordered items
- **Recommendations:** Based on order history
- **Custom Preferences:** Remember dietary restrictions, addresses
- **Ratings:** Easy post-order feedback

---

## ⚡ Performance Best Practices

### Loading & Speed
- **Initial Load:** <3 seconds target
- **Images:** Lazy load, progressive enhancement
- **Animations:** 60fps smooth (avoid jank)
- **Caching:** Store frequently accessed data locally
- **Offline Mode:** Basic functionality without connection

### Optimization
- **Image Compression:** WebP format, responsive sizes
- **Code Splitting:** Load only what's needed
- **Reduce Requests:** Bundle assets, use CDN
- **Database Queries:** Paginate large lists
- **Background Sync:** Update data when app is idle

### Error Handling
- **Graceful Degradation:** Show cached content when offline
- **Clear Messages:** Explain what went wrong, offer solutions
- **Retry Actions:** Easy way to retry failed operations
- **Error Reporting:** Track issues for improvement

---

## 📡 Offline Functionality & Data Sync

### Critical Statistics
- **80% of app usage by 2025** will involve offline or low-data mode (Gartner)
- **Offline-first is now standard**, not exception
- Users expect apps to work without constant internet

### Offline-First Architecture

**Core Principle:** Design your app to function without internet, then sync when connectivity is restored.

**Local Storage Options:**
- **SQLite/Realm** - Structured data (orders, user data)
- **SharedPreferences/UserDefaults** - Simple key-value pairs (settings)
- **IndexedDB** (Web) - Browser-based storage
- **File System** - Images, documents, cache

### Sync Patterns

**1. Pull-Based Sync** (Client Requests)
- User initiates refresh (pull-to-refresh)
- App checks for updates on launch
- **Best for:** News feeds, social media, content apps
- **Pros:** Lower server load, user control
- **Cons:** Might miss real-time updates

**2. Push-Based Sync** (Server Initiates)
- Server sends updates via push notifications or WebSocket
- Real-time data propagation
- **Best for:** Messaging, collaboration apps, live updates
- **Pros:** Instant updates, always current
- **Cons:** Higher server load, battery drain

**3. Bidirectional Sync**
- Both client and server can initiate sync
- Changes merge from both directions
- **Best for:** Note-taking, CRM, collaborative tools
- **Requires:** Robust conflict resolution

**4. Hybrid Approach** (Recommended for Restaurants)
- Pull for menu updates, restaurant info
- Push for order status, delivery updates
- Best of both worlds

### Offline Indicators

**Connection Status:**
```
┌─────────────────────────┐
│ ⚠️ You're offline      │
│ Orders will sync when   │
│ connection is restored  │
└─────────────────────────┘
```

**Visual Patterns:**
- **Banner at top** - persistent, non-intrusive
- **Grayed-out UI** - unavailable features clearly indicated
- **Cached indicator** - "Last updated 5 min ago"
- **Queued actions** - "3 actions pending sync"

**Colors:**
- 🟢 Green - Connected
- 🟡 Yellow - Slow connection
- 🔴 Red - Offline
- 🔵 Blue - Syncing

### Data Optimization

**Minimize Transferred Data:**
- **Compression:** GZIP, Brotli for text/JSON
- **Delta updates:** Send only changes, not full data
- **Pagination:** Load 20-50 items at a time
- **Lazy loading:** Images, non-critical content
- **WebP images:** 25-35% smaller than JPEG

**Smart Syncing:**
- **WiFi-only sync** for large data (photos, videos)
- **Background sync** when idle (WorkManager, Background Fetch)
- **Batch operations** - sync multiple changes at once
- **Adaptive sync frequency** - more often when active, less when idle

### Conflict Resolution

**Common Strategies:**

**1. Last Write Wins** (Simplest)
- Most recent change overwrites
- **Risk:** Lost updates
- **Use for:** Non-critical data (preferences)

**2. Timestamp-Based**
- Compare timestamps, keep newer
- **Better than:** Last write wins
- **Use for:** User-generated content

**3. Version Vectors**
- Track change history across devices
- Detect conflicts accurately
- **Use for:** Collaborative editing

**4. Operational Transform**
- Apply changes as operations, not states
- Resolve conflicts algorithmically
- **Use for:** Real-time collaboration (Google Docs)

**Restaurant App Strategy:**
- **Order edits:** Last write wins (short window)
- **Cart:** Merge items from different devices
- **Favorites:** Union of favorites from all devices
- **Payment:** Server-authoritative (no conflict possible)

### UX Patterns

**Queue Pending Actions:**
```
🔄 Syncing...
✓ Order placed (synced)
⏳ Review submitted (pending)
⏳ Profile updated (pending)
```

**Retry Strategy:**
- **Exponential backoff:** 1s, 2s, 4s, 8s, 16s...
- **Max retries:** 5-10 attempts
- **User notification:** "Couldn't sync. Retry now?"
- **Background retry:** Auto-retry when connection restored

**Clear Communication:**
- "Working offline - changes will sync later"
- "Last synced 2 minutes ago"
- "Syncing 3 items..."
- "Sync complete ✓"

### Best Practices

✅ **DO:**
- Cache critical user data locally
- Show clear offline indicators
- Queue actions for later sync
- Implement smart retry logic
- Test offline scenarios extensively

❌ **DON'T:**
- Block UI during sync
- Lose user data on failed sync
- Sync unnecessarily (battery drain)
- Hide sync status from users
- Assume constant connectivity

---

## 🔐 Permissions & Privacy

### Permission Request Timing

**Golden Rule: Ask only when needed, not upfront**

**Context-Related Requests** (Best)
- User taps camera icon → request camera permission
- User taps "Use My Location" → request location
- **Acceptance rate:** 70-90%

**System-Initiated Requests** (Avoid)
- Ask on app launch without context
- **Acceptance rate:** 20-40%
- **Result:** Users confused, deny by default

### Permission Priming

**Two-Step Process:**

**1. Soft Ask** (Your custom UI)
```
┌─────────────────────────────┐
│  📷 Enable Camera Access?   │
│                              │
│  We need camera access to   │
│  scan QR codes on tables    │
│                              │
│  [Not Now]  [Allow Camera]  │
└─────────────────────────────┘
```

**2. Hard Ask** (System dialog - shown only if user taps "Allow")
- iOS/Android standard permission dialog
- **One chance only** - if denied, hard to re-enable

### Permission Types

**Location:**
- **Precise:** GPS coordinates
- **Approximate:** City-level (iOS 14+)
- **While Using:** Only when app is active
- **Always:** Background location (requires strong justification)

**Restaurant App Needs:**
- **Approximate location** for finding nearby restaurants
- **Precise only for delivery** address confirmation
- **Never "Always"** - not needed for restaurant apps

**Camera:**
- **Restaurant use cases:** QR code menu scanning, food photo sharing
- **Request timing:** When user taps "Scan QR" or "Add Photo"

**Microphone:**
- **Rarely needed** for restaurant apps
- **Possible use:** Voice ordering (accessibility feature)

**Photos:**
- **Read access:** Share food photos to social
- **Write access:** Save loyalty QR codes
- **Limited Photos (iOS 14+):** User picks specific photos

**Notifications:**
- **Order status updates**
- **Delivery alerts**
- **Promotional offers** (must allow opt-out)

### Platform Differences

**iOS:**
- **Privacy nutrition labels** in App Store (must be accurate!)
- **ATT (App Tracking Transparency)** required for cross-app tracking
- **Privacy indicators** - orange dot (mic), green dot (camera) when active
- **One-time permission prompts** - user must go to Settings to re-enable

**Android:**
- **Runtime permissions** (Marshmallow+)
- **Permission groups** - related permissions grouped
- **Rationale required** - explain before requesting
- **Background location** requires separate justification dialog

### Handling Denials

**If User Denies Permission:**

**Option 1: Graceful Degradation**
```
📍 Location access denied
You can still browse restaurants,
but we can't show nearby options.

[Enable Location] [Continue Without]
```

**Option 2: Feature Blocker** (use sparingly)
```
📷 Camera required
This feature requires camera access
to scan QR codes.

[Go to Settings] [Cancel]
```

**Deep Link to Settings:**
- iOS: `UIApplication.openSettings()`
- Android: `Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)`

### GDPR & CCPA Compliance

**Consent Requirements:**
- **Freely given** - no forced consent
- **Specific** - per purpose, not blanket
- **Informed** - explain what data, why, how long
- **Unambiguous** - active opt-in, not pre-checked
- **Withdrawable** - easy to revoke anytime

**Consent UI Pattern:**
```
🍪 We use cookies and collect data
☐ Essential (always on)
☐ Analytics - Help us improve
☐ Marketing - Personalized offers
☐ Social Media - Share features

[Reject All] [Accept Selected] [Accept All]
```

**Privacy Indicators:**
- **Camera/Mic active** - orange/green dots (iOS)
- **Background location** - blue bar (iOS) / notification (Android)
- **Data access** - "Clipboard accessed" toast (iOS 14+)

### Best Practices

✅ **DO:**
- Use soft ask before system dialog
- Explain clearly why permission is needed
- Request minimum necessary access (coarse location, not fine)
- Provide graceful degradation
- Deep link to Settings when denied
- Test permission flows thoroughly
- Respect user privacy always

❌ **DON'T:**
- Ask for permissions on launch
- Request all permissions at once
- Use generic explanations ("to improve experience")
- Hide behind legal jargon
- Track without consent
- Make app unusable if permission denied (unless truly required)

---

## 📱 Tablet & Landscape Mode

### Responsive Breakpoints

**Common Device Sizes:**
- **Phone Portrait:** 320-428px width
- **Phone Landscape:** 568-926px width
- **Tablet Portrait:** 768-834px width
- **Tablet Landscape:** 1024-1366px width
- **Foldables:** Variable (fold/unfold states)

**Material Design Breakpoints:**
- **Compact:** 0-599dp (phone)
- **Medium:** 600-839dp (tablet portrait, foldables)
- **Expanded:** 840dp+ (tablet landscape, desktop)

### Layout Strategies

**1. Reflow Layout** (Simplest)
- Same UI elements, different arrangement
- Single column → Two column in landscape
- **Example:** List becomes grid

**2. Adaptive Layout** (Better)
- Add/remove components based on space
- Show sidebar in landscape, hide in portrait
- **Example:** Master-detail view

**3. Responsive Components**
- Components resize/reorganize internally
- Navigation bar → Drawer (phone) vs Tabs (tablet)
- **Example:** Restaurant menu cards 1 col → 2-3 col

### Orientation Changes

**Handle Gracefully:**
- **Preserve state** - don't reset form inputs, scroll position
- **Smooth transitions** - animate layout changes (200-300ms)
- **Lock orientation** - for specific screens (camera, video)

**Restaurant App Examples:**

**Menu Screen:**
- **Portrait:** Single column, cards stacked
- **Landscape:** Two columns, side-by-side
- **Tablet:** Three columns + filters sidebar

**Order Details:**
- **Portrait:** Scrollable single view
- **Landscape:** Split view - items left, summary right
- **Tablet:** Add order history sidebar

**Checkout:**
- **Portrait:** Multi-step, one step per screen
- **Landscape:** Side-by-side (form left, summary right)
- **Tablet:** Single screen, all visible

### Foldable Devices

**Screen States:**
- **Folded:** Standard phone (cover screen)
- **Half-Open:** Book mode, laptop mode
- **Fully Open:** Tablet size

**Fold Awareness:**
- **Avoid fold line** - don't split critical UI across hinge
- **Use dual screens** - menu on one side, details on other
- **Flex mode** - video top half, controls bottom half

**Testing:**
- **Samsung Galaxy Fold/Flip** most common
- **Android Emulator** has foldable configs
- **Responsive design** mostly handles it

### Tablet-Specific Patterns

**Multi-Pane Layouts:**
```
┌────────────┬─────────────────┐
│            │                 │
│  Sidebar   │  Main Content   │
│  Menu      │  Details        │
│            │                 │
└────────────┴─────────────────┘
```

**Split View:**
- **1/3 - 2/3 split** for master-detail
- **Resizable divider** (optional)
- **Collapse sidebar** to full-width on phone

**Floating Windows:**
- **iPad: Slide Over, Split View** (iOS multitasking)
- **Android: Multi-window** (split screen apps)
- **Handle gracefully** - app continues working in smaller size

### Landscape Considerations

**Navigation:**
- **Tab bar** moves to side (Android)
- **Bottom nav** stays bottom (iOS)
- **Horizontal space** - show more menu items, less hamburger menu

**Content:**
- **Reduce vertical scrolling** - use horizontal space
- **Full-width cards** become narrower (max 600-800px)
- **Center content** with margins on wide screens

**Touch Zones:**
- **Harder to reach top corners** in landscape
- **Keep primary actions** in bottom 2/3 of screen
- **Use both hands** assumption (landscape = two-handed use)

### Best Practices

✅ **DO:**
- Test all orientations (portrait, landscape, tablet)
- Use responsive layout systems (CSS Grid, Flexbox, Android ConstraintLayout)
- Preserve state during orientation changes
- Adapt navigation patterns to screen size
- Test on foldable emulators
- Use max-width for content (prevent ultra-wide text blocks)

❌ **DON'T:**
- Lock to portrait only (unless necessary)
- Stretch phone UI to tablet without redesign
- Split important content across fold line
- Assume all tablets are iPads (Android tablets too!)
- Forget landscape mode entirely

---

## 🌍 Internationalization (i18n) & Localization

### RTL Language Support

**600 million people speak RTL languages** (Arabic, Hebrew, Persian, Urdu)

**UI Mirroring:**
```
LTR:  [←Back] [Title]      [Menu≡]
RTL:  [≡Menu] [Title]      [Back→]
```

**What to Mirror:**
- **Navigation arrows** - back/forward buttons
- **Drawer menus** - slide from right instead of left
- **Text alignment** - right-aligned text
- **Icons with direction** - arrows, chevrons

**What NOT to Mirror:**
- **Media controls** - play button always points right
- **Clocks** - clockwise is universal
- **Progress bars** - left-to-right (established convention)
- **Numbers** - Arabic numerals still left-to-right

### Text Expansion

**Languages expand/contract vs English:**
- **German:** +35% longer (Compound words: "Geschwindigkeitsbegrenzung")
- **French:** +20-30% longer
- **Spanish:** +15-20% longer
- **Chinese/Japanese:** -30% shorter (Dense characters)
- **Thai:** +20% longer (No spaces between words)

**UI Implications:**
- **Don't hardcode widths** - use flexible layouts
- **Test with longest translation** (usually German)
- **Multi-line buttons** - allow text wrapping
- **Truncation strategy** - ellipsis (...) for overflow
- **Icon + text** - icons don't need translation

### String Externalization

**Never Hardcode:**
```
❌ BAD: <button>Submit Order</button>

✅ GOOD: <button>{t('order.submit')}</button>
```

**Resource Files:**
```
en.json:
{
  "order.submit": "Submit Order",
  "order.total": "Total: ${{amount}}"
}

es.json:
{
  "order.submit": "Enviar Pedido",
  "order.total": "Total: ${{amount}}"
}
```

**Variable Substitution:**
- **Use placeholders:** `{name}`, `{{count}}`, `%s`, `%@`
- **Support plurals:** Different strings for 1 item vs many
- **Date/time formatting:** Locale-aware (MM/DD vs DD/MM)
- **Currency:** Symbol placement, decimal separators

### Pluralization

**English (Simple):**
- 0 items, 1 item, 2 items

**Russian (Complex):**
- 1 предмет (1, 21, 31, ...)
- 2 предмета (2-4, 22-24, ...)
- 5 предметов (0, 5-20, 25-30, ...)

**Solution:** Use i18n library with plural rules
```javascript
t('cart.items', { count: 3 })
// EN: "3 items"
// RU: "3 предмета"
```

### Cultural Considerations

**Dates & Times:**
- **US:** MM/DD/YYYY, 12-hour (3:00 PM)
- **Europe:** DD/MM/YYYY, 24-hour (15:00)
- **ISO 8601:** YYYY-MM-DD (international standard)
- **Use:** Locale-aware formatters (Intl.DateTimeFormat, NSDateFormatter)

**Numbers:**
- **US:** 1,234.56 (comma thousands, period decimal)
- **Europe:** 1.234,56 (period thousands, comma decimal)
- **India:** 1,23,456.78 (lakhs system)

**Currency:**
- **US:** $1,234.56
- **Europe:** 1.234,56 €
- **Japan:** ¥1,234
- **Position varies:** Before ($10) or after (10€)

**Names:**
- **Western:** First Last (John Smith)
- **Eastern:** Last First (Smith John)
- **Single field** problematic - use separate fields
- **Honorifics:** Mr/Mrs/Ms may not translate

**Colors:**
- **Red:** Danger (West), Good luck (China), Death (South Africa)
- **White:** Purity (West), Death (China)
- **Cultural context** matters for brand colors

### Testing

**Pseudo-Localization:**
```
Original: "Submit Order"
Pseudo:   "[!!! Śűƀɱĭŧ Öřɗéř !!!]"
```

**Benefits:**
- **Find hardcoded strings** - untranslated text stands out
- **Test text expansion** - accented characters are longer
- **Find encoding issues** - special characters break?
- **Visual check** - does UI accommodate?

**Test Devices:**
- **Change device language** to target locale
- **Test RTL** - Hebrew/Arabic
- **Test long strings** - German
- **Test character sets** - Chinese, Arabic, Thai

### Best Practices

✅ **DO:**
- Externalize all user-facing strings
- Use Unicode (UTF-8) encoding
- Support RTL languages from day one
- Test with longest translations (German)
- Use locale-aware formatters (dates, numbers, currency)
- Support plural forms properly
- Hire native speakers to review translations
- Use professional translation services (not Google Translate)
- Test on actual devices in target languages

❌ **DON'T:**
- Hardcode text in UI
- Assume English word order
- Use fixed-width containers
- Concatenate translated strings (grammar breaks)
- Use images with text (can't translate)
- Ignore RTL languages (huge markets!)
- Rely on machine translation for production
- Forget about plurals and gender
- Use flags for language selection (one flag ≠ one language)

---

## 🎥 Media Playback Patterns

### Video Playback

**Inline vs. Fullscreen:**

**Inline Video** (Recommended for feeds)
- Plays within scroll view
- Auto-plays on mute as user scrolls
- Tap to unmute, double-tap for fullscreen
- **Use for:** Restaurant ambiance videos, dish prep videos

**Fullscreen Video** (Immersive content)
- Takes over entire screen
- Landscape orientation preferred
- Native controls (play, scrub, volume)
- **Use for:** Tutorial videos, chef interviews

**Playback Controls:**
```
┌─────────────────────────────┐
│       [Video Player]         │
│                              │
│  ◀ 15s  ⏯  15s ▶  [⛶]    │
│  ━━━━━━●━━━━━━━  2:34/5:12 │
└─────────────────────────────┘
```

**Standard Controls:**
- **Play/Pause** - center tap or button
- **Seek** - scrubber bar, or 15s skip buttons
- **Volume** - system volume, or on-screen slider
- **Fullscreen** - expand icon (⛶)
- **Closed captions** - CC button (accessibility!)
- **Playback speed** - 0.5x, 1x, 1.5x, 2x

### Background Playback

**Use Cases:**
- **Audio only** - podcasts, music
- **Video continues** - YouTube Premium, Netflix (audio only when locked)
- **Restaurant app:** Not typically needed (short clips)

**Implementation:**

**iOS:**
- Enable **Background Modes** capability → Audio
- Configure **AVAudioSession** category: `.playback`
- Handle **MPRemoteCommandCenter** for lock screen controls

**Android:**
- Use **MediaSession** API
- Create **foreground service** with notification
- Handle **MediaButtonReceiver** for headphone controls

### Lock Screen Controls

**Standard Media Controls:**
```
┌─────────────────────────┐
│   [Album Art/Thumbnail] │
│                          │
│   Title                 │
│   Artist/Channel        │
│                          │
│   ◀◀  ⏸  ▶▶           │
│   ━━━●━━━━━━━━          │
└─────────────────────────┘
```

**Required Metadata:**
- **Title** - "Homemade Pasta Tutorial"
- **Artist/Source** - "Chef Mario's Kitchen"
- **Artwork** - Thumbnail image (512x512px recommended)
- **Duration** - Total time
- **Current position** - Progress

**Supported Actions:**
- Play/Pause
- Next/Previous (if playlist)
- Seek forward/back (15s, 30s)
- Like/Dislike (optional)

### Picture-in-Picture (PiP)

**iOS 14+ & Android 8+:**
- Video continues in small floating window
- User can navigate app while watching
- Drag to reposition, pinch to resize
- Tap to return to fullscreen

**Restaurant App Use Case:**
- User watching cooking video
- Can browse menu while video plays
- Can add items to cart without interrupting video

**Implementation:**
- **iOS:** `AVPictureInPictureController`
- **Android:** `PictureInPictureParams`
- **Auto-enter PiP** when user goes Home or switches apps

### Audio Playback

**Background Audio:**
- **Music apps** - Spotify, Apple Music
- **Podcast apps** - Overcast, Pocket Casts
- **Restaurant app:** Possibly for ambient music selection

**Handling Interruptions:**
- **Phone call** - pause, resume after call ends
- **Another app** - pause if other app takes audio focus
- **Headphones unplugged** - pause immediately
- **Alarm/Timer** - duck volume temporarily

**Audio Session Management:**
```
- Start playing → acquire audio focus
- Pause → release audio focus
- Interruption → pause, wait for resume
- User switches app → continue in background
```

### Camera Integration

**Use Cases for Restaurant Apps:**
- **QR code scanning** - table numbers, menu access
- **Food photo** - share on social, reviews
- **AR menu** - visualize dish on table (future)

**Camera UI Patterns:**

**Full-Screen Camera:**
```
┌─────────────────────────────┐
│ [✕]  Camera    [Flash⚡]   │
│                              │
│                              │
│      [Viewfinder]            │
│                              │
│                              │
│ [Gallery] [●Shutter] [↻Flip]│
└─────────────────────────────┘
```

**QR Scanner:**
```
┌─────────────────────────────┐
│        Scan QR Code          │
│                              │
│    ┌─────────────┐          │
│    │ [QR Guide]  │          │
│    │   Square    │          │
│    └─────────────┘          │
│  Point camera at QR code     │
└─────────────────────────────┘
```

**Camera Controls:**
- **Shutter button** - 64-72dp circle, bottom center
- **Flash toggle** - Auto/On/Off
- **Camera flip** - Front/Back camera
- **Gallery access** - View recent photos
- **Cancel** - Exit camera, return to app

### Gallery & Image Picker

**Native Pickers (Recommended):**
- **iOS:** PHPickerViewController (iOS 14+)
- **Android:** Photo Picker (Android 13+)
- **Benefits:** Privacy-preserving, no permissions needed

**Multi-Select:**
- Allow selecting 1-10 photos for review
- Show count badge: "3 photos selected"
- Preview selected photos before upload

**Cropping:**
- **Square crop** for profile photos
- **16:9 crop** for cover photos
- **Free crop** for food photos
- Zoom and pan within crop area

### Best Practices

✅ **DO:**
- Use native video player controls
- Support PiP for long-form content
- Show loading states (buffering indicator)
- Respect reduced motion settings
- Provide closed captions
- Handle audio interruptions gracefully
- Request camera permission only when needed
- Use native photo picker (privacy!)

❌ **DON'T:**
- Auto-play video with sound (annoying!)
- Block UI during video load
- Drain battery with unnecessary background playback
- Forget landscape mode for fullscreen video
- Request full photo library access
- Play media without user interaction (policy violation)

---

## ♿ Accessibility Deep Dive

### Screen Reader Support

**VoiceOver (iOS) & TalkBack (Android)** are essential for blind/low-vision users.

**Core Principles:**
1. **Every interactive element** must be labeled
2. **Focus order** must be logical
3. **State changes** must be announced
4. **Gestures** must have alternatives

### Semantic HTML & Labels

**Accessibility Labels:**
```swift
// ❌ BAD
<button></button> // Screen reader: "Button"

// ✅ GOOD
<button aria-label="Add to cart">
  <img src="cart.png" />
</button>
// Screen reader: "Add to cart, button"
```

**Content Descriptions (Android):**
```kotlin
imageView.contentDescription = "Margherita Pizza"
// TalkBack: "Margherita Pizza, image"
```

**Accessibility Hints:**
```swift
button.accessibilityHint = "Double tap to place order"
// VoiceOver: "Place order, button. Double tap to place order."
```

### Touch Target Size

**Minimum:** 44x44pt (iOS) / 48x48dp (Android)
**Recommended:** 48x48pt for most users
**For motor impairments:** 56x56pt ideal

**Spacing Between Targets:**
- **Minimum:** 8dp between interactive elements
- **Comfortable:** 16dp prevents accidental taps
- **Dense UIs:** Use padding to expand touch area beyond visual

### Focus Management

**Focus Order:**
- **Top to bottom, left to right** (LTR languages)
- **Right to left, top to bottom** (RTL languages)
- **Logical flow** - don't jump around randomly

**Focus Indicators:**
- **Visible outline** around focused element
- **Color contrast:** 3:1 minimum vs background
- **Don't hide** outline (accessibility fail!)

**Modal Focus Trap:**
```
When modal opens:
1. Move focus to modal
2. Trap focus inside modal
3. ESC or X button closes modal
4. Return focus to trigger element
```

### Heading Structure

**Hierarchy Matters:**
```html
<h1>Restaurant Name</h1>
  <h2>Menu</h2>
    <h3>Appetizers</h3>
    <h3>Main Courses</h3>
  <h2>About Us</h2>
```

**Benefits:**
- Screen reader users can **navigate by headings**
- Jump to sections quickly
- Understand document structure

**Don't:**
- Skip heading levels (h1 → h3)
- Use headings for styling only
- Use multiple H1s (one per page)

### Color Contrast

**WCAG AA Standards:**
- **Normal text:** 4.5:1 contrast minimum
- **Large text (18pt+ or 14pt+ bold):** 3:1 minimum
- **UI components:** 3:1 vs adjacent colors

**Color Blindness:**
- **8% of men** have color blindness
- **Red-green** most common
- **Don't rely on color alone** - use icons, text, patterns

**Test Tools:**
- **Color Oracle** - simulates color blindness
- **Stark** (Figma plugin) - checks contrast
- **WebAIM Contrast Checker** - online tool

### Dynamic Type / Text Scaling

**iOS Dynamic Type:**
- Users can adjust system-wide text size
- **Support:** Use system fonts, relative sizing
- **Test:** Settings → Accessibility → Display & Text Size → Larger Text

**Android Font Scaling:**
- Scale factor: 1.0x to 2.0x
- **Support:** Use `sp` units for text (not `dp`)
- **Test:** Settings → Accessibility → Font size

**Layout Considerations:**
- Text might grow 200%+ at largest sizes
- **Don't truncate** important text
- **Reflow layout** - multi-line buttons OK
- **Scrollable** if content exceeds screen

### Gestures & Alternative Actions

**Standard Gestures:**
- **Tap** - activate element
- **Swipe left/right** - navigate between items (VoiceOver)
- **Two-finger tap** - "Magic Tap" (answer/hang up call)
- **Three-finger swipe** - scroll

**Provide Alternatives:**
- **Swipe to delete** → also show Edit button
- **Pinch to zoom** → also provide +/- buttons
- **Shake to undo** → also provide undo button
- **Long press** → also provide overflow menu

### Reduced Motion

**Motion Sensitivities:**
- **Vestibular disorders** - motion causes nausea, dizziness
- **ADHD** - animations distract
- **Anxiety** - excessive motion is stressful

**Detect Preference:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Respect Setting:**
- **Disable** parallax, complex animations
- **Keep** functional animations (loading spinners)
- **Crossfade** instead of slide transitions

### VoiceOver/TalkBack Gestures

**VoiceOver (iOS):**
| Gesture | Action |
|---------|--------|
| Swipe right | Next element |
| Swipe left | Previous element |
| Double tap | Activate |
| Two-finger tap | Magic tap (answer call, play/pause) |
| Rotor | Quick navigation (headings, links, buttons) |

**TalkBack (Android):**
| Gesture | Action |
|---------|--------|
| Swipe right | Next element |
| Swipe left | Previous element |
| Double tap | Activate |
| Swipe up then right | Home button |
| Swipe down then right | Back button |

### Testing Best Practices

**Test With Actual Users:**
- **Blind/low-vision** users for screen readers
- **Motor impaired** users for touch targets
- **Color blind** users for contrast
- **Deaf/hard-of-hearing** for captions

**Automated Testing:**
- **Accessibility Scanner** (Android)
- **Xcode Accessibility Inspector** (iOS)
- **axe DevTools** (Web)
- **Lighthouse** (Web)

**Manual Testing:**
- **Navigate entire app** with screen reader
- **Zoom to 200%** and check layout
- **Remove color** (grayscale) and check usability
- **Use keyboard only** (web) or switch control (mobile)

### Best Practices

✅ **DO:**
- Label all interactive elements
- Meet contrast requirements (4.5:1)
- Support dynamic type/text scaling
- Provide alternative actions to gestures
- Test with screen readers regularly
- Include closed captions on videos
- Respect reduced motion preferences
- Design with keyboard navigation in mind

❌ **DON'T:**
- Use color alone to convey information
- Hide focus indicators
- Use small touch targets (<44pt)
- Block screen reader access
- Auto-play videos with sound
- Use flashing animations (seizure risk)
- Ignore accessibility warnings
- Assume everyone uses your app the same way

---

## 🔒 Security & Privacy Indicators

### Privacy Indicators (iOS 14+, Android 12+)

**Visual Signals:**
- **Orange dot (iOS) / Orange icon (Android):** Microphone in use
- **Green dot (iOS) / Green icon (Android):** Camera in use
- **Blue bar (iOS) / Notification (Android):** Background location tracking
- **Clipboard accessed:** Toast notification (iOS 14+)

**App Icons Get Indicators:**
```
[App Icon] 🟢 - Camera active
[App Icon] 🟠 - Microphone active
```

**User Can Check:**
- **iOS:** Control Center shows which app used mic/camera recently
- **Android:** Privacy Dashboard shows all permission usage

### Data Collection Transparency

**Privacy Nutrition Labels (App Store):**

Must disclose:
- **Data Linked to You:** Name, email, location, purchases
- **Data Used to Track You:** Across apps/websites
- **Data Not Collected:** Clearly state if none

**Example Categories:**
- Contact Info (name, email, phone)
- Location (precise, coarse)
- Identifiers (device ID, user ID)
- Usage Data (product interactions, ads)
- Diagnostics (crash logs, performance)

**GDPR/CCPA Requirements:**
- **Right to know** - what data is collected
- **Right to delete** - user can request data deletion
- **Right to opt-out** - of data selling/tracking
- **Data breach notification** - within 72 hours (GDPR)

### Consent Management

**Consent Banner (First Launch):**
```
┌─────────────────────────────┐
│  🍪 We Value Your Privacy   │
│                              │
│  We use cookies and collect │
│  data to improve your        │
│  experience.                 │
│                              │
│  ☐ Essential (required)     │
│  ☐ Analytics                │
│  ☐ Marketing                │
│  ☐ Social Media             │
│                              │
│  [Manage] [Reject] [Accept] │
└─────────────────────────────┘
```

**Granular Control:**
- **Category-based** - analytics, marketing, etc.
- **Toggle switches** - easy on/off per category
- **Explanations** - what each category does
- **Withdraw anytime** - in app settings

**Consent Requirements:**
- **Freely given** - not forced
- **Specific** - per purpose
- **Informed** - clear explanations
- **Unambiguous** - active opt-in (no pre-checked boxes)
- **Withdrawable** - easy to revoke

### Secure Data Storage

**Sensitive Data Protection:**

**Encrypted Storage:**
- **Keychain (iOS):** Passwords, tokens, credit cards
- **EncryptedSharedPreferences (Android):** Sensitive key-values
- **SQLCipher:** Encrypted SQLite database

**Never Store Plaintext:**
- ❌ Passwords
- ❌ Credit card numbers (use tokenization - Stripe, Braintree)
- ❌ CVV codes (PCI compliance forbids storage)
- ❌ Social Security Numbers
- ❌ API keys in code (use environment variables)

**Use Biometric Security:**
- **Face ID / Touch ID** for re-authentication
- **PIN fallback** always required

### Network Security

**HTTPS Only:**
- **All API calls** must use HTTPS (TLS 1.2+)
- **Certificate pinning** for critical APIs (prevents man-in-the-middle)
- **App Transport Security (iOS)** enforces HTTPS

**API Security:**
- **Authentication tokens** - JWT, OAuth
- **Refresh tokens** - short-lived access tokens
- **Token rotation** - refresh before expiry
- **Logout** - invalidate tokens server-side

### Compliance Checklist

**GDPR (Europe):**
- [ ] Privacy policy accessible before data collection
- [ ] Explicit consent for data processing
- [ ] Right to access data (user export)
- [ ] Right to deletion ("forget me")
- [ ] Data breach notification within 72 hours
- [ ] DPO appointed (if processing large scale)

**CCPA (California):**
- [ ] "Do Not Sell My Data" option
- [ ] Privacy policy describes data collected
- [ ] Opt-out of data selling
- [ ] Verify user identity for data requests
- [ ] Respond to requests within 45 days

**COPPA (Children <13):**
- [ ] Parental consent required
- [ ] No behavioral advertising to children
- [ ] Data minimization
- [ ] No conditioning services on data collection

### Best Practices

✅ **DO:**
- Show privacy indicators when camera/mic active
- Provide clear privacy policy (plain language)
- Request minimum necessary data
- Encrypt sensitive data at rest and in transit
- Use biometric auth where appropriate
- Respect user's "Do Not Track" settings
- Provide data export and deletion
- Test security regularly (penetration testing)

❌ **DON'T:**
- Hide data collection practices
- Store sensitive data in plain text
- Use HTTP for API calls
- Track without consent
- Share data without disclosure
- Pre-check consent boxes
- Make it hard to opt-out
- Ignore privacy regulations

---

## ⬆️ App Lifecycle & Updates

### Version Update Patterns

**Two-Tier Update System:**

**1. Recommended Update** (Optional)
```
┌─────────────────────────────┐
│  ✨ New Version Available   │
│                              │
│  Version 2.1 is here with:  │
│  • Faster checkout          │
│  • Dark mode                │
│  • Bug fixes                │
│                              │
│  [Skip] [Update Now]        │
└─────────────────────────────┘
```
- Current version works but outdated
- User can skip and update later
- Show once per version, or every 3-7 days

**2. Force Update** (Required)
```
┌─────────────────────────────┐
│  ⚠️ Update Required         │
│                              │
│  This version is no longer  │
│  supported. Please update   │
│  to continue using the app. │
│                              │
│        [Update Now]          │
└─────────────────────────────┘
```
- Critical security fix or API change
- App won't work without update
- No skip button
- Deeplink to App Store/Play Store

**Server-Side Version Check:**
```json
{
  "min_supported_version": "2.0.0",
  "latest_version": "2.2.0",
  "force_update": false
}
```

**Implementation Flow:**
1. **App launch:** Check `/version` API endpoint
2. **Compare versions:**
   - Current < min_supported → **Force update**
   - Current < latest → **Recommend update**
   - Current >= latest → **No prompt**
3. **Deeplink:** Open App Store/Play Store
4. **Track:** Analytics for update adoption

### Force Update Rollout Strategy

**Best Practice Timeline:**

**Day 1-3:** Release new version
- Auto-update users will get it automatically
- No prompts yet

**Day 4-10:** Recommended update
- Show optional update dialog
- "Skip" button available
- Track adoption rate

**Day 11+:** Force update (if critical)
- Only if <80% adoption and critical fix
- Or major API breaking change
- Give users at least 1 week warning

### In-App Updates (Android)

**Google Play In-App Updates API:**

**Flexible Update** (Background download)
- User continues using app
- Download in background
- Install when app closes
- **Best for:** Non-critical updates

**Immediate Update** (Fullscreen flow)
- User must update to continue
- Fullscreen overlay during download/install
- **Best for:** Critical updates

**Implementation:**
```kotlin
appUpdateManager.startUpdateFlowForResult(
  appUpdateInfo,
  AppUpdateType.FLEXIBLE, // or IMMEDIATE
  activity,
  REQUEST_CODE
)
```

### What's New Screens

**Content Best Practices:**

**Structure:**
```
┌─────────────────────────────┐
│  What's New in 2.1          │
│                              │
│  🎨 Dark Mode                │
│  Finally! Your eyes will     │
│  thank you.                  │
│                              │
│  ⚡ Faster Checkout           │
│  50% faster than before.     │
│                              │
│  🐛 Bug Fixes                │
│  Squashed annoying bugs.     │
│                              │
│  [Got It]                    │
└─────────────────────────────┘
```

**Categories:**
- **✨ New:** Brand new features
- **✅ Improved:** Enhanced existing features
- **🐛 Fixed:** Bug fixes
- **⚠️ Deprecated:** Features being removed

**Visual Elements:**
- **Icons/Emojis:** Make it scannable
- **Screenshots/GIFs:** Show, don't just tell
- **Short descriptions:** 1-2 sentences max
- **CTA:** "Try it now" links to feature

**Distribution:**
- **Modal on launch** (first time after update)
- **Dismissible** - X button or "Got It"
- **Don't show every time** - once per version
- **Accessible** in Settings → "What's New"

### Changelog Best Practices

**Keep a Changelog:**

**Format:**
```markdown
## [2.1.0] - 2025-01-15

### Added
- Dark mode support
- Apple Pay checkout

### Changed
- Improved search speed by 50%
- Updated menu layout

### Fixed
- Checkout crash on iOS 15
- Missing allergen info

### Deprecated
- Legacy menu view (removed in 3.0)
```

**Principles:**
- **Latest version first** at top
- **Date each version** (ISO 8601: YYYY-MM-DD)
- **Semantic versioning:** MAJOR.MINOR.PATCH
  - MAJOR: Breaking changes (2.0.0)
  - MINOR: New features (2.1.0)
  - PATCH: Bug fixes (2.1.1)
- **Human-readable:** Not technical jargon
- **Link to details:** "See full release notes →"

**Where to Show:**
- **App Store/Play Store:** Update description
- **In-app:** Settings → About → Version History
- **Website:** Public changelog page
- **Push notification:** "New features available!"

### Feature Flags

**Gradual Rollouts:**
- **5%** of users first (canary deployment)
- **25%** after 24 hours (no major issues)
- **50%** after 48 hours
- **100%** after 1 week

**A/B Testing:**
- **Feature A** vs **Feature B** → 50/50 split
- Measure engagement, conversion
- Roll out winner to 100%

**Kill Switch:**
- **Disable broken features** remotely
- Without app update
- Critical for emergency situations

### Deprecation Notices

**Warn Early:**
```
⚠️ Legacy Checkout Deprecated
The old checkout will be removed in
version 3.0 (Feb 2025).

[Learn More] [Dismiss]
```

**Timeline:**
- **Version 2.5:** Announce deprecation
- **Version 2.8:** Show in-app warnings
- **Version 3.0:** Remove feature

**Communication:**
- In-app banners
- Email to affected users
- Push notification
- Blog post/changelog

### Best Practices

✅ **DO:**
- Check version on launch (server-side)
- Give 1 week before force update
- Show what's new screens
- Use semantic versioning
- Test update flows thoroughly
- Communicate changes clearly
- Track update adoption rates
- Deeplink to store for updates

❌ **DON'T:**
- Force update unnecessarily
- Show what's new every launch
- Use vague release notes ("bug fixes")
- Break backwards compatibility without warning
- Forget to test update flow
- Hide important changes
- Update too frequently (update fatigue)

---

## 👥 Social Features

### Social Login

**Providers (in order of popularity):**
1. **Google** - 65% of users have Google account
2. **Apple** - Required if you offer other social logins (iOS)
3. **Facebook** - Still popular, declining
4. **Email/Password** - Always offer as fallback

**UI Pattern:**
```
┌─────────────────────────────┐
│  Sign in to Order Food      │
│                              │
│  [🍎 Continue with Apple]   │
│  [🔵 Continue with Google]  │
│  [📘 Continue with Facebook]│
│                              │
│  ───── or ─────             │
│                              │
│  [📧 Continue with Email]   │
└─────────────────────────────┘
```

**Best Practices:**
- **Limit to 3-4 providers** - decision paralysis
- **Apple first** on iOS (required, plus native UI)
- **Google most popular** on Android
- **Always include email** option
- **Consistent button styling** - use official brand guidelines

**Native Login (Recommended):**
- **iOS:** ASAuthorizationController (Sign in with Apple), native Google SDK
- **Android:** Google Sign-In SDK, Facebook SDK
- **Benefits:** Single tap, no browser redirect, faster

**Security:**
- **OAuth 2.0 / OpenID Connect** - industry standard
- **Never store passwords** - use tokens
- **Validate tokens server-side** - don't trust client
- **Revoke tokens** on logout

### Sign in with Apple Requirements

**Apple's Rules (4.8):**
- If you offer Facebook, Google, or any third-party login...
- **You MUST also offer Sign in with Apple**
- Must be first or equal prominence
- Failure = app rejection

**Implementation:**
```swift
let provider = ASAuthorizationAppleIDProvider()
let request = provider.createRequest()
request.requestedScopes = [.fullName, .email]
```

**Benefits:**
- **Hide My Email** - Apple provides relay email
- **Privacy-focused** - minimal data shared
- **Fast** - Face ID / Touch ID authentication
- **Cross-device** - works on Mac, iPad, iPhone

**User Data:**
- **Name:** Provided once, then never again (store it!)
- **Email:** Real or relay (@privaterelay.appleid.com)
- **User ID:** Stable identifier for your app

### Native Share Sheet

**Web Share API (Mobile Web):**
```javascript
if (navigator.share) {
  navigator.share({
    title: 'Check out this pizza!',
    text: 'Amazing Margherita from Luigi's',
    url: 'https://app.com/menu/item/123',
    files: [imageFile] // Optional: share images
  })
}
```

**iOS (UIActivityViewController):**
```swift
let items = ["Check out this pizza!", url, image]
let activityVC = UIActivityViewController(
  activityItems: items,
  applicationActivities: nil
)
present(activityVC, animated: true)
```

**Android (Intent.ACTION_SEND):**
```kotlin
val shareIntent = Intent().apply {
  action = Intent.ACTION_SEND
  putExtra(Intent.EXTRA_TEXT, "Check out this pizza!")
  type = "text/plain"
}
startActivity(Intent.createChooser(shareIntent, null))
```

**Benefits:**
- **User chooses** their preferred app
- **No API integrations** needed
- **Privacy-preserving** - no tracking
- **Fewer permissions** required

**What Gets Shared:**
- **Text** - Title, description
- **URL** - Deep link to content
- **Image** - Photo of dish, receipt
- **Files** - Menu PDF, loyalty QR code

### Referral Programs

**Referral Flow:**
```
1. User taps "Invite Friends"
2. Share sheet opens → user picks app
3. Friend receives link with referral code
4. Friend signs up → both get reward
```

**Referral Link Structure:**
```
https://app.com/refer?code=JOHN2025
```

**Tracking:**
- **Referral code:** Unique per user (JOHN2025)
- **Deep link:** Opens app directly to signup
- **Attribution:** Track who referred whom
- **Rewards:** $10 off for both (example)

**Incentives:**
- **Referrer:** $10 credit after friend's first order
- **Referred:** 20% off first order
- **Win-win** - both parties benefit

**UI Pattern:**
```
┌─────────────────────────────┐
│  Invite Friends, Get $10    │
│                              │
│  Share your code: JOHN2025  │
│                              │
│  Friends get 20% off         │
│  You get $10 after their     │
│  first order!                │
│                              │
│  [Share Your Code]           │
└─────────────────────────────┘
```

### Account Linking

**Link Multiple Login Methods:**
```
User signed up with email → later links Google
Same account, multiple login options
```

**Implementation:**
- **Match by email** - primary identifier
- **Verify ownership** - confirm via email/OTP
- **Merge accounts** - combine data if duplicate
- **Show linked accounts** in settings

**Unlink Protection:**
- **Require >= 1 login method** at all times
- **Warn user** before unlinking
- **Re-authentication** required to unlink

### Social Sharing Best Practices

**Deep Linking:**
```
app://restaurant/menu/item/123
→ Opens app directly to item
→ If app not installed, fallback to web
```

**Open Graph Tags (Web):**
```html
<meta property="og:title" content="Margherita Pizza" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://..." />
```

**Rich Previews:**
- **Image:** 1200x630px (Facebook/Twitter)
- **Title:** 60 characters max
- **Description:** 160 characters max
- **URL:** Canonical link

### Best Practices

✅ **DO:**
- Offer 3-4 major login providers
- Include Sign in with Apple (iOS requirement)
- Include email/password fallback
- Use native share sheet
- Provide clear referral incentives
- Allow account linking
- Use deep links for sharing
- Track referral attribution

❌ **DON'T:**
- Force social login only
- Spam social feeds automatically
- Share without user permission
- Use outdated SDKs
- Ignore Apple's login requirement
- Make referral terms confusing
- Forget to handle link errors

---

## 📶 Network & Performance

### Network Status Indicators

**Connection States:**
- 🟢 **Online (Good):** Fast connection, all features available
- 🟡 **Online (Slow):** Degraded experience, show warnings
- 🔴 **Offline:** Cached content only, queue actions

**UI Patterns:**

**Banner (Non-Intrusive):**
```
┌─────────────────────────────┐
│ ⚠️ Slow connection detected │
└─────────────────────────────┘
```

**Toast (Temporary):**
```
━━━━━━━━━━━━━━━━━━━
  🔴 You're offline
━━━━━━━━━━━━━━━━━━━
  (fades after 3s)
```

**Persistent Indicator:**
```
Status bar: [🔴] Offline Mode
```

**Contextual Messages:**
```
📷 Can't upload photo right now
    Will upload when online

🛒 Can't place order offline
    Please connect to internet
```

### Retry Strategies

**Exponential Backoff:**
```
Attempt 1: Immediate
Attempt 2: 1 second later
Attempt 3: 2 seconds later
Attempt 4: 4 seconds later
Attempt 5: 8 seconds later
...
Max wait: 60 seconds
```

**Why Exponential:**
- **Server overload protection** - don't hammer failing server
- **Network recovery** - give network time to stabilize
- **Battery efficient** - fewer attempts = less power

**Retry Conditions:**
- **Network errors:** Timeout, no connection
- **5xx server errors:** Temporary server issues
- **Rate limiting:** 429 Too Many Requests

**Don't Retry:**
- **4xx client errors:** Bad request, unauthorized (won't succeed anyway)
- **Payment failures:** User must take action
- **Validation errors:** User must fix input

**User Controls:**
```
┌─────────────────────────────┐
│ ❌ Failed to load menu      │
│                              │
│ Couldn't connect to server. │
│                              │
│ [Retry] [Use Cached]        │
└─────────────────────────────┘
```

### Background Sync

**Use Cases:**
- **Analytics** - send events when online
- **Images** - upload food photos
- **Reviews** - sync ratings/comments
- **Cart** - sync across devices
- **Orders** - retry failed orders

**Implementation:**

**iOS (Background App Refresh):**
```swift
UIApplication.shared.setMinimumBackgroundFetchInterval(3600)
// Sync every 1 hour when app is backgrounded
```

**Android (WorkManager):**
```kotlin
val syncWorkRequest = PeriodicWorkRequestBuilder<SyncWorker>(
  1, TimeUnit.HOURS
).setConstraints(
  Constraints.Builder()
    .setRequiredNetworkType(NetworkType.CONNECTED)
    .setRequiresBatteryNotLow(true)
    .build()
).build()
```

**Constraints:**
- **Network:** WiFi only, or any connection
- **Battery:** Not low (<15%)
- **Idle:** Device idle (optional)
- **Charging:** Only when plugged in (optional)

**Best Practices:**
- **Batch uploads** - don't sync one item at a time
- **Deduplicate** - don't send same data twice
- **Compress** - GZIP JSON payloads
- **Cancel on logout** - don't sync after user logs out

### Battery Optimization

**Power-Draining Operations:**
1. **Network requests** - especially on poor signal
2. **GPS location** - continuous tracking
3. **Background processing** - excessive work
4. **Screen on** - brightness at max
5. **Animations** - constant GPU work

**Optimization Techniques:**

**Network:**
- **Batch requests** - combine multiple API calls
- **Cache aggressively** - avoid redundant requests
- **Compress data** - smaller payloads
- **Debounce search** - wait 300ms before querying
- **Prefetch** - download on WiFi, use later

**Location:**
- **Coarse location** instead of precise (90% less power)
- **Geofencing** instead of continuous tracking
- **Stop updates** when app is backgrounded
- **Significant location changes** only (iOS)

**Background Work:**
- **WorkManager constraints** - only when charging, WiFi
- **Reduce frequency** - hourly, not every minute
- **Wake locks** - release ASAP (Android)
- **Doze mode** - respect Android battery optimization

**Animations:**
- **Use hardware acceleration** - GPU vs CPU
- **Limit concurrent animations** - max 2-3 at once
- **Reduce motion** - respect accessibility setting
- **Static images** instead of videos when possible

### App Size Optimization

**Download Size Targets:**
- **<10 MB:** Great - fast download
- **10-50 MB:** Good - acceptable
- **50-100 MB:** Warning - users may delay download
- **>100 MB:** Problem - requires WiFi

**Optimization Techniques:**

**Images:**
- **WebP** instead of PNG/JPEG (25-35% smaller)
- **Image CDN** - serve optimized sizes per device
- **Lazy load** - don't bundle all images in app
- **Asset catalogs** (iOS) - automatic optimization

**Code:**
- **Minification** - remove whitespace, comments
- **Tree shaking** - remove unused code
- **Code splitting** - load features on demand
- **ProGuard/R8** (Android) - shrink code size

**Libraries:**
- **Audit dependencies** - remove unused
- **Use lightweight alternatives** - don't bundle heavy SDKs
- **Dynamic delivery** (Android) - download features on demand

**Assets:**
- **Vector graphics** (SVG) instead of bitmaps
- **Fonts** - subset only needed characters
- **Videos** - host remotely, don't bundle

### Performance Monitoring

**Key Metrics:**

**App Launch Time:**
- **Cold start:** App not in memory (<2s ideal)
- **Warm start:** App in background (<1s ideal)
- **Hot start:** App in foreground (<0.5s ideal)

**Network Requests:**
- **API latency:** <500ms target (p95)
- **Timeout:** 30s max
- **Success rate:** >99%

**Frame Rate:**
- **60 FPS** for smooth animations
- **Jank:** Frames taking >16ms (bad!)

**Memory:**
- **App memory:** <100MB idle, <200MB active
- **Memory leaks:** Monitor with profiler

**Battery:**
- **Background CPU:** <1% when idle
- **Network:** <10 requests per hour background

**Tools:**
- **Firebase Performance** - automatic monitoring
- **New Relic / Datadog** - APM solutions
- **Xcode Instruments** (iOS) - profiling
- **Android Profiler** - CPU, memory, network

### Best Practices

✅ **DO:**
- Show clear network status indicators
- Implement exponential backoff for retries
- Use background sync with constraints
- Optimize battery usage (coarse location, batch requests)
- Monitor performance metrics (APM tools)
- Compress network data (GZIP)
- Cache aggressively
- Test on slow networks (throttle in dev tools)
- Respect battery saver mode
- Set appropriate timeouts

❌ **DON'T:**
- Retry indefinitely without backoff
- Use precise location when coarse suffices
- Sync continuously in background (battery drain)
- Ignore network errors (show user what happened)
- Block UI during network requests
- Use polling when push updates available
- Download large files on cellular without warning
- Forget to cancel requests on screen exit
- Run expensive operations on main thread

---

## 💬 Feedback & Support

### App Rating Prompts

### Critical Timing Rules

**When to Ask:**
✅ **Good times:**
- After successful order delivery
- After 3+ successful orders (power users)
- After completing first-time tutorial
- After positive interaction (5-star in-app rating first)
- When battery > 20% and not low power mode
- After user achieves milestone ("10th order!")

❌ **Bad times:**
- On first app open (no experience yet)
- During checkout process (interruption!)
- After order cancellation or problem
- When app just crashed (obvious!)
- When user is in middle of task
- Right after permission denial

**Frequency:**
- **Maximum 3 times per year** (iOS guideline)
- **Don't ask repeatedly** if user dismisses
- **Never ask twice in 1 month**
- **Don't ask if user already rated**

### Two-Step Rating Pattern

**Step 1: In-App Sentiment Check**
```
┌─────────────────────────────┐
│  How's your experience?     │
│                              │
│  ⭐ ⭐ ⭐ ⭐ ⭐         │
│                              │
│  [Tap a star]                │
└─────────────────────────────┘
```

**Step 2a: If 4-5 stars → App Store**
```
┌─────────────────────────────┐
│  Glad you're loving it! 🎉  │
│                              │
│  Mind sharing your feedback │
│  on the App Store?           │
│                              │
│  [Not Now] [Rate App]       │
└─────────────────────────────┘
```

**Step 2b: If 1-3 stars → Feedback Form**
```
┌─────────────────────────────┐
│  Sorry to hear that 😔      │
│                              │
│  How can we improve?         │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │  [Text area]          │  │
│  │                       │  │
│  └───────────────────────┘  │
│                              │
│  [Skip] [Send Feedback]     │
└─────────────────────────────┘
```

**Why Two-Step:**
- **Filter negative ratings** - address issues privately first
- **Increase positive ratings** - happy users more likely to rate
- **Actionable feedback** - learn what's wrong before App Store review

### Native Rating Prompts

**iOS (SKStoreReviewController):**
```swift
import StoreKit

SKStoreReviewController.requestReview()
```

**Benefits:**
- Native iOS dialog (familiar to users)
- Doesn't leave app
- Apple controls frequency (max 3x/year)
- Can't customize UI

**Android (In-App Review API):**
```kotlin
val reviewManager = ReviewManagerFactory.create(context)
val reviewInfo = reviewManager.requestReviewFlow()
reviewManager.launchReviewFlow(activity, reviewInfo)
```

**Benefits:**
- Native Android dialog
- Doesn't leave app
- Google controls frequency
- Higher completion rates

### Shake to Report Bug

**Gesture Detection:**
```swift
// iOS
override func motionEnded(_ motion: UIEvent.EventSubtype) {
  if motion == .motionShake {
    showBugReportUI()
  }
}
```

**What Gets Captured:**
- **Screenshot** - current screen
- **Device info** - Model, OS version
- **App version** - Build number
- **Logs** - Last 100 log lines
- **User description** - What went wrong?

**Bug Report UI:**
```
┌─────────────────────────────┐
│  Report a Bug 🐛            │
│                              │
│  [Screenshot preview]        │
│                              │
│  What happened?              │
│  ┌───────────────────────┐  │
│  │ The checkout button   │  │
│  │ didn't work...        │  │
│  └───────────────────────┘  │
│                              │
│  📧 Reply to: user@email.com│
│                              │
│  [Cancel] [Send Report]     │
└─────────────────────────────┘
```

**Privacy:**
- **User consent** - explain what's being sent
- **Opt-out checkbox** - "Include screenshot"
- **Redact sensitive** - blur credit cards, passwords
- **GDPR compliant** - store minimum necessary

**Tools:**
- **Shake SDK** - www.shakebugs.com
- **Instabug** - www.instabug.com
- **TestFlight** (iOS) - built-in feedback
- **Firebase Crashlytics** - crash reports + custom logs

### In-App Help & Chat

**Help Center Access:**
```
Settings → Help & Support
              ├─ FAQs
              ├─ Contact Us
              ├─ Live Chat
              └─ Report Bug
```

**Live Chat Widget:**
```
┌─────────────────────────────┐
│                              │
│  [Chat messages...]          │
│                              │
│  Agent: How can I help?      │
│  You: My order is late       │
│                              │
│  ┌─────────────────────┐    │
│  │ Type a message...   │ ➤  │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

**Floating Action Button:**
```
┌─────────────────────────────┐
│                              │
│                              │
│  [App content]               │
│                              │
│                              │
│                        💬   │ ← Chat FAB
└─────────────────────────────┘
```

**Chat Providers:**
- **Intercom** - Full customer support platform
- **Zendesk** - Enterprise support
- **Drift** - Sales + support chat
- **Crisp** - Lightweight, affordable
- **LiveChat** - Real-time chat

**Features:**
- **Typing indicators** - "Agent is typing..."
- **File attachments** - Send photos of issue
- **Push notifications** - Alert when agent responds
- **Offline messages** - Queue messages when offline
- **Chat history** - View past conversations

### FAQ Patterns

**Searchable FAQs:**
```
┌─────────────────────────────┐
│  🔍 Search FAQs...          │
│                              │
│  Common Questions:           │
│                              │
│  ▶ How do I track my order? │
│  ▶ What's your refund policy?│
│  ▶ How do I update my address?│
│  ▶ Can I cancel an order?   │
│                              │
│  Can't find answer?          │
│  [Contact Support]           │
└─────────────────────────────┘
```

**Accordion Pattern:**
```
▼ How do I track my order?
  Go to Orders → Select order →
  View tracking link. You'll also
  get push notifications.

▶ What's your refund policy?
▶ How do I update my address?
```

**Smart Suggestions:**
```
Based on your recent order:
❓ Track your order
❓ Change delivery address
❓ Contact restaurant
```

### Best Practices

✅ **DO:**
- Ask for rating after positive experiences
- Use native rating APIs (iOS/Android)
- Implement two-step rating (sentiment check first)
- Offer shake-to-report for bug feedback
- Provide multiple support channels (FAQ, chat, email)
- Make help easily accessible
- Respond to feedback quickly
- Thank users for positive reviews
- Address negative reviews professionally
- Track feedback sentiment and trends

❌ **DON'T:**
- Ask on first launch (no experience yet)
- Interrupt critical flows (checkout, payment)
- Ask repeatedly if user declines
- Ignore negative feedback
- Hide support contact info
- Use only chatbots (frustrating!)
- Make FAQs unsearchable
- Forget to test feedback flows
- Ask when app just crashed
- Beg for 5-star reviews (against guidelines)

---

## 🍽️ Restaurant-Specific Features

### QR Code Menu Scanning

**QR Code Types:**
1. **Table-Specific:** QR per table (Table #5)
2. **Restaurant-Wide:** Same QR for all tables
3. **Menu-Specific:** QR per menu type (lunch, dinner, drinks)

**Scan Flow:**
```
User scans QR → App opens menu →
Add items to cart → Checkout →
Order sent to kitchen with table #
```

**QR Scanner UI:**
```
┌─────────────────────────────┐
│      Scan QR Code to        │
│      View Menu              │
│                              │
│    ┌─────────────┐          │
│    │ [QR Guide]  │          │
│    │   Square    │          │
│    └─────────────┘          │
│                              │
│  Point camera at QR code     │
│  on your table               │
│                              │
│  [Enter Table Number]        │
└─────────────────────────────┘
```

**Fallback Option:**
- Manual table number entry
- If camera fails or QR damaged
- Dropdown or number picker

**Post-Scan Experience:**
```
✓ Table 5 - Luigi's Pizzeria
━━━━━━━━━━━━━━━━━━━━━━━━━

[Browse Menu] [Call Waiter]
```

**Benefits:**
- **Contactless** - COVID-19 era requirement
- **Instant access** - no app download required (web)
- **Auto-table assignment** - no waiter needed
- **Digital menu** - easy updates, no reprinting

### Table Booking Flow

**Booking Entry Points:**
- "Reserve Table" button on home screen
- Restaurant details page
- Google Maps integration
- Third-party (OpenTable integration)

**Booking Form:**
```
┌─────────────────────────────┐
│  Reserve a Table            │
│                              │
│  📅 Date                    │
│  [Jan 25, 2025]             │
│                              │
│  🕐 Time                    │
│  [7:00 PM]                  │
│                              │
│  👥 Party Size              │
│  [2 people]                 │
│                              │
│  📝 Special Requests        │
│  [Birthday, window seat...] │
│                              │
│  [Find Available Tables]    │
└─────────────────────────────┘
```

**Available Times Display:**
```
Available times for 2 people:
┌─────┬─────┬─────┬─────┐
│ 6:00│ 6:30│ 7:00│ 7:30│ Selected
├─────┼─────┼─────┼─────┤
│ 8:00│ 8:30│ 9:00│ ✕   │ Full
└─────┴─────┴─────┴─────┘
```

**Confirmation:**
```
┌─────────────────────────────┐
│  ✓ Reservation Confirmed    │
│                              │
│  Luigi's Pizzeria            │
│  Jan 25, 2025 at 7:00 PM    │
│  2 people                    │
│                              │
│  Confirmation #: R-12345     │
│                              │
│  [Add to Calendar]           │
│  [Get Directions]            │
│  [Cancel Reservation]        │
└─────────────────────────────┘
```

**Calendar Integration:**
```
.ics file or deep link:
- Restaurant name
- Address (with map)
- Time + duration
- Confirmation number
```

**Reminders:**
- **24 hours before:** "Reservation tomorrow at 7 PM"
- **1 hour before:** "Reservation in 1 hour at Luigi's"
- **15 min before:** "Time to head out! ETA 10 min"

### Split Bill Payment

**Initiating Split:**
```
Total: $85.50
┌─────────────────────────────┐
│  [Pay Full Amount]           │
│  [Split Evenly]              │
│  [Split by Item]             │
│  [Custom Split]              │
└─────────────────────────────┘
```

**Split Evenly:**
```
┌─────────────────────────────┐
│  Split Bill                  │
│                              │
│  Total: $85.50               │
│  Split between: [2] people   │
│                              │
│  Each pays: $42.75           │
│                              │
│  Who's paying?               │
│  ☑ You                      │
│  ☐ Guest 2 (send link)      │
│                              │
│  [Continue to Payment]       │
└─────────────────────────────┘
```

**Split by Item:**
```
┌─────────────────────────────┐
│  Margherita Pizza    $14.00 │
│  ☑ You    ☐ Guest 2        │
│                              │
│  Caesar Salad        $8.50  │
│  ☐ You    ☑ Guest 2        │
│                              │
│  Wine (2 glasses)    $18.00 │
│  ☑ You    ☑ Guest 2  (Split)│
│                              │
│  Tip (18%)          $7.29   │
│  ☑ You    ☑ Guest 2  (Split)│
│                              │
│  Your total: $28.65          │
│                              │
│  [Pay Your Share]            │
└─────────────────────────────┘
```

**Payment Link:**
```
Send payment link to friends:
https://app.com/pay/split/abc123

Friend scans QR or opens link →
Pays their share →
You get notified when all paid
```

**Group Payment Status:**
```
┌─────────────────────────────┐
│  Split Payment Status        │
│                              │
│  Total: $85.50               │
│                              │
│  ✓ You ($42.75) - Paid      │
│  ⏳ Guest 2 ($42.75) - Pending│
│                              │
│  [Remind Guest 2]            │
└─────────────────────────────┘
```

### Dietary Restrictions & Allergen Filters

**Profile Settings:**
```
┌─────────────────────────────┐
│  Dietary Preferences        │
│                              │
│  ☑ Vegetarian               │
│  ☐ Vegan                    │
│  ☑ Gluten-Free              │
│  ☐ Dairy-Free               │
│  ☐ Nut Allergy              │
│  ☐ Shellfish Allergy        │
│  ☐ Halal                    │
│  ☐ Kosher                   │
│                              │
│  [Save Preferences]          │
└─────────────────────────────┘
```

**Menu Filtering:**
```
┌─────────────────────────────┐
│  Menu                    🔍  │
│  Filters: [Gluten-Free]  ✕  │
│                              │
│  ✓ Margherita Pizza          │
│    (Gluten-free crust)       │
│    $14.00                    │
│                              │
│  ✓ Grilled Salmon            │
│    $22.00                    │
│                              │
│  ✕ Pasta Carbonara           │
│    (Contains gluten)         │
│    $16.00 [Show Anyway]      │
└─────────────────────────────┘
```

**Item Details:**
```
┌─────────────────────────────┐
│  Margherita Pizza            │
│  $14.00                      │
│                              │
│  Fresh mozzarella, basil...  │
│                              │
│  🥦 Vegetarian               │
│  🌾 Gluten-free available    │
│                              │
│  ⚠️ Contains: Dairy          │
│                              │
│  [Customize]  [Add to Cart] │
└─────────────────────────────┘
```

**Allergen Warnings:**
```
⚠️ Warning: Nut Allergy
This dish contains tree nuts.
Would you like to:
[Remove from cart] [Contact restaurant] [Continue anyway]
```

### Loyalty & Rewards Programs

**Points System:**
```
┌─────────────────────────────┐
│  Your Rewards 🎁            │
│                              │
│  ⭐ 350 points              │
│  (650 points to next reward) │
│                              │
│  ━━━━━━━━━━━━━━━━━━━       │
│  35%                         │
│                              │
│  Earn 100 pts per $10 spent  │
│                              │
│  Next reward: $5 off         │
│  At 1,000 points             │
└─────────────────────────────┘
```

**Redeeming Rewards:**
```
┌─────────────────────────────┐
│  Available Rewards          │
│                              │
│  ☐ $5 off (500 pts)         │
│  ☑ 10% off (750 pts)        │
│  ☐ Free Dessert (1,000 pts) │
│  ☐ $20 off (2,000 pts)      │
│                              │
│  Apply to this order?        │
│  [Apply 10% Off]            │
└─────────────────────────────┘
```

**Tiers:**
```
┌─────────────────────────────┐
│  Loyalty Tier: 🥈 Silver    │
│                              │
│  Benefits:                   │
│  ✓ 10% bonus points          │
│  ✓ Birthday reward           │
│  ✓ Early access to specials  │
│                              │
│  ━━━━━━━━━━━━━━━━━━━       │
│  70% to Gold (5 more orders) │
│                              │
│  Gold benefits:              │
│  • 20% bonus points          │
│  • Free delivery             │
│  • Exclusive menu items      │
└─────────────────────────────┘
```

**Punch Card Style:**
```
┌─────────────────────────────┐
│  Free Pizza Punch Card      │
│                              │
│  ☕ ☕ ☕ ☕ ☕ ◯ ◯ ◯ ◯ ◯  │
│                              │
│  5 of 10 pizzas purchased    │
│  5 more for a free pizza!    │
│                              │
│  Last visit: 2 days ago      │
└─────────────────────────────┘
```

**Cash Back:**
```
┌─────────────────────────────┐
│  Cash Back Balance: $12.50  │
│                              │
│  Earn 5% cash back on every │
│  order, redeemable on next  │
│  visit.                      │
│                              │
│  [Apply to This Order]       │
└─────────────────────────────┘
```

### Tipping UI

**Tip Selection:**
```
┌─────────────────────────────┐
│  Add Tip for Delivery       │
│                              │
│  Subtotal:     $25.00        │
│  Delivery:     $3.00         │
│                              │
│  Select tip:                 │
│  [15%]  [18%]  [20%]  [Other]│
│  $3.75  $4.50  $5.00         │
│                              │
│  Total: $33.50               │
│                              │
│  [Continue to Payment]       │
└─────────────────────────────┘
```

**Custom Tip:**
```
┌─────────────────────────────┐
│  Custom Tip Amount          │
│                              │
│  Percentage: [25]%          │
│  or                          │
│  Amount: $[6.25]            │
│                              │
│  [Apply]                     │
└─────────────────────────────┘
```

**Post-Order Tipping:**
```
┌─────────────────────────────┐
│  Add Tip After Delivery?    │
│                              │
│  How was your delivery?      │
│  ⭐ ⭐ ⭐ ⭐ ⭐         │
│                              │
│  Add tip: [20%] = $5.00     │
│                              │
│  [Skip]  [Add Tip]          │
└─────────────────────────────┘
```

### Best Practices

✅ **DO:**
- Support QR code scanning (contactless)
- Provide manual fallbacks (enter table number)
- Make table booking easy (calendar integration)
- Support flexible split payment (even, by item, custom)
- Save dietary preferences in profile
- Show allergen warnings prominently
- Make loyalty rewards easy to redeem
- Default to reasonable tip percentages
- Allow post-order tipping
- Persist cart across sessions
- Support group ordering (multiple people, one order)

❌ **DON'T:**
- Force QR code only (camera fails!)
- Make booking flow too long (ask minimum info)
- Require all diners to pay instantly (async split OK)
- Hide allergen info in fine print
- Make rewards confusing to redeem
- Hide tipping option (transparent!)
- Lose user's dietary preferences
- Forget to notify about reservation reminders

---

## ✅ Usability & Accessibility Checklists

### Pre-Launch Audit - Core UX
- [ ] Can users complete main task in <3 taps?
- [ ] Are all touch targets at least 44x44pt?
- [ ] Does app work in both orientations (portrait/landscape)?
- [ ] Does app work on tablets with adaptive layouts?
- [ ] Is text readable at minimum system font size?
- [ ] Do all interactive elements have visual feedback?
- [ ] Are loading states shown for actions >1 second?
- [ ] Can users navigate back from any screen?
- [ ] Is the search function easily accessible?
- [ ] Are error messages helpful and actionable?
- [ ] Does app perform well on older devices?
- [ ] Is dark mode implemented properly?
- [ ] Are images optimized for mobile data (<200KB)?

### Accessibility Audit (WCAG AA)
- [ ] All images have alt text
- [ ] Color is not the only way to convey information
- [ ] Forms have proper labels and validation
- [ ] Can navigate entire app with screen reader (VoiceOver/TalkBack)
- [ ] Text contrast meets 4.5:1 (normal) / 3:1 (large text)
- [ ] Interactive elements are 44x44pt minimum
- [ ] Supports dynamic type/text scaling (up to 200%)
- [ ] No flashing content that could trigger seizures
- [ ] Heading structure is logical (H1 → H2 → H3)
- [ ] Focus indicators are visible (3:1 contrast)
- [ ] Gestures have button alternatives (swipe → Edit button)
- [ ] Respects reduced motion preference
- [ ] Videos have closed captions
- [ ] Error messages are announced by screen readers

### Performance Audit
- [ ] App launches in <2 seconds (cold start)
- [ ] Animations run at 60 FPS on target devices
- [ ] Images use WebP format or optimized JPEG
- [ ] API calls timeout after 30 seconds max
- [ ] Skeleton screens for loading (not just spinners)
- [ ] Lazy loading implemented for images
- [ ] App size <50MB (ideally <10MB)
- [ ] Memory usage <200MB during active use
- [ ] Background battery usage <1% CPU
- [ ] Network requests use GZIP compression
- [ ] Offline mode works for core features
- [ ] Data syncs in background with constraints

### Forms & Input Audit
- [ ] Single-column layout on mobile
- [ ] Labels above fields (not inside)
- [ ] Inline validation after field completion
- [ ] Error messages are specific and helpful
- [ ] Smart keyboard for each input type
- [ ] Autofill/autocomplete enabled
- [ ] Multi-step forms show progress (Step 2 of 4)
- [ ] Field heights are 44pt/48dp minimum
- [ ] CTA button is full-width and prominent
- [ ] Every extra field is justified (each adds 11% abandonment)

### Navigation & Information Architecture
- [ ] Bottom Tab Bar for 3-5 main destinations
- [ ] Search is prominently placed
- [ ] Users can reach any feature in <3 taps
- [ ] Back navigation always available
- [ ] Tab indicators show active state clearly
- [ ] Hamburger menu only for secondary features
- [ ] Deep linking works (open app to specific screen)
- [ ] Pull-to-refresh for time-based content
- [ ] Progressive disclosure hides complexity

### Animations & Micro-interactions
- [ ] Animations last 200-500ms (not longer)
- [ ] Easing functions feel natural (not linear)
- [ ] Reduced motion preference is respected
- [ ] Haptic feedback on important actions (iOS)
- [ ] Button press states are visible
- [ ] Animations use transform/opacity (GPU accelerated)
- [ ] Animations are purposeful, not decorative
- [ ] Frequent actions have minimal animation

### Onboarding & First-Time UX
- [ ] Welcome screens limited to 2-3 maximum
- [ ] Skip button always available
- [ ] Core value proposition is clear
- [ ] Progressive onboarding (just-in-time tips)
- [ ] Empty states guide users to first action
- [ ] Tooltips explain features when first encountered
- [ ] Onboarding doesn't repeat on every launch

### Payment & Checkout
- [ ] Express payment options (Apple Pay, Google Pay)
- [ ] Multi-step checkout with progress indicator
- [ ] Order summary visible/accessible at all times
- [ ] All costs shown before final confirmation
- [ ] Inline validation for card/payment errors
- [ ] Saved payment methods for returning users
- [ ] Trust signals displayed (lock icon, badges)
- [ ] Session timeout warnings given

### Push Notifications
- [ ] Transactional notifications only (no spam)
- [ ] Personalized based on user behavior
- [ ] Respect user's time zone
- [ ] Frequency <5 per week (excluding transactional)
- [ ] Timing avoids 12 AM - 6 AM
- [ ] Rich notifications with images/actions
- [ ] Notification preferences accessible in settings
- [ ] Opt-out is easy and honored immediately

### Permissions & Privacy
- [ ] Permission requests use soft ask first
- [ ] Requests timed contextually (not on launch)
- [ ] Clear explanations for why permission needed
- [ ] Graceful degradation if permission denied
- [ ] GDPR/CCPA consent management implemented
- [ ] Privacy policy accessible before data collection
- [ ] User can export/delete their data
- [ ] Privacy indicators shown (camera/mic active)
- [ ] Minimum necessary permissions requested only

### Offline & Sync
- [ ] Core features work offline
- [ ] Offline indicator shown clearly
- [ ] Actions queue for later sync when offline
- [ ] Exponential backoff retry strategy
- [ ] Conflict resolution strategy defined
- [ ] "Last synced" timestamp shown
- [ ] Background sync uses constraints (WiFi, battery)
- [ ] Sync status communicated clearly

### Security Audit
- [ ] All API calls use HTTPS (TLS 1.2+)
- [ ] Sensitive data encrypted at rest (Keychain/EncryptedPreferences)
- [ ] No passwords/CVV stored in plain text
- [ ] Biometric auth with PIN fallback
- [ ] Tokens expire and rotate
- [ ] Logout invalidates tokens server-side
- [ ] Certificate pinning for critical APIs (optional)
- [ ] Regular security testing/pen testing

### Internationalization (i18n)
- [ ] All strings externalized (no hardcoded text)
- [ ] RTL language support implemented
- [ ] UI accommodates text expansion (+35% for German)
- [ ] Locale-aware date/time/number formatting
- [ ] Currency displays correctly per locale
- [ ] Pluralization rules implemented
- [ ] Professional translations (not machine)
- [ ] Tested in target languages on devices

### Media & Rich Content
- [ ] Videos have play/pause controls
- [ ] Closed captions available on videos
- [ ] Videos support landscape fullscreen
- [ ] Picture-in-Picture supported (if applicable)
- [ ] Camera permission requested contextually
- [ ] Native photo picker used (privacy)
- [ ] Images have loading states
- [ ] Audio interruptions handled (calls, other apps)

### Social Features
- [ ] Sign in with Apple included (iOS requirement)
- [ ] Social login providers limited to 3-4
- [ ] Email/password fallback always available
- [ ] Native share sheet implemented
- [ ] Deep links open app to correct screen
- [ ] Referral program tracking works
- [ ] Open Graph tags for rich previews

### App Lifecycle
- [ ] Version check on launch (server-side)
- [ ] Force update only for critical issues
- [ ] What's New screen for major updates
- [ ] Changelog follows semantic versioning
- [ ] Feature flags for gradual rollouts
- [ ] Deprecation notices warn users early
- [ ] Update adoption tracked with analytics

### Feedback & Support
- [ ] Rating prompt timing is appropriate (after positive moments)
- [ ] Two-step rating (sentiment check → store)
- [ ] Native rating API used (iOS/Android)
- [ ] Shake-to-report bug implemented (optional)
- [ ] FAQ section searchable
- [ ] Multiple support channels (chat, email, FAQ)
- [ ] Help easily accessible from all screens

### Restaurant-Specific Features
- [ ] QR code menu scanning works
- [ ] Manual table number entry available
- [ ] Table booking with calendar integration
- [ ] Split bill payment (evenly, by item, custom)
- [ ] Dietary preference filters work
- [ ] Allergen warnings prominent
- [ ] Loyalty program easy to understand/redeem
- [ ] Tipping defaults to reasonable percentages
- [ ] Post-order tipping available
- [ ] Cart persists across sessions

### Dark Mode Specific
- [ ] Background is #121212 (not pure black)
- [ ] Text colors are 87%/60%/38% white (primary/secondary/disabled)
- [ ] Colors desaturated 20-30% vs light mode
- [ ] Contrast still meets 4.5:1 minimum
- [ ] Images reduced brightness 10-20%
- [ ] Icons use outlined style
- [ ] Elevation system shows depth (surface colors)
- [ ] User can toggle between light/dark modes
- [ ] System preference respected as default
- [ ] Smooth transition animation (300ms)

### Platform-Specific Compliance
**iOS:**
- [ ] Sign in with Apple if using social login
- [ ] Privacy nutrition labels accurate
- [ ] App Transport Security enabled (HTTPS only)
- [ ] Background modes justified
- [ ] Push notification entitlement configured
- [ ] Dynamic Type supported

**Android:**
- [ ] Runtime permissions implemented
- [ ] Permission rationale provided
- [ ] Notification channels configured
- [ ] Doze/App Standby compatibility
- [ ] Text uses `sp` units (not `dp`)
- [ ] Material Design guidelines followed

---

## 📚 Resources & References

### Official Design Guidelines
- **Apple HIG:** https://developer.apple.com/design/human-interface-guidelines/
- **Material Design 3:** https://m3.material.io/
- **Material Design 2:** https://m2.material.io/design
- **Nielsen Norman Group:** https://www.nngroup.com/topic/mobile-tablet/
- **W3C WCAG:** https://www.w3.org/WAI/WCAG21/quickref/

### Authoritative Research Sources
- **Nielsen Norman Group** - 374 mobile design guidelines from 21 usability studies
- **Baymard Institute** - E-commerce UX research (35% conversion increase with optimized checkout)
- **Smashing Magazine** - Comprehensive mobile design articles
- **Mobbin** - Real-world mobile app design examples
- **Page Flows** - Mobile design pattern library

### Restaurant App Design Examples
- **Case Studies:** Tubik Studio (Tasty Burger, Perfect Recipes)
- **Delivery Apps:** DoorDash, UberEats, Grubhub, Postmates
- **Restaurant Apps:** Chipotle, Starbucks, Domino's, Sweetgreen
- **QR Solutions:** Appfront, Choice QR, Sunday App, Menuflow

### Development Resources

**iOS:**
- **Human Interface Guidelines:** Complete iOS design system
- **Swift UI:** Modern declarative framework
- **UIKit:** Traditional iOS framework
- **Core Haptics:** Haptic feedback API
- **LocalAuthentication:** Face ID/Touch ID
- **StoreKit:** In-app purchases, ratings

**Android:**
- **Material Design Components:** Official component library
- **Jetpack Compose:** Modern declarative framework
- **WorkManager:** Background task scheduling
- **BiometricPrompt:** Biometric authentication
- **Play In-App Updates:** Update API
- **Play In-App Review:** Rating API

### Testing Tools

**Accessibility:**
- **Lighthouse** (Web) - Automated accessibility audits
- **axe DevTools** - WCAG compliance checker
- **Accessibility Scanner** (Android) - On-device testing
- **Xcode Accessibility Inspector** (iOS) - Screen reader testing
- **Color Oracle** - Color blindness simulation
- **Stark** (Figma) - Contrast checker plugin
- **WebAIM Contrast Checker** - Online contrast tool

**Performance:**
- **Firebase Performance Monitoring** - Real-time performance tracking
- **New Relic Mobile** - Application performance monitoring
- **Xcode Instruments** (iOS) - Profiling tool
- **Android Profiler** - CPU, memory, network analysis
- **Lighthouse** (Web) - Performance scoring
- **WebPageTest** - Network performance testing

**Usability:**
- **UserTesting** - Remote user testing platform
- **Maze** - Rapid testing and analytics
- **Hotjar** - Heatmaps and session recordings
- **FullStory** - Session replay and analytics
- **Lookback** - User research platform

**Visual QA:**
- **Percy** - Visual regression testing
- **Chromatic** - UI testing for Storybook
- **Applitools** - Visual AI testing

**Bug Reporting:**
- **Shake** - Shake-to-report SDK
- **Instabug** - Bug reporting and crash analytics
- **Firebase Crashlytics** - Crash reporting
- **Sentry** - Error tracking

**Analytics:**
- **Firebase Analytics** - Free, comprehensive
- **Mixpanel** - Product analytics
- **Amplitude** - Behavioral analytics
- **Segment** - Customer data platform

### Industry Statistics & Research

**Mobile App Behavior:**
- 77% of users abandon within 3 days (onboarding critical)
- 90% abandon within first month
- 1 in 4 users abandon after first use
- Good onboarding improves retention by 50%+

**Checkout & Payments:**
- 69% cart abandonment rate on mobile
- 35% conversion increase possible with optimized checkout
- Every extra form field = 11% abandonment increase
- Express payment is 70-80% faster than manual forms

**Notifications:**
- 71% uninstall apps due to annoying notifications
- 64% stop using app if >5 notifications/week
- Optimal timing: 6-8 PM local time
- Safe frequency: 2-5/week for promotional

**Accessibility:**
- 8% of men have color blindness
- 15% of population has some form of disability
- 100% of users benefit from accessible design
- Touch targets <44pt cause rage taps

**Network & Performance:**
- 80% of app usage involves offline/low-data mode by 2025
- <3 second load time expected
- Apps >100MB require WiFi (delayed downloads)
- Battery is #3 reason for app uninstall

---

## 🎯 Key Takeaways - Comprehensive Edition

### Design Principles
1. **Simplicity wins** - Every extra step costs users (11% per form field!)
2. **Follow platform conventions** - Don't reinvent what users already know
3. **Design for thumbs** - Bottom 2/3 of screen is easiest to reach
4. **One column on mobile** - Always. Multi-column = confusion
5. **Progressive disclosure** - Show only what's needed, when needed

### Performance
6. **Performance = retention** - Slow apps get abandoned (3s load max)
7. **Offline-first architecture** - 80% of usage involves low-data mode
8. **Skeleton screens > spinners** - Better perceived performance
9. **WebP images** - 25-35% smaller than JPEG
10. **Battery matters** - GPS and constant sync kill retention

### User Experience
11. **Test with real users** - Assumptions are wrong 80% of time
12. **Accessibility is not optional** - Benefits 100% of users
13. **Consistency builds trust** - Predictable patterns reduce friction
14. **Empty states are opportunities** - Guide users to first action
15. **Errors should be helpful** - Not "Invalid input", but "Phone must be 10 digits"

### Navigation & Information
16. **3-tap rule** - Any feature in max 3 taps
17. **Search first** - Prominent search bar = faster task completion
18. **Bottom navigation wins** - Primary features always accessible
19. **Hamburger menus hide** - Only for secondary features
20. **Back button always works** - Never trap users

### Forms & Checkout
21. **Express payments first** - Apple Pay/Google Pay bypass forms entirely
22. **Inline validation** - Real-time feedback after field completion
23. **Smart keyboards** - Dialpad for numbers, email keyboard for email
24. **Multi-step beats single** - On mobile, less scrolling wins
25. **Show costs upfront** - No surprises = lower abandonment

### Permissions & Privacy
26. **Context-based permission requests** - 70-90% acceptance vs 20-40% on launch
27. **Soft ask before hard ask** - Explain value first
28. **Minimum necessary permissions** - Coarse location, not fine (unless needed)
29. **GDPR/CCPA compliance** - Not optional, legally required
30. **Privacy indicators matter** - Orange/green dots build trust

### Engagement & Retention
31. **Onboarding in 2-3 screens max** - 77% abandon in 3 days
32. **Just-in-time education** - Don't teach everything upfront
33. **Two-step rating prompts** - Filter negatives, boost positives
34. **Notifications <5/week** - 64% churn if exceeded
35. **Personalization drives engagement** - Use behavior data

### Visual Design
36. **Dark mode is expected** - 70%+ users enable it
37. **#121212, not #000000** - Pure black causes eye strain
38. **Contrast 4.5:1 minimum** - WCAG AA standard
39. **Animations 200-500ms** - Never longer (feels slow)
40. **Touch targets 44-48pt** - Smaller = rage taps

### Technical Excellence
41. **RTL support from day one** - 600M Arabic/Hebrew speakers
42. **Internationalization not afterthought** - German text +35% longer
43. **Haptic feedback sparingly** - Crisp and purposeful, not buzzy
44. **Version updates gracefully** - Give 1 week warning before force update
45. **Security by default** - HTTPS only, encrypted storage, token rotation

### Restaurant-Specific
46. **QR codes + manual fallback** - Camera fails sometimes
47. **Split payment flexibility** - Evenly, by item, or custom
48. **Allergen warnings prominent** - Safety first, liability second
49. **Loyalty must be simple** - Confusing programs don't get used
50. **Tipping transparent** - Default percentages, allow custom

---

## 🚀 Quick-Start Priority List

**If you only implement 10 things, make it these:**

1. **Bottom Tab Navigation** (3-5 main features)
2. **Search Bar** (prominent, sticky at top)
3. **Skeleton Loading States** (not spinners)
4. **Inline Form Validation** (immediate feedback)
5. **Express Checkout** (Apple Pay, Google Pay)
6. **Dark Mode** (#121212 background)
7. **Context-Based Permissions** (soft ask first)
8. **44pt Touch Targets** (minimum!)
9. **Offline Indicators** (show network status)
10. **Error States with Actions** ("Retry" not just "Error")

**For restaurant apps specifically:**

11. **QR Code Scanning** + manual table entry
12. **Dietary Filters** in profile
13. **Split Bill Payment**
14. **Push Notifications** for order status only
15. **One-tap Reorder** from history

---

**Remember:** The best UI is invisible. Users should focus on their food, not your interface.

---

## 📊 Document Statistics

- **Total Sections:** 24 comprehensive areas
- **Research Sources:** 50+ authoritative references
- **Checklist Items:** 150+ actionable items
- **Code Examples:** 75+ implementation patterns
- **Industry Stats:** 30+ data-backed insights
- **Platform Coverage:** iOS, Android, Web
- **Word Count:** ~25,000 words

**Coverage includes:**
✅ Platform guidelines (iOS HIG, Material Design)
✅ UX research (Nielsen Norman, Baymard Institute)
✅ Accessibility (WCAG AA, VoiceOver, TalkBack)
✅ Performance optimization (battery, network, app size)
✅ Legal compliance (GDPR, CCPA, COPPA)
✅ Security best practices (HTTPS, encryption, biometrics)
✅ Restaurant-specific features (QR codes, split bills, loyalty)

---

*Document compiled from extensive research - October 2025*
*Sources: Material Design, Apple HIG, Nielsen Norman Group, Baymard Institute, Smashing Magazine, W3C, and 40+ industry research papers*
*Next review: When platform guidelines update or after user testing reveals gaps*
