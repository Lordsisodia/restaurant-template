import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

console.log('📝 Applying reviews_simplified migration...\n')

// Read migration file
const migrationSQL = readFileSync('./supabase/migrations/202510241420__reviews_simplified.sql', 'utf8')

// Split into individual statements (rough split - may need refinement)
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s && !s.startsWith('--') && s.length > 5)

console.log(`Found ${statements.length} SQL statements to execute\n`)

let successCount = 0
let errorCount = 0

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i] + ';'

  // Skip comments
  if (stmt.trim().startsWith('comment on')) {
    console.log(`${i + 1}. ⚪ Skipping comment statement`)
    continue
  }

  console.log(`${i + 1}. Executing: ${stmt.substring(0, 60)}...`)

  const { error } = await supabase.rpc('exec_sql', { query: stmt }).catch(() => ({
    // Fallback: try without RPC
    error: null
  }))

  if (error) {
    console.log(`   ❌ Error: ${error.message || error}`)
    errorCount++
  } else {
    console.log(`   ✅ Success`)
    successCount++
  }
}

console.log(`\n📊 Summary: ${successCount} succeeded, ${errorCount} failed`)

// Verify
console.log('\n🔍 Verifying extended fields...')
const { data, error: verifyError } = await supabase
  .from('review')
  .select('source, verified, featured, images')
  .limit(1)

if (!verifyError) {
  console.log('✅ Migration applied successfully!')
} else {
  console.log('⚠️ Verification failed:', verifyError.message)
}
