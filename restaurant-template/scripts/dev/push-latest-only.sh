#!/bin/bash
# Push only the latest migration
echo "Pushing only the setup_draco_reviews migration..."
supabase db execute --file supabase/migrations/20251024161551__setup_draco_reviews.sql --linked
