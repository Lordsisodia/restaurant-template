-- ========================================
-- MENU SEED DATA - RUN THIS IN SUPABASE DASHBOARD
-- ========================================
-- 📋 Categories: Coffee, Smoothies, Breakfast, Dinner
-- 🍽️  Total Items: ~35 menu items
-- 💰 Prices in IDR (Indonesian Rupiah in cents)
-- ========================================

DO $$
DECLARE
  v_restaurant_id uuid := '00000000-0000-0000-0000-000000000001'::uuid;
  v_coffee_cat_id uuid;
  v_smoothie_cat_id uuid;
  v_breakfast_cat_id uuid;
  v_dinner_cat_id uuid;
BEGIN
  -- ========================================
  -- CREATE CATEGORIES
  -- ========================================

  -- Coffee Category
  INSERT INTO category (restaurant_id, name, slug, position, visible)
  VALUES (v_restaurant_id, 'Coffee', 'coffee', 1, true)
  ON CONFLICT (restaurant_id, slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_coffee_cat_id;

  IF v_coffee_cat_id IS NULL THEN
    SELECT id INTO v_coffee_cat_id FROM category
    WHERE restaurant_id = v_restaurant_id AND slug = 'coffee';
  END IF;

  -- Smoothies Category
  INSERT INTO category (restaurant_id, name, slug, position, visible)
  VALUES (v_restaurant_id, 'Smoothies', 'smoothies', 2, true)
  ON CONFLICT (restaurant_id, slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_smoothie_cat_id;

  IF v_smoothie_cat_id IS NULL THEN
    SELECT id INTO v_smoothie_cat_id FROM category
    WHERE restaurant_id = v_restaurant_id AND slug = 'smoothies';
  END IF;

  -- Breakfast Category
  INSERT INTO category (restaurant_id, name, slug, position, visible)
  VALUES (v_restaurant_id, 'Breakfast', 'breakfast', 3, true)
  ON CONFLICT (restaurant_id, slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_breakfast_cat_id;

  IF v_breakfast_cat_id IS NULL THEN
    SELECT id INTO v_breakfast_cat_id FROM category
    WHERE restaurant_id = v_restaurant_id AND slug = 'breakfast';
  END IF;

  -- Dinner Category
  INSERT INTO category (restaurant_id, name, slug, position, visible)
  VALUES (v_restaurant_id, 'Dinner', 'dinner', 4, true)
  ON CONFLICT (restaurant_id, slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_dinner_cat_id;

  IF v_dinner_cat_id IS NULL THEN
    SELECT id INTO v_dinner_cat_id FROM category
    WHERE restaurant_id = v_restaurant_id AND slug = 'dinner';
  END IF;

  -- ========================================
  -- COFFEE ITEMS (7 items)
  -- ========================================
  -- Prices: IDR 35,000 - 55,000 (in cents)

  INSERT INTO item (restaurant_id, category_id, name, slug, description, price, active)
  VALUES
    (v_restaurant_id, v_coffee_cat_id, 'Espresso', 'espresso',
     'Rich and bold single shot of Italian espresso', 3500000, true),
    (v_restaurant_id, v_coffee_cat_id, 'Cappuccino', 'cappuccino',
     'Classic Italian coffee with steamed milk and foam', 4500000, true),
    (v_restaurant_id, v_coffee_cat_id, 'Flat White', 'flat-white',
     'Smooth microfoam over a double shot of espresso', 4800000, true),
    (v_restaurant_id, v_coffee_cat_id, 'Caffe Latte', 'caffe-latte',
     'Espresso with steamed milk and light foam', 4500000, true),
    (v_restaurant_id, v_coffee_cat_id, 'Iced Coffee', 'iced-coffee',
     'Cold brew coffee served over ice', 4200000, true),
    (v_restaurant_id, v_coffee_cat_id, 'Mocha', 'mocha',
     'Espresso with chocolate, steamed milk and whipped cream', 5200000, true),
    (v_restaurant_id, v_coffee_cat_id, 'Affogato', 'affogato',
     'Vanilla gelato drowned in a shot of hot espresso', 5500000, true)
  ON CONFLICT (restaurant_id, category_id, slug)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price;

  -- ========================================
  -- SMOOTHIE ITEMS (7 items)
  -- ========================================
  -- Prices: IDR 55,000 - 75,000 (in cents)

  INSERT INTO item (restaurant_id, category_id, name, slug, description, price, active)
  VALUES
    (v_restaurant_id, v_smoothie_cat_id, 'Green Goddess', 'green-goddess',
     'Spinach, kale, banana, mango, coconut water', 5500000, true),
    (v_restaurant_id, v_smoothie_cat_id, 'Berry Blast', 'berry-blast',
     'Mixed berries, banana, almond milk, chia seeds', 5800000, true),
    (v_restaurant_id, v_smoothie_cat_id, 'Tropical Paradise', 'tropical-paradise',
     'Pineapple, mango, passion fruit, coconut milk', 6000000, true),
    (v_restaurant_id, v_smoothie_cat_id, 'Dragon Fruit Delight', 'dragon-fruit-delight',
     'Dragon fruit, strawberry, banana, coconut water', 6200000, true),
    (v_restaurant_id, v_smoothie_cat_id, 'Acai Power Bowl', 'acai-power-bowl',
     'Acai, banana, granola, fresh fruits, honey', 7500000, true),
    (v_restaurant_id, v_smoothie_cat_id, 'Peanut Butter Protein', 'peanut-butter-protein',
     'Peanut butter, banana, dates, almond milk, protein', 6800000, true),
    (v_restaurant_id, v_smoothie_cat_id, 'Detox Green', 'detox-green',
     'Cucumber, celery, apple, lemon, ginger, mint', 5800000, true)
  ON CONFLICT (restaurant_id, category_id, slug)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price;

  -- ========================================
  -- BREAKFAST ITEMS (8 items)
  -- ========================================
  -- Prices: IDR 65,000 - 95,000 (in cents)

  INSERT INTO item (restaurant_id, category_id, name, slug, description, price, active)
  VALUES
    (v_restaurant_id, v_breakfast_cat_id, 'Avocado Toast', 'avocado-toast',
     'Smashed avocado on sourdough with cherry tomatoes, feta, poached egg', 7500000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'Eggs Benedict', 'eggs-benedict',
     'Poached eggs, hollandaise, Canadian bacon on English muffin', 8500000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'Pancake Stack', 'pancake-stack',
     'Fluffy pancakes with maple syrup, butter, fresh berries', 7200000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'Greek Yogurt Bowl', 'greek-yogurt-bowl',
     'Thick yogurt, granola, honey, seasonal fruits, nuts', 6500000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'Big Breakfast', 'big-breakfast',
     'Two eggs any style, bacon, sausage, toast, hash browns', 9500000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'Acai Smoothie Bowl', 'acai-smoothie-bowl',
     'Acai base topped with granola, banana, berries, coconut', 7800000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'French Toast', 'french-toast',
     'Brioche French toast with caramelized banana, maple syrup', 7500000, true),
    (v_restaurant_id, v_breakfast_cat_id, 'Shakshuka', 'shakshuka',
     'Baked eggs in spiced tomato sauce with peppers, feta, pita', 8200000, true)
  ON CONFLICT (restaurant_id, category_id, slug)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price;

  -- ========================================
  -- DINNER ITEMS (9 items)
  -- ========================================
  -- Prices: IDR 82,000 - 155,000 (in cents)

  INSERT INTO item (restaurant_id, category_id, name, slug, description, price, active)
  VALUES
    (v_restaurant_id, v_dinner_cat_id, 'Grilled Barramundi', 'grilled-barramundi',
     'Local fish with lemon butter, seasonal vegetables, mashed potato', 12500000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Beef Rendang', 'beef-rendang',
     'Slow-cooked Indonesian beef in coconut curry, steamed rice', 11500000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Nasi Goreng Special', 'nasi-goreng-special',
     'Indonesian fried rice with prawns, chicken satay, fried egg', 9500000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Lamb Rack', 'lamb-rack',
     'Herb-crusted lamb rack with rosemary jus, roasted vegetables', 15500000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Seafood Pasta', 'seafood-pasta',
     'Linguine with prawns, mussels, calamari in white wine sauce', 11800000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Chicken Satay', 'chicken-satay',
     'Grilled marinated chicken skewers with peanut sauce, rice cakes', 8500000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Vegetable Curry', 'vegetable-curry',
     'Mixed vegetables in coconut curry, steamed rice, papadum', 8200000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Wagyu Burger', 'wagyu-burger',
     'Premium wagyu beef, truffle aioli, caramelized onions, fries', 13500000, true),
    (v_restaurant_id, v_dinner_cat_id, 'Mie Goreng', 'mie-goreng',
     'Indonesian stir-fried noodles with vegetables and your choice of protein', 8800000, true)
  ON CONFLICT (restaurant_id, category_id, slug)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price;

  RAISE NOTICE '✅ Successfully seeded menu data!';
  RAISE NOTICE '📋 Categories: Coffee (%), Smoothies (%), Breakfast (%), Dinner (%)',
    v_coffee_cat_id, v_smoothie_cat_id, v_breakfast_cat_id, v_dinner_cat_id;
  RAISE NOTICE '🍽️  Total items: 31 menu items across 4 categories';

END $$;

-- Verify the data was inserted
SELECT
  c.name as category,
  COUNT(i.id) as item_count
FROM category c
LEFT JOIN item i ON i.category_id = c.id
WHERE c.restaurant_id = '00000000-0000-0000-0000-000000000001'::uuid
GROUP BY c.name, c.position
ORDER BY c.position;
