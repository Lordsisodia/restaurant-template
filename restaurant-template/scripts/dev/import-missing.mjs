import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

const DRACO_ID = '00000000-0000-0000-0000-000000000003'

// Get existing authors
const { data: existing } = await supabase
  .from('review')
  .select('author_name')
  .eq('restaurant_id', DRACO_ID)

const existingAuthors = new Set(existing.map(r => r.author_name))

console.log(`📊 Currently in database: ${existingAuthors.size} unique authors`)

// Load parsed reviews
const allParsed = JSON.parse(readFileSync('../data/all-reviews-parsed.json', 'utf8'))

// Find missing
const missing = allParsed.filter(r => !existingAuthors.has(r.author))

console.log(`📥 Missing reviews to import: ${missing.length}\n`)

if (missing.length === 0) {
  console.log('✅ All reviews already imported!')
  process.exit(0)
}

// Convert and import
function parseDate(dateStr) {
  const now = new Date()
  if (dateStr.includes('month')) {
    const m = parseInt(dateStr) || 1
    now.setMonth(now.getMonth() - m)
  } else if (dateStr.includes('year')) {
    const y = parseInt(dateStr) || 1
    now.setFullYear(now.getFullYear() - y)
  } else if (dateStr.includes('week')) {
    const w = parseInt(dateStr) || 1
    now.setDate(now.getDate() - (w * 7))
  } else if (dateStr.includes('day')) {
    const d = parseInt(dateStr) || 1
    now.setDate(now.getDate() - d)
  }
  return now.toISOString()
}

const toImport = missing.map(r => ({
  restaurant_id: DRACO_ID,
  author_name: r.author,
  rating: r.rating,
  comment: r.text,
  status: 'published',
  published_at: parseDate(r.date),
  source: 'Google Maps',
  verified: true,
  featured: false,
  images: '[]',
  owner_response: r.ownerResponse,
  owner_responded_at: r.ownerResponse ? parseDate(r.date) : null,
  helpful_count: 0,
  metadata: JSON.stringify({ stats: r.stats, hasText: r.hasText })
}))

console.log(`Importing ${toImport.length} missing reviews...`)

const { data, error } = await supabase
  .from('review')
  .insert(toImport)

if (error) {
  console.log('❌ Error:', error.message)
} else {
  console.log(`✅ Successfully imported ${toImport.length} reviews`)

  // Final count
  const { count } = await supabase
    .from('review')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', DRACO_ID)

  console.log(`\n🎉 Total Draco reviews: ${count}`)
}
