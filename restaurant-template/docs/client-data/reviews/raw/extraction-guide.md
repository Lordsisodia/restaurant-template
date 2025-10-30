# Google Reviews Extraction Guide

## 🎯 Goal
Extract all 149 Google reviews for Draco Coffee and Eatery and save them in structured format.

---

## 🚀 Method 1: Automated Extraction (Recommended)

### Option A: Using Browser Automation (Claude Code)
I can automate this using Chrome DevTools MCP:

1. **What I'll do:**
   - Open Google Maps page
   - Navigate to reviews section
   - Scroll to load all reviews
   - Extract review data (text, rating, date, author)
   - Save to `all-reviews.json`

2. **To start, just say:**
   > "Extract all Google reviews for Draco now"

### Option B: Using Google Places API
If you have a Google Cloud API key:

```bash
# Install dependencies
npm install @googlemaps/google-maps-services-js

# Create extraction script
node extract-reviews.js
```

**Script template:**
```javascript
// extract-reviews.js
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

async function getReviews() {
  const response = await client.placeDetails({
    params: {
      place_id: "YOUR_PLACE_ID", // Need to get this
      fields: ["reviews", "rating", "user_ratings_total"],
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  console.log(response.data.result.reviews);
}

getReviews();
```

---

## 🖱️ Method 2: Manual Extraction (Slower but Free)

### Step-by-Step:

1. **Open Google Maps:**
   ```
   https://www.google.com/maps/place/Draco+Coffee+And+Eatery/@-8.6623611,115.1866667,17z
   ```

2. **Click on the Reviews tab**

3. **Scroll down to load all reviews:**
   - Google loads reviews in batches
   - Keep scrolling until you see "No more reviews"
   - Should load all 149 reviews

4. **Use browser console to extract:**

   Press F12 (Dev Tools) and run this script in Console:

   ```javascript
   // Extract all reviews from current Google Maps page
   function extractReviews() {
     const reviews = [];
     const reviewElements = document.querySelectorAll('[data-review-id]');

     reviewElements.forEach((element, index) => {
       const authorElement = element.querySelector('[class*="author"]');
       const ratingElement = element.querySelector('[role="img"][aria-label*="star"]');
       const textElement = element.querySelector('[class*="review-text"]');
       const dateElement = element.querySelector('[class*="review-date"]');

       reviews.push({
         id: index + 1,
         author: authorElement?.textContent?.trim() || 'Unknown',
         rating: ratingElement?.getAttribute('aria-label') || '0',
         text: textElement?.textContent?.trim() || '',
         date: dateElement?.textContent?.trim() || 'Unknown',
         source: 'Google Maps'
       });
     });

     // Copy to clipboard
     copy(JSON.stringify(reviews, null, 2));
     console.log(`Extracted ${reviews.length} reviews (copied to clipboard)`);
     return reviews;
   }

   extractReviews();
   ```

5. **Paste the JSON into a file:**
   - Create `all-reviews.json`
   - Paste the copied data
   - Format it nicely

---

## 🔧 Method 3: Browser Extensions

### Recommended Extensions:

1. **Outscraper (Chrome/Firefox)**
   - Free tier: Limited reviews
   - Paid: Unlimited extraction
   - Link: https://chrome.google.com/webstore/detail/outscraper

2. **Google Maps Scraper**
   - Various options on Chrome Web Store
   - Search: "Google Maps reviews scraper"

3. **Export Reviews to Excel**
   - Some extensions export directly to CSV
   - Easy to convert CSV → JSON

---

## 📋 Expected Data Format

### JSON Structure:
```json
{
  "business": {
    "name": "Draco Coffee and Eatery",
    "rating": 4.6,
    "totalReviews": 149,
    "extractedDate": "2025-10-24"
  },
  "reviews": [
    {
      "id": 1,
      "author": "Reviewer Name",
      "authorImage": "https://...",
      "rating": 5,
      "ratingStars": "⭐⭐⭐⭐⭐",
      "date": "2024-10-15",
      "dateRelative": "1 month ago",
      "text": "Nasi bakar cuminya enak...",
      "textEn": "The cumin nasi bakar is delicious...",
      "hasPhotos": false,
      "photos": [],
      "helpful": 12,
      "response": null,
      "source": "Google Maps",
      "verified": true,
      "tags": ["food", "nasi bakar", "cumin"]
    }
  ]
}
```

---

## 🎨 Manual Copy Template

If extracting manually, use this format:

```markdown
---
### Review #1
**Author:** [Name]
**Rating:** ⭐⭐⭐⭐⭐ (5/5)
**Date:** [Date]
**Review:**
> [Review text in Indonesian]

**Translation:**
> [English translation]

**Tags:** #nasiBakar #coffee #quality
**Photos:** [Yes/No]
---
```

---

## ✅ Quality Checklist

After extraction, verify:

- [ ] All 149 reviews captured
- [ ] Ratings are correct (1-5 stars)
- [ ] Review text is complete (not truncated)
- [ ] Dates are preserved
- [ ] Author names included
- [ ] Photos noted (if any)
- [ ] Translations added (for Indonesian reviews)
- [ ] No duplicates
- [ ] Sorted by date (newest first)

---

## 🔄 Post-Extraction Tasks

1. **Organize by Rating:**
   ```
   5-star reviews → Highlight on website
   4-star reviews → Show with improvements
   3-star or below → Analyze for feedback
   ```

2. **Categorize by Topic:**
   ```
   Coffee quality → 45 mentions
   Nasi bakar → 32 mentions
   Atmosphere → 28 mentions
   Service → 19 mentions
   ```

3. **Extract Keywords:**
   ```
   "nendang" (strong) → 15 times
   "enak" (delicious) → 42 times
   "cozy" → 8 times
   ```

4. **Identify Top Reviewers:**
   - Local guides
   - Verified reviewers
   - Detailed reviews with photos

5. **Create Featured Set:**
   - Select 10-15 best reviews
   - Mix ratings (mostly 5-star, some 4-star)
   - Variety of topics
   - Include both Indonesian and English
   - Photos preferred

---

## 🤖 Want Me to Do It?

I can automate the extraction using Chrome DevTools. Just say:

> "Extract Draco's Google reviews now"

And I'll:
1. Open the Google Maps page
2. Load all 149 reviews
3. Extract the data
4. Save to `all-reviews.json`
5. Create a summary report

---

## 📞 Backup Option

If automated methods fail:

1. **Ask the client** - They might have access to Google Business dashboard
2. **Manual screenshots** - Save reviews as images
3. **Copy key reviews** - At least get the top 20-30
4. **Use Google Business API** - If client can provide access

---

**Created:** October 24, 2025
**Status:** Ready to extract
**Estimated Time:** 5-10 minutes (automated) or 30-60 minutes (manual)
