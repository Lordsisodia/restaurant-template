-- Blog enhancements: Add image, category, and read_time fields

-- Add new columns to post table
ALTER TABLE post 
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS read_time integer;

-- Add comment for documentation
COMMENT ON COLUMN post.image_url IS 'Featured image URL for the blog post';
COMMENT ON COLUMN post.category IS 'Main category for the post (News, Recipes, Events, etc.)';
COMMENT ON COLUMN post.read_time IS 'Estimated reading time in minutes';

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_post_category ON post(restaurant_id, category) WHERE category IS NOT NULL;

-- Create index for published posts
CREATE INDEX IF NOT EXISTS idx_post_published ON post(restaurant_id, published_at DESC) WHERE published_at IS NOT NULL;
