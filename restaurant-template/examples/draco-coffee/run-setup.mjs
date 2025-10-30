import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'
)

console.log('🚀 Setting up Draco Coffee And Eatery...\n')

// STEP 1: Add extended fields
console.log('📝 Step 1: Adding extended fields to review table...')
const alterQueries = [
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS source text DEFAULT 'website'`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS owner_response text`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS owner_responded_at timestamptz`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS helpful_count integer DEFAULT 0`,
  `ALTER TABLE review ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'`,
  `CREATE INDEX IF NOT EXISTS idx_review_featured ON review(restaurant_id, featured) WHERE featured = true`,
  `CREATE INDEX IF NOT EXISTS idx_review_rating_status ON review(restaurant_id, rating, status) WHERE status = 'published'`,
]

// Execute using fetch API since Supabase client doesn't support DDL
const DB_URL = 'https://ntrklmkzyfnrtfbpdypd.supabase.co/rest/v1/rpc/exec_sql'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg'

console.log('⚠️  Cannot execute DDL via Supabase JS client.')
console.log('\n📋 Please run this SQL in Supabase SQL Editor:\n')
console.log('============================================')
console.log(readFileSync('./setup-draco-reviews.sql', 'utf8'))
console.log('============================================\n')

console.log('OR run: npx supabase db push')
console.log('OR copy the SQL above to: https://supabase.com/dashboard/project/ntrklmkzyfnrtfbpdypd/sql/new')
