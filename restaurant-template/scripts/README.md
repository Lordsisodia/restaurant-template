# 📜 Scripts Guide

This directory contains scripts for setting up, managing, and developing your restaurant template.

## 📂 Directory Structure

```
scripts/
├── setup/           # 🚀 Initial setup (run once per restaurant)
├── utils/           # 🛠️  Reusable utilities
├── config/          # ⚙️  Build configuration
└── dev/             # 🧪 Development tools (optional)
```

---

## 🚀 Initial Setup (Run Once)

### 1. Initialize Your Restaurant

Creates your restaurant in the database with basic information.

```bash
npm run setup:init
```

**What it does:**
- Prompts for restaurant name, slug, timezone, and domain
- Creates restaurant entry in database
- Sets up initial configuration

**Requirements:**
- `.env` file with `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`
- Database migrations applied (`supabase db push`)

### 2. Import Menu Data

Import your restaurant's menu from a JSON file.

```bash
npm run setup:menu -- --input path/to/menu.json
```

**Example menu.json format:**
```json
{
  "categories": [
    {
      "name": "Coffee",
      "slug": "coffee",
      "items": [
        {
          "name": "Espresso",
          "description": "Rich Italian espresso",
          "price": 3500000
        }
      ]
    }
  ]
}
```

### 3. Import Reviews (Optional)

Import customer reviews from a JSON file.

```bash
npm run setup:reviews -- --input path/to/reviews.json
```

**Example reviews.json format:**
```json
{
  "reviews": [
    {
      "author_name": "John Doe",
      "rating": 5,
      "comment": "Amazing coffee!",
      "source": "Google Maps",
      "verified": true,
      "featured": true
    }
  ]
}
```

---

## 🛠️ Utilities

### Optimize Images

Compress and optimize all images in your project.

```bash
npm run utils:optimize-images
```

**What it does:**
- Compresses PNG/JPG/WebP images
- Maintains aspect ratios
- Reduces file sizes for faster loading

### Catalog Images

Generate a catalog of all images in your project.

```bash
npm run utils:catalog-images
```

**Output:** Creates `image-catalog.json` with all image paths and metadata.

---

## ⚙️ Configuration

Build configuration files are stored in `scripts/config/`:

- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `eslint.config.mjs` - ESLint rules for code quality

These files are automatically used by the build system.

---

## 🧪 Development Tools

Scripts in `/scripts/dev/` are for development only and not required for production use.

### Database Tools

```bash
# Check database connection and tables
node scripts/dev/check-db.mjs

# Run custom database queries
node scripts/dev/query-db.mjs "SELECT * FROM restaurants"
```

### Review Processing

```bash
# Parse reviews from external sources
node scripts/dev/parse-reviews.mjs --source google-maps

# Validate review schema
node scripts/dev/check-review-schema.mjs
```

### Other Dev Tools

- `apply-migrations.mjs` - Manual migration runner (use `supabase db push` instead)
- `setup-blog.mjs` - Blog setup utilities
- `apply-grab-config.mjs` - Grab food delivery integration

---

## 📚 Examples

See `/examples/draco-coffee/` for a complete example setup:

- `setup-draco.sql` - Full restaurant setup
- `seed-menu-data.sql` - Menu data seeding
- `*.json` - Parsed review data examples

---

## 🔒 Security Notes

**Never commit credentials!**

- Use `.env` files for sensitive data
- Add `.env` to `.gitignore`
- Use environment variables in production

**Required environment variables:**
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

---

## 🆘 Troubleshooting

### "Missing environment variables"
- Ensure `.env` file exists in project root
- Check that `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set

### "No tenant group found"
- Run database migrations first: `supabase db push`
- Ensure `tenant_group` table exists

### "Restaurant already exists"
- Check if restaurant slug is unique
- Use a different slug or update existing restaurant

---

## 📖 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Template Migration Guide](../supabase/migrations/README.md)
- [API Documentation](../docs/api.md)

---

**Need help?** Open an issue or contact support.
