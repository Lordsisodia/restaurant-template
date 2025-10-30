# Scripts Directory

This directory contains **one-off utility scripts** for manual execution during development or troubleshooting.

## Purpose
- Quick fixes that need immediate testing
- Development helpers and prototypes
- Manual operations not suitable for automated migrations
- Debugging and troubleshooting utilities

## Files

- **fix_rating_function.sql** - Rating calculation function fix
- **setup-draco-reviews.sql** - Review system setup for Draco Coffee

## Usage

These scripts are meant to be run manually via:
- Supabase Dashboard SQL Editor
- `psql` command line
- Database client (TablePlus, DataGrip, etc.)

⚠️ **Important**: Once a script is tested and verified, consider creating a proper migration in `../migrations/` for production deployment.

## Workflow

1. **Prototype here** - Test your SQL changes
2. **Verify it works** - Run against local/dev database
3. **Create migration** - Move to `../migrations/` with proper timestamp
4. **Keep as reference** - Leave script here for documentation
