# Schema Directory

This directory contains **reference documentation** for the complete database schema.

## Purpose
- Full schema snapshot for documentation
- Quick reference for developers
- Onboarding new team members
- Architecture documentation

## Files

- **DATABASE-SCHEMA.sql** - Complete database schema in one file

## Usage

This is primarily for **reference and documentation**. For actual schema changes:
- Use `../migrations/` for versioned changes
- Use `../scripts/` for experimental changes

### Generating Fresh Schema Snapshot
```bash
# Via Supabase CLI
supabase db dump -f supabase/schema/DATABASE-SCHEMA.sql

# Or via pg_dump
pg_dump -h localhost -p 55422 -U postgres --schema-only postgres > supabase/schema/DATABASE-SCHEMA.sql
```

## When to Update

- After major migration batches
- Before major releases
- When documenting architecture
- For client/team presentations

⚠️ **Note**: This is a snapshot, not the source of truth. The `../migrations/` folder is the authoritative schema definition.
