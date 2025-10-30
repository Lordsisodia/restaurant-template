import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

console.log('📝 Applying Grab delivery config migration...\n')

// Read migration file
const migrationSQL = readFileSync('./supabase/migrations/202510250200__add_draco_delivery_config.sql', 'utf8')

console.log('Executing SQL:', migrationSQL)

// Execute the update directly
const { error } = await supabase.rpc('exec_sql', { query: migrationSQL })

if (error) {
  console.log('❌ Error:', error.message || error)
} else {
  console.log('✅ Migration applied successfully!')
}

// Verify
console.log('\n🔍 Verifying delivery config...')
const { data, error: verifyError } = await supabase
  .from('site_config')
  .select('features')
  .eq('restaurant_id', '00000000-0000-0000-0000-000000000003')
  .single()

if (!verifyError && data) {
  console.log('Delivery config:', data.features?.delivery)
  console.log('WhatsApp:', data.features?.contact?.whatsapp)
  console.log('✅ Configuration verified!')
} else {
  console.log('⚠️ Verification failed:', verifyError?.message)
}
