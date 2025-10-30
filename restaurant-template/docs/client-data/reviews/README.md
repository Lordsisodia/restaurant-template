# Reviews

This folder contains all client reviews and testimonials.

## Folder Structure:

### `raw/` ✓ (Contains existing review guides)
**Purpose:** Original review data, extraction guides, and documentation

**What's here:**
- Extraction guides
- Featured reviews (JSON)
- Review summaries
- Raw review text
- Screenshots of reviews

---

### `parsed/` ✓ (Contains JSON review data from data/ folder)
**Purpose:** Processed, structured review data ready for import

**What's here:**
- `all-reviews-parsed.json` - Complete dataset
- `parsed-reviews.json` - Primary parsed data
- `parsed-reviews-complete.json` - Full structured data

**JSON Structure Example:**
```json
{
  "author": "John Doe",
  "rating": 5,
  "date": "2 months ago",
  "text": "Amazing coffee and friendly service!",
  "hasText": true,
  "ownerResponse": "Thank you for your kind words!",
  "stats": {
    "reviews": 50,
    "photos": 10
  }
}
```

---

### `featured/`
**Purpose:** Curated reviews to display on website

**What to store:**
- Hand-picked best reviews
- Reviews with photos
- Reviews from verified customers
- Diverse rating representation

**Format:**
```json
{
  "id": "featured-001",
  "author": "Sarah Johnson",
  "rating": 5,
  "title": "Best Coffee in Town!",
  "comment": "I've been coming here for months...",
  "date": "2024-01-15",
  "image": "/images/reviews/sarah-review.jpg",
  "verified": true,
  "featured": true,
  "source": "Google Maps"
}
```

---

## Review Sources

### Google Maps
- Use extraction scripts in `/scripts/`
- Parse HTML from scraped pages
- Import to database

### Direct Submissions
- Website review form
- Email submissions
- Social media mentions

### Third-Party Platforms
- TripAdvisor
- Yelp
- Facebook
- Zomato

---

## Importing Reviews

### Scripts Available:
- `scripts/parse-reviews.mjs` - Parse raw HTML
- `scripts/import-reviews.mjs` - Import to database
- `scripts/import-missing.mjs` - Add new reviews only

### Process:
1. Scrape or gather reviews → Save to `raw/`
2. Parse with scripts → Output to `parsed/`
3. Curate featured → Move best to `featured/`
4. Import to database → Run import scripts

---

## Review Management

### What to Feature:
- ✅ 5-star reviews with detailed comments
- ✅ Reviews mentioning specific products
- ✅ Reviews with photos
- ✅ Reviews from verified customers
- ✅ Recent reviews (within 6 months)

### What to Avoid:
- ❌ Generic reviews ("Good place")
- ❌ Very old reviews (>1 year)
- ❌ Reviews without substance
- ❌ Spam or fake reviews

### Moderation:
- Monitor for fake/spam reviews
- Respond to negative reviews professionally
- Update regularly (monthly sweep)
- Track review trends

---

## Display Guidelines

### Homepage:
- Show 3-6 featured reviews
- Mix of ratings (mostly 5-star, some 4-star for authenticity)
- Include reviewer photos if available

### Reviews Page:
- Show all published reviews
- Filter by rating
- Sort by date/helpfulness
- Pagination (10-20 per page)

---

## Files to Review:
- `extraction-guide.md` ✓ - How to extract reviews
- `REVIEWS-SUMMARY.md` ✓ - Analysis of existing reviews
- `featured-reviews.json` ✓ - Featured review data
