# Supabase Database Configuration

Complete database configuration and management for the restaurant template.

> Runtime code that talks to Supabase (cookies, tenant headers, auth clients) lives under `src/lib/supabase/`. This directory is strictly for migrations, seeds, and CLI configuration.

## 📁 Directory Structure

```
supabase/
├── config.toml          # Supabase local dev configuration
├── migrations/          # ✅ Versioned, automated schema changes
├── seeds/              # 🌱 Reusable demo/test data
├── scripts/            # 🔧 One-off utility scripts
├── schema/             # 📖 Reference documentation
└── .temp/              # Supabase CLI temporary files
```

## 🚀 Quick Start

### Local Development
```bash
# Start Supabase local instance
supabase start

# Run migrations
supabase db reset

# Apply specific seed
psql -h localhost -p 55422 -U postgres -d postgres < supabase/seeds/seed-menu-data.sql
```

### Creating New Changes

**For schema changes (production-ready):**
```bash
supabase migration new add_feature_name
# Edit the created file in migrations/
supabase db reset  # Test locally
```

**For experimental changes:**
- Add to `scripts/` for quick testing
- Once verified, create proper migration

## 📂 Folder Purposes

### `migrations/` - The Source of Truth
- **Versioned** schema changes with timestamps
- **Automated** deployment via CI/CD
- **Tracked** by Supabase migration system
- **Required** for all production schema changes

### `seeds/` - Demo & Test Data
- **Reusable** across environments
- **Idempotent** (safe to run multiple times)
- **Optional** for production
- Used for development and demos

### `scripts/` - Developer Utilities
- **One-off** fixes and experiments
- **Manual** execution only
- **Not tracked** in migration history
- Converted to migrations after verification

### `schema/` - Documentation
- **Snapshots** of complete schema
- **Reference** for developers
- **Not executable** as source of truth
- Updated periodically for documentation

## 🔄 Typical Workflow

1. **Experiment** - Test SQL in `scripts/`
2. **Verify** - Run against local database
3. **Migrate** - Create migration in `migrations/`
4. **Deploy** - Automated via Supabase CLI
5. **Document** - Update schema snapshot if needed

## 🎯 Multi-Tenant Considerations

This template uses **multi-tenant architecture**:
- All tables include `tenant_id` for data isolation
- Row Level Security (RLS) enforces tenant boundaries
- Migrations apply schema changes to all tenants
- Seeds can be tenant-specific or shared

## 📝 Best Practices

✅ **DO:**
- Use migrations for all schema changes
- Make seeds idempotent with `ON CONFLICT`
- Test scripts locally before creating migrations
- Document complex changes in migration files

❌ **DON'T:**
- Manually edit the database in production
- Skip migration files for "quick fixes"
- Hardcode UUIDs in seed data
- Mix schema and data changes in one migration

## 🔗 Related Files

- `/database/` - **DEPRECATED** - Files moved to this structure
- Configuration is defined in `config.toml`

## 🛠️ Useful Commands

```bash
# Reset database completely
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts

# Dump current schema
supabase db dump -f supabase/schema/DATABASE-SCHEMA.sql

# Apply migrations to remote
supabase db push

# Pull remote schema
supabase db pull
```

---

**Questions?** Check folder-specific READMEs:
- `seeds/README.md` - Seed data guidelines
- `scripts/README.md` - Script usage patterns
- `schema/README.md` - Schema documentation approach
