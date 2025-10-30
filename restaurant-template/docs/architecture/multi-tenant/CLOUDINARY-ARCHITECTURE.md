# 🏗️ Cloudinary Multi-Client Architecture

## Overview

This system provides **isolated, organized storage** for each restaurant client using Cloudinary's folder structure with automatic metadata tracking.

## 📁 Folder Structure

```
restaurants/
├── client-{uuid-1}/
│   ├── menu/
│   │   ├── appetizers/
│   │   ├── entrees/
│   │   ├── desserts/
│   │   └── drinks/
│   ├── hero/
│   ├── gallery/
│   ├── team/
│   └── logo/
├── client-{uuid-2}/
│   ├── menu/
│   └── hero/
```

## 🎯 Key Benefits

### ✅ Pros of This Architecture

1. **Complete Isolation** - Each client's images are separate
2. **Easy Migration** - Can export entire client folder if they churn
3. **Organized Structure** - Logical hierarchy (menu → appetizers)
4. **Scalable** - Works for 1 or 10,000 clients
5. **Cost Tracking** - Easy to monitor per-client storage usage
6. **No Database Bloat** - Only store URLs, not binary data
7. **CDN Benefits** - Cloudinary handles global delivery
8. **Auto-Optimization** - WebP/AVIF conversion, responsive images

### ⚠️ Considerations

1. **Folder Limits** - Cloudinary has limits on folders (10,000+ is fine)
2. **API Calls** - Listing images requires API calls (cached in DB)
3. **Vendor Lock-in** - Tied to Cloudinary (mitigated by storing public_ids)

## 🚀 Usage Examples

### 1. Upload Images for Client

```tsx
'use client';

import { ClientImageUploader } from '@/components/client-image-uploader';

export default function RestaurantDashboard({ clientId }: { clientId: string }) {
  return (
    <div>
      <h2>Upload Menu Images</h2>
      <ClientImageUploader
        clientId={clientId}
        category="menu"
        subcategory="appetizers"
        onUploadComplete={(publicId) => {
          console.log('Uploaded:', publicId);
          // Save to database
        }}
      />
    </div>
  );
}
```

### 2. Display Client Images

```tsx
import { CloudinaryImage } from '@/components/ui/cloudinary-image';

export function MenuGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((publicId) => (
        <CloudinaryImage
          key={publicId}
          publicId={publicId}
          alt="Menu item"
          width={400}
          aspectRatio="square"
        />
      ))}
    </div>
  );
}
```

### 3. Server-Side Upload

```tsx
// app/api/import-menu/route.ts
import { uploadToCloudinary } from '@/lib/integrations/cloudinary';

export async function POST(request: Request) {
  const { clientId, imageUrl } = await request.json();

  // Import from external URL
  const result = await uploadToCloudinary(imageUrl, {
    clientId,
    category: 'menu',
    subcategory: 'entrees',
  });

  return Response.json(result);
}
```

### 4. List All Client Images

```tsx
import { listClientImages } from '@/lib/integrations/cloudinary';

export async function getClientMenuImages(clientId: string) {
  // Get all menu images
  const images = await listClientImages(clientId, 'menu');

  return images;
}

// Or get specific subcategory
export async function getAppetizers(clientId: string) {
  const images = await listClientImages(clientId, 'menu', 'appetizers');
  return images;
}
```

## 💾 Database Integration

### Schema

```sql
-- Track image metadata in Supabase
create table images (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  cloudinary_public_id text not null unique,
  category text,
  subcategory text,
  display_order int,
  metadata jsonb,
  created_at timestamptz default now()
);

create index idx_images_client_category on images(client_id, category);
```

### Save After Upload

```tsx
const result = await uploadToCloudinary(file, {
  clientId: 'abc-123',
  category: 'menu',
});

// Save to database
await supabase.from('images').insert({
  client_id: 'abc-123',
  cloudinary_public_id: result.publicId,
  category: 'menu',
  subcategory: 'appetizers',
});
```

## 🎨 Advanced Features

### 1. Bulk Import

```tsx
const importImages = async (clientId: string, urls: string[]) => {
  for (const url of urls) {
    await uploadToCloudinary(url, {
      clientId,
      category: 'menu',
    });
  }
};
```

### 2. Image Transformations

```tsx
import { CloudinaryImage } from '@/components/ui/cloudinary-image';

// Automatic WebP/AVIF, quality optimization, lazy loading
<CloudinaryImage
  publicId="restaurants/client-abc/menu/burger.jpg"
  alt="Gourmet burger"
  width={800}
  aspectRatio="16:9"
/>
```

### 3. Storage Monitoring

```tsx
import { getClientFolderStats } from '@/lib/integrations/cloudinary';

const stats = await getClientFolderStats('client-abc');
console.log(`Images: ${stats.count}, Size: ${stats.totalMB}MB`);
```

### 4. Client Offboarding

```tsx
import { deleteClientFolder } from '@/lib/integrations/cloudinary';

// Delete ALL client images (use with caution!)
await deleteClientFolder('client-abc');
```

## 🔒 Security Best Practices

1. **Server-Side Uploads** - Never expose API keys to client
2. **Signed URLs** - Use signed URLs for sensitive content
3. **Access Control** - Validate client ownership before upload/delete
4. **Rate Limiting** - Prevent abuse with upload limits
5. **File Validation** - Check file types and sizes server-side

```tsx
// Example: Validate ownership
export async function POST(request: Request) {
  const session = await getServerSession();
  const { clientId } = await request.json();

  // Verify user owns this client
  const hasAccess = await checkClientAccess(session.user.id, clientId);
  if (!hasAccess) {
    return new Response('Unauthorized', { status: 403 });
  }

  // Proceed with upload...
}
```

## 📊 Cost Optimization

### Storage Tiers

```
Free Tier:    25 GB storage, 25 GB bandwidth
Plus Plan:    $99/month - 100 GB storage, 100 GB bandwidth
Advanced:     Custom pricing for enterprise
```

### Optimization Strategies

1. **Auto-format** - Use format('auto') to serve WebP/AVIF
2. **Auto-quality** - Use quality('auto') to reduce file sizes
3. **Lazy Loading** - Only load images when needed
4. **Responsive Breakpoints** - Generate multiple sizes
5. **Caching** - Cache cloudinary URLs in DB

### Example Cost Calculation

```
100 Clients × 50 images each = 5,000 images
Average 500KB per image = 2.5 GB storage
Monthly bandwidth: ~25 GB (assuming moderate traffic)

Cost: Free Tier (under limits)
```

## 🚀 Production Checklist

- [ ] Set up Cloudinary account
- [ ] Add environment variables
- [ ] Create database schema
- [ ] Test upload flow
- [ ] Implement access control
- [ ] Set up monitoring
- [ ] Configure CDN/caching
- [ ] Test delete operations
- [ ] Set up backup strategy
- [ ] Document for team

## 📚 Resources

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [Folder Organization Best Practices](https://cloudinary.com/documentation/dam_folders_collections)

---

**Architecture Version:** 1.0
**Last Updated:** 2025-10-24
**Author:** SISO SuperClaude
