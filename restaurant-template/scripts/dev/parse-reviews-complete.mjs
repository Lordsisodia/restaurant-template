import { readFileSync } from 'fs'

const rawText = readFileSync('../docs/client-info/reviews/raw/Reviews List', 'utf8')

function parseReviewsComplete(text) {
  const reviews = []
  const lines = text.split('\n')
  let lineIndex = 0

  while (lineIndex < lines.length) {
    const line = lines[lineIndex].trim()

    // Detect reviewer patterns:
    // 1. "Local Guide · X reviews · Y photos"
    // 2. "X reviews" or "X reviews · Y photos"
    const nextLine = lineIndex + 1 < lines.length ? lines[lineIndex + 1].trim() : ''

    const isReviewer = (
      nextLine.includes('Local Guide') ||
      nextLine.match(/^\d+\s+reviews?(\s+·\s+\d+\s+photos?)?$/i)
    )

    if (isReviewer &&
        line.length > 0 &&
        line.length < 50 &&
        !line.match(/^(Like|Share|Sort|All|Write|Response from|Food:|Service:|Atmosphere:|Meal type|Price per)/i)) {

      const authorName = line
      const authorStats = nextLine

      // Look ahead for date
      let dateIndex = lineIndex + 2
      while (dateIndex < lineIndex + 15 && dateIndex < lines.length) {
        const dateLine = lines[dateIndex].trim()

        if (dateLine.match(/(month|year|week|day)s?\s+ago/i)) {
          // Found date, next substantial line is review text
          let textIndex = dateIndex + 1
          let reviewText = ''

          while (textIndex < lines.length) {
            const textLine = lines[textIndex].trim()

            // Stop conditions
            if (!textLine ||
                textLine === 'Like' ||
                textLine === 'Share' ||
                textLine.match(/^(Service|Meal type|Price per person|Food:|Recommended dishes|Response from|Translated by)/i)) {
              break
            }

            // Skip patterns
            if (textLine.match(/^\d+:\d+$/)) { // video duration
              textIndex++
              continue
            }

            if (reviewText) reviewText += ' '
            reviewText += textLine
            textIndex++

            if (textIndex - dateIndex > 60) break
          }

          // Clean review text
          reviewText = reviewText
            .replace(/…\s*More\s*$/i, '')
            .replace(/\s+/g, ' ')
            .trim()

          if (reviewText.length > 10) {
            // Extract rating
            let rating = null
            let ratingSum = 0
            let ratingCount = 0
            let checkIndex = textIndex
            let ownerResponse = null

            while (checkIndex < textIndex + 25 && checkIndex < lines.length) {
              const metaLine = lines[checkIndex].trim()

              // Rating scores
              const ratingMatch = metaLine.match(/^(Food|Service|Atmosphere):\s*(\d+)$/i)
              if (ratingMatch) {
                ratingSum += parseInt(ratingMatch[2])
                ratingCount++
              }

              // Owner response
              if (metaLine.match(/^Response from the owner/i)) {
                let respIndex = checkIndex + 1
                let respText = ''
                while (respIndex < lines.length && respIndex < checkIndex + 25) {
                  const respLine = lines[respIndex].trim()
                  if (!respLine || respLine === 'Like' || respLine === 'Share') break
                  if (respText) respText += ' '
                  respText += respLine
                  respIndex++
                }
                ownerResponse = respText.replace(/\s+/g, ' ').trim()
                break
              }

              checkIndex++
            }

            // Calculate rating
            if (ratingCount > 0) {
              rating = Math.round(ratingSum / ratingCount)
            } else {
              // Infer from text sentiment (simple heuristic)
              const textLower = reviewText.toLowerCase()
              if (textLower.match(/excellent|amazing|fantastic|perfect|love|best/)) {
                rating = 5
              } else if (textLower.match(/good|nice|great|recommended/)) {
                rating = 4
              } else if (textLower.match(/okay|decent|average/)) {
                rating = 3
              } else if (textLower.match(/bad|poor|disappointed/)) {
                rating = 2
              } else {
                rating = 5 // default positive
              }
            }

            reviews.push({
              author: authorName,
              authorStats,
              date: dateLine,
              text: reviewText,
              rating,
              ownerResponse
            })
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

  return reviews
}

const reviews = parseReviewsComplete(rawText)

console.log(`\n📊 Parsed ${reviews.length} reviews\n`)

// Show sample
reviews.slice(95, 100).forEach((r, i) => {
  console.log(`${i + 96}. ${r.author} (${r.date}) - Rating: ${r.rating}`)
  console.log(`   "${r.text.substring(0, 80)}..."`)
})

// Save
import { writeFileSync } from 'fs'
writeFileSync('../data/parsed-reviews-complete.json', JSON.stringify(reviews, null, 2))
console.log(`\n✅ Saved ${reviews.length} reviews to ../data/parsed-reviews-complete.json`)
