Supabase usage:
- Server-side: withTenantSupabase() creates Supabase client via createSupabaseServerClient using NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
- Browser: createSupabaseBrowserClient falls back to HARDCODED supabase URL/ANON if env missing (debug). Blog routes should prefer server fetch
- Tenant resolution via x-restaurant-* headers set in withTenantSupabase and pods.json config