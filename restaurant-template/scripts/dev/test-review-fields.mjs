import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTgxOTgsImV4cCI6MjA3NjQ3NDE5OH0._hp302cCRB7eVtbOy0hAtZLTLOgFi79tFnYDBFN2KEY'
)

// Test if extended fields exist by trying to select them
console.log('Testing for extended review fields...\n')

const tests = [
  { field: 'source', test: () => supabase.from('review').select('source').limit(1) },
  { field: 'verified', test: () => supabase.from('review').select('verified').limit(1) },
  { field: 'featured', test: () => supabase.from('review').select('featured').limit(1) },
  { field: 'images', test: () => supabase.from('review').select('images').limit(1) },
  { field: 'owner_response', test: () => supabase.from('review').select('owner_response').limit(1) },
  { field: 'metadata', test: () => supabase.from('review').select('metadata').limit(1) },
]

for (const { field, test } of tests) {
  const { error } = await test()
  console.log(`  ${field}: ${error ? '❌ Missing' : '✅ Exists'}`)
}

console.log('\n')

// Try to select all possible fields
const { data, error } = await supabase
  .from('review')
  .select('id, restaurant_id, author_name, rating, comment, status, published_at, source, verified, featured, images, owner_response, owner_responded_at, helpful_count, metadata, created_at, updated_at')
  .limit(1)

if (!error) {
  console.log('✅ All extended fields exist!')
  console.log('Sample row structure:', Object.keys(data[0] || {}))
} else {
  console.log('⚠️ Some fields missing, need to run migration')
  console.log('Error:', error.message)
}
