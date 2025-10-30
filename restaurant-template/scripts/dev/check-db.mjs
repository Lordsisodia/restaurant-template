import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTgxOTgsImV4cCI6MjA3NjQ3NDE5OH0._hp302cCRB7eVtbOy0hAtZLTLOgFi79tFnYDBFN2KEY'
)

// List all tables
const { data: tables, error } = await supabase.rpc('exec_sql', {
  query: `
    SELECT table_name,
           (SELECT COUNT(*) FROM information_schema.columns
            WHERE columns.table_name = tables.table_name
            AND columns.table_schema = 'public') as column_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `
})

if (error) {
  // Try direct query instead
  const { data, error: err2 } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')

  if (err2) {
    console.error('Error:', err2)
    console.log('\nTrying alternate method...')

    // Check specific tables
    const checks = await Promise.all([
      supabase.from('restaurants').select('count', { count: 'exact', head: true }),
      supabase.from('review').select('count', { count: 'exact', head: true }),
      supabase.from('reviews').select('count', { count: 'exact', head: true }),
    ])

    console.log('\nTable existence check:')
    console.log('restaurants:', checks[0].error ? '❌ Not found' : `✅ Found (${checks[0].count} rows)`)
    console.log('review:', checks[1].error ? '❌ Not found' : `✅ Found (${checks[1].count} rows)`)
    console.log('reviews:', checks[2].error ? '❌ Not found' : `✅ Found (${checks[2].count} rows)`)
  } else {
    console.log('Tables found:', data)
  }
} else {
  console.log('Tables:', tables)
}
