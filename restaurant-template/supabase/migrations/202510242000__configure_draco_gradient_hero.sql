-- ============================================
-- Configure Gradient Words Hero for Draco Coffee
-- ============================================
-- This migration adds the animated gradient hero
-- with the coffee lounge tagline: "Awake. Alive. Until 11 PM."

UPDATE site_config
SET features = jsonb_set(
  COALESCE(features, '{}'::jsonb),
  '{hero}',
  jsonb_build_object(
    'variant', 'gradient-words',
    'words', json_build_array('Awake.', 'Alive.', 'Until 11 PM.')
  ),
  true
)
WHERE restaurant_id = '00000000-0000-0000-0000-000000000003';

-- ============================================
-- VERIFICATION
-- ============================================
-- The hero configuration is now:
-- {
--   "variant": "gradient-words",
--   "words": ["Awake.", "Alive.", "Until 11 PM."]
-- }
--
-- This will display an animated gradient text hero
-- with neon colors cycling through the three phrases.
-- ============================================
