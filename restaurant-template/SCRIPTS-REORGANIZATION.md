# 🎯 Scripts Folder Reorganization - Complete

## ✅ What We Did

Reorganized the scripts folder from a **development-centric** structure to a **template-first** structure that's clear and maintainable for client projects.

---

## 📊 Before & After

### **BEFORE (Messy)**
```
scripts/
├── DATABASE-SCHEMA.sql              ❌ Wrong location
├── setup-draco-reviews.sql          ❌ Client-specific in template
├── seed-menu-data-RUNME.sql         ❌ Wrong location
├── execute-setup.mjs                ❌ Hardcoded credentials
├── run-setup.mjs                    ❌ Duplicate
├── parse-reviews.mjs                ❌ Dev-only
├── import-reviews.mjs               ⚠️  Needs refactoring
├── check-db.mjs                     ❌ Dev-only
├── query-db.mjs                     ❌ Dev-only
├── postcss.config.mjs               ⚠️  Build config
├── eslint.config.mjs                ⚠️  Build config
├── optimize-images.js               ✅ Utility
├── catalog-images.mjs               ✅ Utility
├── parsed-reviews.json              ❌ Dev artifact
├── all-reviews-parsed.json          ❌ Dev artifact
└── git-hooks/commit-msg             ⚠️  Wrong location
```

### **AFTER (Clean & Organized)**
```
📂 restaurant-template/
├── 📁 scripts/
│   ├── 📁 setup/                    ✅ Client runs ONCE
│   │   ├── init-restaurant.mjs      # Interactive restaurant setup
│   │   └── import-reviews.mjs       # Import reviews from JSON
│   │
│   ├── 📁 utils/                    ✅ Reusable tools
│   │   ├── optimize-images.js       # Image compression
│   │   └── catalog-images.mjs       # Image catalog generator
│   │
│   ├── 📁 config/                   ✅ Build configuration
│   │   ├── postcss.config.mjs       # PostCSS config
│   │   └── eslint.config.mjs        # ESLint rules
│   │
│   ├── 📁 dev/                      ✅ Development only (optional)
│   │   ├── check-db.mjs             # DB health check
│   │   ├── query-db.mjs             # Ad-hoc queries
│   │   ├── parse-reviews.mjs        # Review parser
│   │   └── ...                      # Other dev tools
│   │
│   └── README.md                    ✅ Complete usage guide
│
├── 📁 supabase/
│   ├── 📁 migrations/               ✅ ALL SQL schema
│   │   └── 20240101_initial_schema.sql
│   │
│   └── 📁 seeds/                    ✅ Example data
│       └── seed-menu-data.sql
│
├── 📁 examples/
│   └── 📁 draco-coffee/             ✅ Example client setup
│       ├── setup-draco.sql          # Full Draco setup
│       ├── seed-menu-data.sql       # Draco menu
│       └── *.json                   # Parsed reviews
│
└── 📁 .github/
    └── 📁 hooks/
        └── commit-msg               ✅ Git hooks
```

---

## 🎯 Key Improvements

### 1. **Clear Separation of Concerns**
| Category | Purpose | Who Uses |
|----------|---------|----------|
| `/scripts/setup/` | Initial restaurant setup | Template users (once) |
| `/scripts/utils/` | Reusable utilities | Template users (ongoing) |
| `/scripts/config/` | Build configuration | Build system (automatic) |
| `/scripts/dev/` | Development tools | Developers only |
| `/examples/draco-coffee/` | Example implementation | Reference only |

### 2. **Template-Ready**
- ✅ No hardcoded credentials (uses `.env`)
- ✅ No client-specific data in core
- ✅ Generic setup scripts that prompt for details
- ✅ Clear documentation for new users

### 3. **Proper SQL Management**
- ✅ All schema migrations → `/supabase/migrations/`
- ✅ Example data → `/examples/draco-coffee/`
- ✅ Version-controlled migrations
- ✅ Easy to track database changes

### 4. **Security**
- ✅ Removed hardcoded Supabase credentials
- ✅ Environment variable based authentication
- ✅ `.env` template for required variables

---

## 📝 New NPM Scripts

Added to `package.json`:

```json
{
  "scripts": {
    "setup:init": "node scripts/setup/init-restaurant.mjs",
    "setup:menu": "node scripts/setup/import-menu.mjs",
    "setup:reviews": "node scripts/setup/import-reviews.mjs",
    "utils:optimize-images": "node scripts/utils/optimize-images.js",
    "utils:catalog-images": "node scripts/utils/catalog-images.mjs",
    "db:check": "node scripts/dev/check-db.mjs",
    "db:query": "node scripts/dev/query-db.mjs"
  }
}
```

---

## 🚀 How Template Users Set Up Their Restaurant

### Step 1: Initial Setup
```bash
# 1. Clone template
git clone <template-repo>
cd restaurant-template

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Run migrations
supabase db push

# 5. Initialize your restaurant
npm run setup:init
# Prompts for: name, slug, timezone, domain
```

### Step 2: Add Content
```bash
# Import menu
npm run setup:menu -- --input my-menu.json

# Import reviews (optional)
npm run setup:reviews -- --input my-reviews.json

# Optimize images
npm run utils:optimize-images
```

### Step 3: Launch
```bash
npm run dev
```

---

## 🗑️ What We Removed/Moved

### Deleted (No Longer Needed)
- `apply-migrations.mjs` → Use `supabase db push` instead
- `run-setup.mjs` → Redundant with `execute-setup.mjs`

### Moved to Examples
- All Draco Coffee specific files
- Parsed review JSON files (development artifacts)
- Client-specific SQL setups

### Refactored
- `execute-setup.mjs` → `setup/init-restaurant.mjs`
  - Now generic and interactive
  - No hardcoded credentials
  - Prompts for restaurant details

---

## 📚 Documentation Created

1. **`scripts/README.md`** - Complete usage guide
   - Setup instructions
   - Utility documentation
   - Troubleshooting guide

2. **`SCRIPTS-REORGANIZATION.md`** (this file)
   - Migration guide
   - Before/after comparison
   - Rationale for changes

---

## 🎯 Benefits for Template Approach

### For Template Users
✅ **Clear onboarding** - Obvious what to run and when
✅ **No confusion** - Separated template code from examples
✅ **Secure** - No exposed credentials
✅ **Self-documenting** - README explains everything

### For Developers
✅ **Maintainable** - Logical organization
✅ **Scalable** - Easy to add new scripts
✅ **Professional** - Industry-standard structure
✅ **Git-friendly** - Clean commit history

### For Clients
✅ **Fast setup** - 5 minutes to running restaurant
✅ **Customizable** - JSON-based configuration
✅ **Documented** - Clear examples (Draco Coffee)
✅ **Production-ready** - No dev artifacts

---

## 🔄 Migration Path (If Updating Existing Projects)

If you have an existing project using the old structure:

```bash
# 1. Backup first!
cp -r scripts scripts-backup

# 2. Pull latest template changes
git pull origin main

# 3. Move your custom scripts
mv scripts-backup/your-custom-script.mjs scripts/dev/

# 4. Update your .env
# Add: SUPABASE_URL and SUPABASE_SERVICE_KEY

# 5. Test setup script
npm run setup:init
```

---

## ✅ Checklist for Next Template User

- [ ] Clone repository
- [ ] Copy `.env.example` to `.env`
- [ ] Add Supabase credentials to `.env`
- [ ] Run `npm install`
- [ ] Run `supabase db push`
- [ ] Run `npm run setup:init`
- [ ] Import menu data
- [ ] Customize for your restaurant
- [ ] Remove `/examples/draco-coffee/` (it's just an example!)

---

## 📖 Related Documentation

- [Scripts README](./scripts/README.md) - Detailed script usage
- [Supabase Migrations](./supabase/migrations/README.md) - Database schema
- [Example: Draco Coffee](./examples/draco-coffee/) - Complete setup example

---

**Status:** ✅ Complete
**Date:** 2025-10-28
**Impact:** Major improvement in template usability and maintainability
