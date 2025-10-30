#!/usr/bin/env node

/**
 * Blog Setup Script
 * 
 * This script:
 * 1. Applies the blog enhancement migration
 * 2. Seeds sample blog posts
 * 
 * Usage:
 *   node setup-blog.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL_POD_ALPHA;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY_POD_ALPHA;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('   Required: SUPABASE_URL_POD_ALPHA, SUPABASE_SERVICE_ROLE_KEY_POD_ALPHA');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSQL(filename, description) {
  console.log(`\n📝 ${description}...`);
  
  const sql = readFileSync(join(__dirname, filename), 'utf-8');
  
  const { data, error } = await supabase.rpc('exec_sql', { sql });
  
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
  
  console.log(`✅ ${description} complete!`);
  return true;
}

async function main() {
  console.log('🚀 Setting up blog system...\n');
  
  // Step 1: Apply migration
  const migrationSuccess = await runSQL(
    'supabase/migrations/202510260000__blog_enhancements.sql',
    'Applying blog enhancement migration'
  );
  
  if (!migrationSuccess) {
    console.error('\n⚠️  Migration failed. Check if it was already applied.');
  }
  
  // Step 2: Seed data
  const seedSuccess = await runSQL(
    'supabase/seed-blog-posts.sql',
    'Seeding sample blog posts'
  );
  
  if (!seedSuccess) {
    console.error('\n⚠️  Seed data failed. Posts may already exist.');
  }
  
  // Step 3: Verify
  console.log('\n🔍 Verifying setup...');
  const { data: posts, error } = await supabase
    .from('post')
    .select('id, title, category, published_at')
    .eq('restaurant_id', '00000000-0000-0000-0000-000000000003')
    .order('published_at', { ascending: false, nullsFirst: false });
  
  if (error) {
    console.error('❌ Error fetching posts:', error.message);
  } else {
    console.log(`✅ Found ${posts.length} posts in database`);
    posts.forEach(post => {
      console.log(`   - ${post.title} (${post.category || 'No category'})`);
    });
  }
  
  console.log('\n🎉 Blog setup complete!');
  console.log('📍 Visit http://localhost:3000/blog to see your posts\n');
}

main().catch(console.error);
