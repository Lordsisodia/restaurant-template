# API Surface (Next.js Route Handlers)

Only a handful of API routes exist today; document them so consumers (admin tools, automation, future mobile apps) know how to interact safely. All routes live under `src/app/api/*`.

## `/api/menu-items`
Supports CRUD operations for menu items tied to a tenant (legacy client-centric schema `menu_items` table).

### POST `/api/menu-items`
Create a menu item.

**Body** (JSON):
```json
{
  "client_id": "uuid",
  "name": "Avocado Toast",
  "description": "Sourdough, feta, cherry tomatoes",
  "price": 59000,
  "category": "Breakfast",
  "cloudinary_public_id": "restaurants/client-123/avocado-toast"
}
```
- `client_id`, `name`, `price`, `cloudinary_public_id` required.
- Response: inserted row from `menu_items`.
- Uses Supabase client-side generated image URL (`image_url` built from Cloudinary public id). Legacy schema—new work should prefer domain-driven menu tables (`item`, `category`, etc.).

### GET `/api/menu-items?clientId=<uuid>&category=Breakfast`
- Returns `{ items: [...] }` filtered by client and optional category.
- Only returns `is_available = true` items.

### DELETE `/api/menu-items?id=<uuid>`
- Deletes row by `id` from `menu_items` table.

**Auth:** Currently unauthenticated (TODO: add Clerk/Supabase auth + RLS alignment). Use cautiously in production.

## `/api/gallery`
Manage gallery photos stored in `gallery_photos` (legacy) for a tenant.

### POST `/api/gallery`
```json
{
  "client_id": "uuid",
  "cloudinary_public_id": "restaurants/client-123/gallery/photo1",
  "image_url": "https://...",
  "title": "Interior",
  "caption": "Main seating area",
  "tags": ["interior", "day"]
}
```
Returns inserted row.

### GET `/api/gallery?clientId=<uuid>`
Returns `{ photos: [...] }` ordered by `display_order` (if present).

### DELETE `/api/gallery?publicId=<public-id>`
Deletes gallery photo by Cloudinary public id.

**Auth:** Currently unauthenticated (TODO). Ensure admin routes proxy requests rather than exposing endpoints publicly.

## `/api/upload`
Proxy for Cloudinary uploads/deletes and listing stored images.

### POST `/api/upload`
Multipart form-data:
- `file` (binary)
- `clientId`
- `category` (optional)
- `subcategory` (optional)

Uploads file via `uploadToCloudinary`. TODO: persist metadata in Supabase (`images` table when introduced).

### DELETE `/api/upload`
Body `{ "publicId": "..." }` – deletes image from Cloudinary. TODO: delete related DB row when implemented.

### GET `/api/upload?clientId=<uuid>&category=menu`
Returns `{ images: [...] }` from Cloudinary via `listClientImages` helper.

**Auth:** None yet; should be restricted to admin usage (Clerk/Supabase auth + rate limiting recommended).

## TODO / Future API work
- Replace legacy `client_id` schema with restaurant-aware endpoints hitting new `item`, `category`, `gallery_photos` tables.
- Add authentication/authorization (Clerk JWT or Supabase RLS) before exposing to production.
- Document additional admin APIs as they are added (reservations, leads, gift-cards, etc.).
