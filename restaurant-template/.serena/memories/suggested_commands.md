If Supabase not configured, /blog will fall back to an in-memory sample post. To use real data:
- Create `.env.local` with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or anon), DEFAULT_* tenant values
- Apply migrations in restaurant-template/supabase/migrations
- Seed posts via restaurant-template/supabase/seed-blog-posts.sql