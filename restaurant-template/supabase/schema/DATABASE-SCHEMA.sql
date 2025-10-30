-- Restaurant Image Management Schema
-- Reviews are hardcoded, Gallery and Menu are in DB

-- Clients/Restaurants table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  cloudinary_folder TEXT NOT NULL, -- "restaurants/client-{uuid}"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu Items (with Cloudinary images)
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Item details
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category TEXT, -- 'appetizers', 'entrees', 'desserts', 'drinks'

  -- Cloudinary image
  cloudinary_public_id TEXT NOT NULL,
  image_url TEXT, -- Cached URL for faster access

  -- Metadata
  is_featured BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Photos (with Cloudinary images)
CREATE TABLE gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Photo details
  title TEXT,
  caption TEXT,

  -- Cloudinary image
  cloudinary_public_id TEXT NOT NULL,
  image_url TEXT, -- Cached URL

  -- Metadata
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  tags TEXT[], -- ['food', 'interior', 'team', etc.]

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews (NO images in DB - hardcoded in /public/reviews/)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Review details
  customer_name TEXT NOT NULL,
  customer_photo_path TEXT, -- Reference to /public/reviews/customer-1.webp
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,

  -- Metadata
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_menu_items_client ON menu_items(client_id, category);
CREATE INDEX idx_menu_items_featured ON menu_items(client_id, is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_gallery_photos_client ON gallery_photos(client_id);
CREATE INDEX idx_gallery_photos_featured ON gallery_photos(client_id, is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_reviews_client ON reviews(client_id);
CREATE INDEX idx_reviews_featured ON reviews(client_id, is_featured) WHERE is_featured = TRUE;

-- Row Level Security (RLS)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies (example - adjust based on your auth)
-- Allow clients to manage their own data
CREATE POLICY "Clients can manage own menu items"
  ON menu_items
  FOR ALL
  USING (client_id IN (
    SELECT id FROM clients WHERE id = auth.uid()
  ));

CREATE POLICY "Clients can manage own gallery"
  ON gallery_photos
  FOR ALL
  USING (client_id IN (
    SELECT id FROM clients WHERE id = auth.uid()
  ));

CREATE POLICY "Clients can manage own reviews"
  ON reviews
  FOR ALL
  USING (client_id IN (
    SELECT id FROM clients WHERE id = auth.uid()
  ));

-- Public read access (for customer-facing site)
CREATE POLICY "Anyone can read menu items"
  ON menu_items
  FOR SELECT
  USING (is_available = TRUE);

CREATE POLICY "Anyone can read gallery"
  ON gallery_photos
  FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can read featured reviews"
  ON reviews
  FOR SELECT
  USING (is_featured = TRUE);
