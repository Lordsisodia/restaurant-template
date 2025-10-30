import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

const DRACO_RESTAURANT_ID = '00000000-0000-0000-0000-000000000003'

// Read parsed reviews
const reviews = JSON.parse(readFileSync('../data/parsed-reviews.json', 'utf8'))

console.log(`📊 Total parsed reviews: ${reviews.length}`)

// Skip first 5 (already imported as featured)
const reviewsToImport = reviews.slice(5)
console.log(`📥 Reviews to import: ${reviewsToImport.length}`)

// Convert relative dates to timestamps
function parseRelativeDate(dateStr) {
  const now = new Date()

  if (dateStr.includes('month')) {
    const months = parseInt(dateStr) || 1
    now.setMonth(now.getMonth() - months)
  } else if (dateStr.includes('year')) {
    const years = parseInt(dateStr) || 1
    now.setFullYear(now.getFullYear() - years)
  } else if (dateStr.includes('week')) {
    const weeks = parseInt(dateStr) || 1
    now.setDate(now.getDate() - (weeks * 7))
  } else if (dateStr.includes('day')) {
    const days = parseInt(dateStr) || 1
    now.setDate(now.getDate() - days)
  }

  return now.toISOString()
}

// Batch import reviews
const BATCH_SIZE = 20
let successCount = 0
let errorCount = 0

for (let i = 0; i < reviewsToImport.length; i += BATCH_SIZE) {
  const batch = reviewsToImport.slice(i, i + BATCH_SIZE)

  console.log(`\n📦 Importing batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} reviews)...`)

  const reviewsData = batch.map(review => ({
    restaurant_id: DRACO_RESTAURANT_ID,
    author_name: review.author,
    rating: review.rating || 5,
    comment: review.text,
    status: 'published',
    published_at: parseRelativeDate(review.date),
    source: 'Google Maps',
    verified: true,
    featured: false, // Only first 5 are featured
    images: '[]', // No images for bulk import
    owner_response: review.ownerResponse,
    owner_responded_at: review.ownerResponse ? parseRelativeDate(review.date) : null,
    helpful_count: 0,
    metadata: JSON.stringify({
      author_stats: review.authorStats,
      original_date: review.date
    })
  }))

  const { data, error } = await supabase
    .from('review')
    .insert(reviewsData)

  if (error) {
    console.log(`   ❌ Error: ${error.message}`)
    errorCount += batch.length
  } else {
    console.log(`   ✅ Success: ${batch.length} reviews imported`)
    successCount += batch.length
  }

  // Small delay to avoid rate limits
  await new Promise(resolve => setTimeout(resolve, 200))
}

console.log(`\n📊 Import Summary:`)
console.log(`   ✅ Success: ${successCount}`)
console.log(`   ❌ Errors: ${errorCount}`)
console.log(`   📝 Total: ${reviewsToImport.length}`)

// Verify total count
const { count } = await supabase
  .from('review')
  .select('*', { count: 'exact', head: true })
  .eq('restaurant_id', DRACO_RESTAURANT_ID)

console.log(`\n🎉 Total Draco reviews in database: ${count}`)
