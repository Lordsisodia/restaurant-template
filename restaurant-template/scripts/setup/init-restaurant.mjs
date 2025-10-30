#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import readline from 'readline'

// Read environment variables
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing environment variables!')
  console.error('   Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Helper to prompt user for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = (question) => new Promise((resolve) => {
  rl.question(question, resolve)
})

console.log('🏪 Restaurant Template Initialization\n')
console.log('This script will set up your restaurant in the database.\n')

try {
  // Get restaurant details
  const name = await prompt('Restaurant name: ')
  const slug = await prompt('URL slug (e.g., my-restaurant): ')
  const timezone = await prompt('Timezone (e.g., Asia/Makassar): ')
  const defaultDomain = await prompt('Domain (e.g., myrestaurant.com): ')

  console.log('\n🚀 Creating restaurant...')

  // Get existing tenant group or create one
  const { data: tenantGroups, error: tenantError } = await supabase
    .from('tenant_group')
    .select('id')
    .limit(1)

  if (tenantError) {
    console.error('❌ Error fetching tenant group:', tenantError.message)
    process.exit(1)
  }

  const tenantGroupId = tenantGroups?.[0]?.id

  if (!tenantGroupId) {
    console.error('❌ No tenant group found. Please set up tenant_group table first.')
    process.exit(1)
  }

  // Create restaurant
  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .insert({
      name,
      slug,
      timezone,
      default_domain: defaultDomain,
      tenant_group_id: tenantGroupId
    })
    .select()
    .single()

  if (restaurantError) {
    console.error('❌ Error creating restaurant:', restaurantError.message)
    process.exit(1)
  }

  console.log('✅ Restaurant created successfully!')
  console.log(`   ID: ${restaurant.id}`)
  console.log(`   Name: ${restaurant.name}`)
  console.log(`   Slug: ${restaurant.slug}`)
  console.log(`   Domain: ${restaurant.default_domain}`)
  console.log('\n📝 Next steps:')
  console.log('   1. Import your menu: npm run setup:menu -- --input menu.json')
  console.log('   2. Import reviews: npm run setup:reviews -- --input reviews.json')
  console.log('   3. Configure your environment variables')

} catch (error) {
  console.error('❌ Unexpected error:', error.message)
  process.exit(1)
} finally {
  rl.close()
}
