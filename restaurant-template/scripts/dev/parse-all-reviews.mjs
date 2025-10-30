import { readFileSync, writeFileSync } from 'fs'

const rawText = readFileSync('../docs/client-info/reviews/raw/Reviews List', 'utf8')
const lines = rawText.split('\n')

const reviews = []
let i = 0

while (i < lines.length) {
  const line = lines[i].trim()

  // Check if next line indicates this is a reviewer
  const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : ''

  const isReviewer = nextLine.match(/^(Local Guide|[\d]+\s+reviews?)/)

  if (isReviewer &&
      line.length > 0 &&
      line.length < 60 &&
      !line.match(/^(Like|Share|Sort|All|Write|Response|Food|Service|Atmosphere|Meal|Price|Recommended|Parking|Vegetarian|Dietary|Translated|Kid-friendly|Wheelchair)/i)) {

    const author = line
    const stats = nextLine

    // Find date
    let date = null
    let dateIdx = i + 2
    while (dateIdx < i + 15 && dateIdx < lines.length) {
      if (lines[dateIdx].trim().match(/(month|year|week|day)s?\s+ago/i)) {
        date = lines[dateIdx].trim()
        break
      }
      dateIdx++
    }

    if (!date) {
      i++
      continue
    }

    // Collect review text
    let text = ''
    let textIdx = dateIdx + 1
    while (textIdx < lines.length && textIdx < dateIdx + 80) {
      const textLine = lines[textIdx].trim()

      if (textLine === 'Like' ||
          textLine === 'Share' ||
          textLine.match(/^(Service|Meal type|Price per person|Food:|Recommended|Response from|Translated by)/i)) {
        break
      }

      if (textLine && !textLine.match(/^\d+:\d+$/)) {
        if (text) text += ' '
        text += textLine
      }
      textIdx++
    }

    text = text.replace(/…\s*More\s*$/i, '').replace(/\s+/g, ' ').trim()

    // Extract rating
    let rating = null
    let ratings = []
    let ownerResponse = null
    let checkIdx = textIdx

    while (checkIdx < textIdx + 30 && checkIdx < lines.length) {
      const checkLine = lines[checkIdx].trim()

      // Rating scores
      const scoreMatch = checkLine.match(/^(Food|Service|Atmosphere):\s*(\d+)$/i)
      if (scoreMatch) {
        ratings.push(parseInt(scoreMatch[2]))
      }

      // Owner response
      if (checkLine.match(/^Response from the owner/i)) {
        let respIdx = checkIdx + 1
        let resp = ''
        while (respIdx < lines.length && respIdx < checkIdx + 30) {
          const respLine = lines[respIdx].trim()
          if (!respLine || respLine === 'Like' || respLine === 'Share' || respLine.match(/^Translated by/i)) break
          if (resp) resp += ' '
          resp += respLine
          respIdx++
        }
        ownerResponse = resp.replace(/\s+/g, ' ').trim()
        break
      }

      checkIdx++
    }

    // Calculate rating
    if (ratings.length > 0) {
      rating = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
    } else if (text.length > 0) {
      // Infer from sentiment
      const lower = text.toLowerCase()
      if (lower.match(/excellent|amazing|fantastic|perfect|love|best/)) rating = 5
      else if (lower.match(/good|nice|great|recommended/)) rating = 4
      else if (lower.match(/okay|decent|average/)) rating = 3
      else if (lower.match(/bad|poor|disappointed/)) rating = 2
      else rating = 5
    } else {
      rating = 5 // Default for star-only reviews
    }

    // Only add if we have meaningful data
    if (text.length > 5 || ratings.length > 0) {
      reviews.push({
        author,
        stats,
        date,
        text: text || 'No text review - ratings only',
        rating,
        ownerResponse,
        hasText: text.length > 5
      })
    }

    i = checkIdx + 1
  } else {
    i++
  }
}

console.log(`\n✅ Parsed ${reviews.length} reviews`)
console.log(`📝 With text: ${reviews.filter(r => r.hasText).length}`)
console.log(`⭐ Star-only: ${reviews.filter(r => !r.hasText).length}`)
console.log(`💬 With owner response: ${reviews.filter(r => r.ownerResponse).length}`)

// Show last 10
console.log('\n📋 Last 10 reviews:')
reviews.slice(-10).forEach((r, idx) => {
  console.log(`${reviews.length - 10 + idx + 1}. ${r.author} - ${r.rating}⭐`)
  console.log(`   "${r.text.substring(0, 60)}..."`)
})

writeFileSync('../data/all-reviews-parsed.json', JSON.stringify(reviews, null, 2))
console.log(`\n💾 Saved to ../data/all-reviews-parsed.json`)
