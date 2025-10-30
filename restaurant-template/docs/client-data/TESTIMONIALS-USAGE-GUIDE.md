# Testimonials Component Usage Guide

## ✅ Installation Complete

Your new testimonials component has been successfully integrated! All dependencies are already installed.

### What Was Set Up

1. **New Component**: `/src/components/ui/testimonials-columns-1.tsx`
   - Reusable testimonials column component with smooth animations
   - Supports custom testimonial data format

2. **Demo Component**: `/src/components/ui/testimonials-demo.tsx`
   - Standalone example showing how to use the component
   - Includes sample testimonial data

3. **Updated Template**: `/src/domains/customer-facing/landing/sections/review-section/custom-templates/ScrollingColumns.tsx`
   - Now uses the new testimonials component
   - Automatically converts database reviews to testimonial format
   - Shows avatar images for each reviewer

## 🎯 How to Use

### Option 1: Use the Scrolling Columns Variant (Recommended)

The landing page already has the review system set up. To use your new scrolling columns design:

1. **Set the variant in your siteConfig** (create if needed):

```typescript
// In your site configuration file
export const siteConfig = {
  features: {
    reviews: {
      variant: 'scrolling-columns',  // 👈 This uses your new component
      title: 'What Our Guests Say'
    }
  }
}
```

2. **Alternatively, update the landing page directly**:

```typescript
// src/domains/customer-facing/landing/index.tsx (line 108)
<ReviewHost
  variant="scrolling-columns"  // 👈 Change this
  reviews={allReviews}
  avgRating={avgRating}
  totalCount={allReviews.length}
  title="What Our Guests Say"
  viewAllHref="/reviews"
/>
```

### Option 2: Create Custom Page with Demo Data

If you want to use the component standalone with custom data:

```typescript
import Testimonials from '@/components/ui/testimonials-demo';

export default function TestimonialsPage() {
  return <Testimonials />;
}
```

### Option 3: Use Component Directly

For maximum flexibility:

```typescript
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';

const myTestimonials = [
  {
    text: "Amazing food and service!",
    image: "https://example.com/person.jpg",
    name: "John Doe",
    role: "Regular Customer"
  },
  // ... more testimonials
];

export default function MyReviews() {
  const col1 = myTestimonials.slice(0, 3);
  const col2 = myTestimonials.slice(3, 6);
  const col3 = myTestimonials.slice(6, 9);

  return (
    <section className="bg-background my-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          Customer Reviews
        </h2>

        <div className="flex justify-center gap-6 max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={15} />
          <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
```

## 🎨 Customization

### Add Real Customer Photos

The current implementation uses auto-generated avatar images. To add real photos:

1. **Store photos in your database** or use a CDN
2. **Update the review data** to include `customer_photo_url`
3. **Modify the converter** in `ScrollingColumns.tsx`:

```typescript
function reviewToTestimonial(review: Review): Testimonial {
  const imageUrl = review.customer_photo_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(review.authorName)}`;

  return {
    text: review.comment || 'Great experience!',
    image: imageUrl,
    name: review.authorName,
    role: `${review.rating} ⭐`
  };
}
```

### Change Animation Speed

Adjust the `duration` prop on each column:
- Lower number = faster scrolling
- Higher number = slower scrolling

```typescript
<TestimonialsColumn testimonials={col1} duration={10} /> // Fast
<TestimonialsColumn testimonials={col2} duration={20} /> // Slow
```

### Modify Styling

The component uses Tailwind classes. Common modifications:

```typescript
// Change card appearance
className="p-10 rounded-3xl border shadow-lg" // Current
className="p-6 rounded-xl border-2 shadow-md" // Alternative

// Change column width
className="max-w-xs" // Current (320px)
className="max-w-sm" // Wider (384px)
className="max-w-md" // Even wider (448px)
```

## 📱 Responsive Behavior

- **Mobile**: Shows 1 column
- **Tablet (md)**: Shows 2 columns
- **Desktop (lg+)**: Shows 3 columns

To modify breakpoints, edit the `className` props:

```typescript
<TestimonialsColumn testimonials={col2} className="hidden md:block" /> // Shows at 768px+
<TestimonialsColumn testimonials={col3} className="hidden xl:block" /> // Shows at 1280px+
```

## 🔄 Data Integration

The component automatically converts your database reviews:

**Database Schema** → **Testimonial Format**
```
Review {                    Testimonial {
  id                         (not used)
  authorName         →       name
  rating             →       role (as "5 ⭐")
  comment            →       text
  publishedAt        →       role (as date)
}                           image (auto-generated)
                          }
```

## 🚀 Testing

To see your changes:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the updated reviews section.

## 📋 Available Review Variants

Your site now supports these review variants:
- `classic` - Traditional grid layout
- `modern` - Contemporary design
- `minimal` - Simple and clean
- `featured` - Highlights top reviews
- `testimonial` - Emphasis on quotes
- `grid` - Grid testimonials
- `glass-swiper` - Glassmorphism carousel
- `image-masonry` - Masonry grid with images
- `stagger-cards` - Staggered card animation
- `animated-stack` - Stacked card animation
- **`scrolling-columns`** - Your new infinite scrolling columns ✨

## 🎯 Quick Win

Want to see it immediately? Update your landing page:

```typescript
// src/domains/customer-facing/landing/index.tsx
<ReviewHost
  variant="scrolling-columns"  // 👈 Add this
  reviews={allReviews}
  // ... rest of props
/>
```

Then run `npm run dev` and check your homepage! 🎉

---

**Need help?** The component is fully TypeScript typed, so your IDE will guide you with autocomplete and inline documentation.
