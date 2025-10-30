import { readFileSync } from 'fs'

// Read the raw reviews file
const rawText = readFileSync('../docs/client-info/reviews/raw/Reviews List', 'utf8')

// Parse reviews from raw Google Maps text
function parseReviews(text) {
  const reviews = []
  const lines = text.split('\n')

  let currentReview = null
  let lineIndex = 0

  while (lineIndex < lines.length) {
    const line = lines[lineIndex].trim()

    // Detect reviewer name pattern (usually followed by "Local Guide")
    if (lineIndex + 1 < lines.length &&
        lines[lineIndex + 1].includes('Local Guide') &&
        line.length > 0 &&
        line.length < 50 &&
        !line.match(/^(Like|Share|Sort|All|Write|Response from)/i)) {

      // Save previous review if exists
      if (currentReview && currentReview.author && currentReview.text) {
        reviews.push(currentReview)
      }

      // Start new review
      const authorName = line
      const authorStats = lines[lineIndex + 1]

      // Look ahead for date and text
      let dateIndex = lineIndex + 2
      while (dateIndex < lineIndex + 10 && dateIndex < lines.length) {
        const dateLine = lines[dateIndex].trim()
        if (dateLine.match(/(month|year|week|day)s?\s+ago/i)) {
          // Found date, next substantial line is the review text
          let textIndex = dateIndex + 1
          let reviewText = ''

          // Collect review text until we hit metadata or next review
          while (textIndex < lines.length) {
            const textLine = lines[textIndex].trim()

            // Stop conditions
            if (!textLine ||
                textLine === 'Like' ||
                textLine === 'Share' ||
                textLine.match(/^(Service|Meal type|Price per person|Food:|Recommended dishes|Response from)/i)) {
              break
            }

            // Skip video duration patterns like "0:09"
            if (textLine.match(/^\d+:\d+$/)) {
              textIndex++
              continue
            }

            if (reviewText) reviewText += ' '
            reviewText += textLine
            textIndex++

            // Limit text accumulation
            if (textIndex - dateIndex > 50) break
          }

          // Clean up review text
          reviewText = reviewText
            .replace(/…\s*More\s*$/i, '')
            .replace(/\s+/g, ' ')
            .trim()

          if (reviewText.length > 20) {
            currentReview = {
              author: authorName,
              authorStats,
              date: dateLine,
              text: reviewText,
              rating: null,
              ownerResponse: null
            }

            // Try to extract rating from Food/Service scores or infer from context
            let ratingSum = 0
            let ratingCount = 0
            let checkIndex = textIndex

            while (checkIndex < textIndex + 20 && checkIndex < lines.length) {
              const metaLine = lines[checkIndex].trim()
              const ratingMatch = metaLine.match(/^(Food|Service|Atmosphere):\s*(\d+)$/i)
              if (ratingMatch) {
                ratingSum += parseInt(ratingMatch[2])
                ratingCount++
              }

              // Check for owner response
              if (metaLine.match(/^Response from the owner/i)) {
                // Next substantial line is the response
                let respIndex = checkIndex + 1
                let respText = ''
                while (respIndex < lines.length && respIndex < checkIndex + 20) {
                  const respLine = lines[respIndex].trim()
                  if (!respLine || respLine === 'Like' || respLine === 'Share') break
                  if (respText) respText += ' '
                  respText += respLine
                  respIndex++
                }
                currentReview.ownerResponse = respText.replace(/\s+/g, ' ').trim()
                break
              }

              checkIndex++
            }

            // Calculate average rating
            if (ratingCount > 0) {
              currentReview.rating = Math.round(ratingSum / ratingCount)
            } else {
              // Default to 5 if no rating found (most reviews without explicit ratings are positive)
              currentReview.rating = 5
            }
          }

          break
        }
        dateIndex++
      }

      lineIndex = dateIndex + 1
    } else {
      lineIndex++
    }
  }

  // Add last review
  if (currentReview && currentReview.author && currentReview.text) {
    reviews.push(currentReview)
  }

  return reviews
}

// Parse and output
const reviews = parseReviews(rawText)

console.log(`\n📊 Parsed ${reviews.length} reviews\n`)
console.log('Sample reviews:')
reviews.slice(0, 3).forEach((r, i) => {
  console.log(`\n${i + 1}. ${r.author} (${r.date}) - Rating: ${r.rating}`)
  console.log(`   "${r.text.substring(0, 100)}..."`)
  if (r.ownerResponse) {
    console.log(`   Owner: "${r.ownerResponse.substring(0, 80)}..."`)
  }
})

// Save to JSON
import { writeFileSync } from 'fs'
writeFileSync('../data/parsed-reviews.json', JSON.stringify(reviews, null, 2))
console.log(`\n✅ Saved to ../data/parsed-reviews.json`)
console.log(`📊 Total reviews: ${reviews.length}`)
