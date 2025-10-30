import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

// Check if review table has extended fields
console.log('Checking review table schema...\n')

const { data, error } = await supabase.rpc('exec_sql', {
  query: `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'review' AND table_schema = 'public'
    ORDER BY ordinal_position;
  `
})

if (error) {
  console.error('Error checking schema:', error)
} else {
  console.log('Review table columns:')
  data.forEach(col => console.log(`  - ${col.column_name} (${col.data_type})`))

  // Check for extended fields
  const hasSource = data.some(c => c.column_name === 'source')
  const hasVerified = data.some(c => c.column_name === 'verified')
  const hasFeatured = data.some(c => c.column_name === 'featured')
  const hasImages = data.some(c => c.column_name === 'images')

  console.log('\n📋 Extended fields status:')
  console.log(`  source: ${hasSource ? '✅' : '❌'}`)
  console.log(`  verified: ${hasVerified ? '✅' : '❌'}`)
  console.log(`  featured: ${hasFeatured ? '✅' : '❌'}`)
  console.log(`  images: ${hasImages ? '✅' : '❌'}`)

  if (!hasSource || !hasVerified || !hasFeatured || !hasImages) {
    console.log('\n⚠️  Need to apply reviews_simplified migration')
  } else {
    console.log('\n✅ Reviews table has all extended fields!')
  }
}
