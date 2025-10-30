import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntrklmkzyfnrtfbpdypd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTgxOTgsImV4cCI6MjA3NjQ3NDE5OH0._hp302cCRB7eVtbOy0hAtZLTLOgFi79tFnYDBFN2KEY'
)

console.log('🏪 RESTAURANTS:')
const { data: restaurants } = await supabase.from('restaurants').select('*')
console.log(JSON.stringify(restaurants, null, 2))

console.log('\n⭐ REVIEWS:')
const { data: reviews } = await supabase.from('review').select('*')
console.log(JSON.stringify(reviews, null, 2))

console.log('\n📊 REVIEW TABLE STRUCTURE:')
const { data: reviewCols } = await supabase.from('review').select('*').limit(0)
if (reviews && reviews[0]) {
  console.log('Columns:', Object.keys(reviews[0]))
}
