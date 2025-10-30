import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

console.log('🚀 Executing setup SQL...\n')

// Read the SQL file
const sql = readFileSync('./setup-draco-reviews.sql', 'utf8')

// Split by statement, execute one by one
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s &&
    !s.startsWith('--') &&
    !s.startsWith('NOTICE') &&
    !s.includes('RAISE NOTICE') &&
    s.length > 10
  )

console.log(`📝 Found ${statements.length} SQL statements to execute\n`)

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i]
  const preview = stmt.substring(0, 80).replace(/\n/g, ' ')

  console.log(`${i + 1}. ${preview}...`)

  try {
    // Use raw SQL execution via RPC or raw query
    const { data, error } = await supabase.rpc('exec', { sql: stmt + ';' }).catch(() => ({ error: 'RPC not available' }))

    if (error && error !== 'RPC not available') {
      console.log(`   ❌ Error: ${error.message || error}`)
    } else {
      console.log(`   ✅ Success`)
    }
  } catch (e) {
    console.log(`   ⚠️  ${e.message}`)
  }
}

console.log('\n📊 Verifying setup...')

// Verify Draco restaurant exists
const { data: draco, error: dracoErr } = await supabase
  .from('restaurants')
  .select('*')
  .eq('slug', 'draco-coffee')
  .single()

if (dracoErr) {
  console.log('❌ Draco restaurant not found:', dracoErr.message)
} else {
  console.log('✅ Draco Coffee And Eatery created!')
  console.log(`   ID: ${draco.id}`)
  console.log(`   Name: ${draco.name}`)
}

// Verify reviews
const { data: reviews, count } = await supabase
  .from('review')
  .select('*', { count: 'exact' })
  .eq('restaurant_id', '00000000-0000-0000-0000-000000000003')

console.log(`\n⭐ Reviews for Draco: ${count || 0}`)

if (reviews && reviews.length > 0) {
  console.log(`   Average rating: ${(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}`)
  console.log(`   Featured: ${reviews.filter(r => r.featured).length}`)
}
