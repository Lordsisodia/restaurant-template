# Seeds Directory

This directory contains **reusable seed data** for populating the database with demo/test data.

## Purpose
- Demo data for showcasing features
- Test data for development
- Reference data that can be reused across environments
- Sample content for new restaurant deployments

## Files

- **seed_demo.sql** - General demo data
- **seed-blog-posts.sql** - Sample blog posts
- **seed-menu-data.sql** - Menu items and categories

## Usage

### Via Supabase CLI
```bash
# Run all seeds
supabase db reset

# Run specific seed
psql -h localhost -p 55422 -U postgres -d postgres < supabase/seeds/seed-menu-data.sql
```

### Via Dashboard
1. Open Supabase Dashboard SQL Editor
2. Copy/paste seed file contents
3. Execute

## Best Practices

- ✅ Make seeds **idempotent** (safe to run multiple times)
- ✅ Use `ON CONFLICT` clauses to avoid duplicates
- ✅ Include tenant context for multi-tenant data
- ✅ Document data relationships in comments
- ⚠️ Don't hardcode UUIDs that will conflict with production
