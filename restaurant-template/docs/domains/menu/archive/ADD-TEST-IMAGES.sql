-- Add Test Images to Menu Items
-- Using Unsplash food photography based on item names/descriptions

-- BREAKFAST
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80' WHERE name = 'Egg Any Style'; -- eggs sunny side up
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&q=80' WHERE name = 'Croissant Sandwich'; -- croissant sandwich
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80' WHERE name = 'Draco Breakfast'; -- full breakfast plate
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&q=80' WHERE name = 'Smashed Avo'; -- avocado toast

-- BURGERS
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' WHERE name = 'Chicken Burger'; -- chicken burger
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80' WHERE name = 'Beef Burger'; -- beef burger

-- COCKTAILS
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80' WHERE name = 'Arani Cocktail'; -- cocktail with lime
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80' WHERE name = 'Blue Ocean Cocktail'; -- blue cocktail
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1545594308-96f0c85d4466?w=800&q=80' WHERE name = 'Espresso Martini'; -- espresso martini
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1595981234058-2c48e9ce95ca?w=800&q=80' WHERE name = 'Basil Sin City Cocktail'; -- basil cocktail

-- COFFEE
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80' WHERE name = 'Espresso'; -- espresso shot
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80' WHERE name = 'Americano'; -- americano
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80' WHERE name = 'Long Black'; -- long black coffee
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80' WHERE name = 'Iced Espresso'; -- iced coffee
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80' WHERE name = 'Iced Americano'; -- iced americano
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80' WHERE name = 'Iced Long Black'; -- iced long black
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80' WHERE name = 'Flat White'; -- flat white
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=80' WHERE name = 'Latte'; -- latte
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80' WHERE name = 'Cappuccino'; -- cappuccino
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80' WHERE name = 'Affogato'; -- affogato

-- PASTRY
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80' WHERE name = 'Almond Croissant'; -- almond croissant
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80' WHERE name = 'Croissant Cheese'; -- cheese croissant
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1588195538326-c5b1e5b92d6d?w=800&q=80' WHERE name = 'Chocolatine'; -- pain au chocolat
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80' WHERE name = 'Apple Slipper Butter Croissant'; -- apple croissant

-- SMOOTHIES
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80' WHERE name LIKE '%Smoothie%' AND category = 'Smoothies'; -- generic smoothie

-- RICE BOWLS
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80' WHERE category = 'Rice Bowl'; -- rice bowl

-- PIZZA
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' WHERE category = 'Pizza'; -- pizza

-- PASTA
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80' WHERE category = 'Pasta'; -- pasta

-- INDONESIAN
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80' WHERE category = 'Indonesian'; -- indonesian food

-- JUICE
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80' WHERE category = 'Juice'; -- fresh juice

-- DESSERT
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80' WHERE category = 'Dessert'; -- dessert

-- TO SHARE
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1608835291093-14a0c3a69791?w=800&q=80' WHERE category = 'To Share'; -- sharing platter

-- SPECIALTY DRINKS
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80' WHERE category = 'Specialty Drinks'; -- specialty drink

-- MOCKTAILS
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' WHERE category = 'Mocktails'; -- mocktail
