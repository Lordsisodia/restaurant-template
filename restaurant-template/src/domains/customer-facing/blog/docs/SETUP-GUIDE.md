# Blog System Setup Guide

## ✅ Database Setup

### Step 1: Apply Migration
The blog table already exists from the core migration (`202510200935__blog_core.sql`), but we need to add the new fields.

**Apply the enhancement migration:**
```bash
# Navigate to your project root
cd restaurant-template

# The migration file is ready at:
# supabase/migrations/202510260000__blog_enhancements.sql
```

This migration adds:
- `image_url` - Featured image for blog posts
- `category` - Post category (News, Recipes, Events, etc.)
- `read_time` - Estimated reading time in minutes

### Step 2: Verify Tables Exist

Your Supabase database should have these tables:
- ✅ `post` - Blog posts
- ✅ `tag` - Tags for categorization
- ✅ `post_tag` - Many-to-many relationship

**Schema:**
```sql
post (
  id uuid PRIMARY KEY,
  restaurant_id uuid,
  title text NOT NULL,
  slug text NOT NULL,
  excerpt text,
  content text,
  published_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  image_url text,        -- NEW
  category text,         -- NEW
  read_time integer      -- NEW
)
```

---

## 📝 Adding Blog Posts

### Option 1: Use the Admin Panel
Navigate to `/admin/blog` in your app (already implemented in `AdminBlogPage.tsx`).

### Option 2: Use Seed Data
We've created sample blog posts for you!

**File:** `supabase/seed-blog-posts.sql`

**Steps:**
1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Open the seed file: `supabase/seed-blog-posts.sql`
4. Replace `'YOUR_RESTAURANT_ID'` with your actual restaurant UUID
5. Update image URLs to match your images
6. Click "Run"

**Sample Posts Included:**
1. ✅ Welcome post (News category, 3 min read)
2. ✅ Recipe post (Recipes category, 5 min read)
3. ✅ Event announcement (Events category, 4 min read)
4. ✅ Unpublished draft (for testing admin panel)

### Option 3: Insert Manually
```sql
INSERT INTO post (
  restaurant_id,
  title,
  slug,
  excerpt,
  content,
  category,
  image_url,
  read_time,
  published_at
) VALUES (
  'your-restaurant-id-here'::uuid,
  'My Blog Post Title',
  'my-blog-post-title',
  'This is a short excerpt...',
  '<p>Full HTML content here...</p>',
  'News',
  '/images/blog/my-post.jpg',
  5,
  NOW()
);
```

---

## 🎨 Customization

### Configure Blog Hero
Provide `HeroRenderer` with tenant-specific content:

```tsx
import { HeroRenderer, type HeroContent } from '@/domains/customer-facing/blog/sections/hero-section';

const heroContent: HeroContent = {
  pillText: 'Stories',
  title: 'Custom Blog Title',
  subtitle: 'A peek behind the pass',
  backgroundImageUrl: '/images/custom-hero.jpg',
};

<HeroRenderer content={heroContent} variant="primary" />;
```

### Add Categories
`CategoriesRenderer` will auto-build from posts, but you can seed explicit categories:

```tsx
import { CategoriesRenderer, type CategoriesContent } from '@/domains/customer-facing/blog/sections/categories-section';

const categoriesContent: CategoriesContent = {
  categories: [
    { key: 'all', label: 'All Stories', pillText: 'FEATURED' },
    { key: 'news', label: 'News' },
    { key: 'recipes', label: 'Recipes' },
  ],
  activeCategoryKey: 'all',
};

<CategoriesRenderer content={categoriesContent} onCategoryChange={setCategory} />;
```

### Customize Listing Layout
Adjust the feed layout inside `listing-section/templates/primary/ListingPrimary.tsx`:

```tsx
// Change the grid density or featured logic as needed
<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
```

---

## 🖼️ Adding Images

### Recommended Image Specs
- **Hero Images:** 1920x600px (3:1 ratio)
- **Featured Images:** 1200x630px (16:9 ratio)
- **Card Thumbnails:** 800x450px (16:9 ratio)

### Image Locations
Store blog images in:
```
public/
└── images/
    ├── defaults/
    │   └── hero-default.jpg
    └── blog/
        ├── welcome.jpg
        ├── pasta-making.jpg
        └── tasting-menu.jpg
```

### Using Cloudinary (Optional)
If using Cloudinary, update the image URLs:
```sql
UPDATE post 
SET image_url = 'https://res.cloudinary.com/your-cloud/image/upload/v1/blog/welcome.jpg'
WHERE slug = 'welcome-to-our-kitchen-stories';
```

---

## 🚀 Deployment Checklist

- [ ] Apply migration: `202510260000__blog_enhancements.sql`
- [ ] Verify `post` table has new columns
- [ ] Add seed data or create posts via admin panel
- [ ] Upload blog images to `/public/images/blog/`
- [ ] Test blog list page: `/blog`
- [ ] Test individual post page: `/blog/your-post-slug`
- [ ] Test category filtering
- [ ] Verify mobile responsive design
- [ ] Check admin panel: `/admin/blog`

---

## 🔧 Troubleshooting

### "No blog posts yet" message
- Check that posts have `published_at` set (not NULL)
- Verify `restaurant_id` matches your current restaurant
- Check Supabase connection in `.env.local`

### Images not loading
- Verify image paths start with `/images/blog/`
- Check that images exist in `public/images/blog/`
- Ensure image URLs are correct in database

### Category filter not working
- BlogPage must be a client component (`'use client'`)
- Check that posts have `category` field populated
- Verify category state is being passed correctly

### Styles not applied
- Run `npm run dev` to rebuild
- Check Tailwind config includes blog domain
- Verify shadcn components are installed

---

## 📚 API Reference

### Blog Data Functions

```typescript
// List all published posts
const posts = await listPosts();

// Get specific post by slug
const post = await getPostBySlug('my-post-slug');

// Create new post
await createPost({
  title: 'My New Post',
  excerpt: 'Short description',
  content: '<p>HTML content</p>',
  category: 'News',
  imageUrl: '/images/blog/post.jpg',
  readTime: 5,
  publishedAt: new Date().toISOString()
});

// Update existing post
await updatePost({
  id: 'post-uuid',
  title: 'Updated Title',
  category: 'Recipes'
});

// Delete post
await deletePost('post-uuid');
```

---

## 🎯 Next Steps

1. **Apply the migration** to add new fields
2. **Add seed data** to test the blog
3. **Upload some images** to `/public/images/blog/`
4. **Test the blog pages** in your browser
5. **Customize** the design to match your brand
6. **Add more templates** from v0.dev/21st.dev

---

**Setup Status:** Ready for deployment  
**Database:** Connected and configured  
**Components:** Built and tested  
**Documentation:** Complete
