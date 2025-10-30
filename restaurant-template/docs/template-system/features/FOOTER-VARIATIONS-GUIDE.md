# Footer Variations Guide

This guide shows how to use the different footer variations available in your restaurant template.

## Available Footer Variations

### 1. TenantFooter (Default)
The standard multi-column footer with tenant-specific information, navigation links, and contact details.

**Location:** `src/shared/components/TenantFooter.tsx`

**Features:**
- Dynamic tenant information
- Multi-column layout (3 columns on desktop)
- Enabled pages navigation
- Contact information
- CTA buttons
- Privacy/Terms links

**Usage:**
```tsx
import { TenantFooter } from '@/shared/components';

export default function Page() {
  return (
    <div>
      {/* Your page content */}
      <TenantFooter />
    </div>
  );
}
```

### 2. StackedCircularFooterVariation (NEW)
A modern, centered footer design with circular elements and clean stacked layout.

**Location:** `src/shared/components/StackedCircularFooterVariation.tsx`

**Features:**
- Circular logo container with subtle background
- Centered horizontal navigation
- Circular social media icon buttons
- Newsletter subscription form
- Minimalist centered design
- Modern aesthetic

**Usage:**
```tsx
import { StackedCircularFooterVariation } from '@/shared/components';

export default function Page() {
  return (
    <div>
      {/* Your page content */}
      <StackedCircularFooterVariation />
    </div>
  );
}
```

## Component Structure

### Base Components Used
All footer variations are built on top of shadcn/ui components:
- `Button` - For CTAs and social links
- `Input` - For email subscription
- `Label` - For form accessibility
- `Icons` - For logo and brand icons

**Base Components Location:** `src/components/ui/`

## Customization

### Stacked Circular Footer

To customize the Stacked Circular Footer, edit:
`src/components/ui/stacked-circular-footer.tsx`

**Common Customizations:**

1. **Change Navigation Links:**
```tsx
<nav className="mb-8 flex flex-wrap justify-center gap-6">
  <a href="/" className="hover:text-primary">Home</a>
  <a href="/menu" className="hover:text-primary">Menu</a>
  <a href="/about" className="hover:text-primary">About</a>
  {/* Add more links */}
</nav>
```

2. **Update Social Media Links:**
```tsx
<Button variant="outline" size="icon" className="rounded-full">
  <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
    <Facebook className="h-4 w-4" />
  </a>
  <span className="sr-only">Facebook</span>
</Button>
```

3. **Customize Logo:**
Replace the `Icons.logo` with your own logo component or image:
```tsx
<div className="mb-8 rounded-full bg-primary/10 p-8">
  <img src="/your-logo.svg" alt="Logo" className="w-12 h-12" />
</div>
```

4. **Modify Copyright Text:**
```tsx
<p className="text-sm text-muted-foreground">
  © {new Date().getFullYear()} Your Restaurant Name. All rights reserved.
</p>
```

5. **Handle Newsletter Subscription:**
Add form submission logic:
```tsx
<form
  className="flex space-x-2"
  onSubmit={(e) => {
    e.preventDefault();
    // Add your subscription logic here
  }}
>
  {/* form fields */}
</form>
```

## Choosing the Right Footer

| Feature | TenantFooter | StackedCircularFooter |
|---------|-------------|----------------------|
| Layout | Multi-column | Stacked/Centered |
| Best For | Information-heavy sites | Minimalist designs |
| Navigation | Left-aligned list | Centered horizontal |
| Social Media | Optional | Prominent circular buttons |
| Newsletter | No | Yes |
| Responsive | 3 → 1 column | Always centered |

## Page Integration Examples

### Landing Page (Modern Look)
```tsx
import { StackedCircularFooterVariation } from '@/shared/components';

export default function LandingPage() {
  return (
    <>
      <main>
        {/* Landing page content */}
      </main>
      <StackedCircularFooterVariation />
    </>
  );
}
```

### Menu Page (Standard Footer)
```tsx
import { TenantFooter } from '@/shared/components';

export default function MenuPage() {
  return (
    <>
      <main>
        {/* Menu content */}
      </main>
      <TenantFooter />
    </>
  );
}
```

## Dependencies

All required dependencies are already installed:
- ✅ `lucide-react` - For icons
- ✅ `@radix-ui/react-slot` - For Button component
- ✅ `@radix-ui/react-label` - For Label component
- ✅ `class-variance-authority` - For variant styling
- ✅ `tailwindcss` - For styling

## Troubleshooting

### Issue: Icons not showing
**Solution:** Ensure the Icons component is properly exported in `src/components/ui/icons.tsx`

### Issue: Styling looks wrong
**Solution:** Check that Tailwind CSS is properly configured and the project is using the correct theme variables

### Issue: Links not working
**Solution:** Replace `href="#"` with actual route paths in your navigation

## Next Steps

1. ✅ Components installed in `src/components/ui/`
2. ✅ Shared component wrapper created
3. ✅ All dependencies verified
4. 🎨 Customize the footer to match your brand
5. 🔗 Update navigation links
6. 📧 Implement newsletter subscription
7. 🌐 Add real social media links

## Support

For issues or questions, check:
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Project README.md
