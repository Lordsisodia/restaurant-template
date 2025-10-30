/**
 * Demo Images for Restaurant Template
 *
 * Using high-quality food photos from Unsplash
 * These are FREE to use and will be replaced with restaurant's own photos in production
 */

export const DEMO_IMAGES = {
  // Hero Images
  hero: {
    indonesianFood: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80', // Food table spread
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80', // Restaurant interior
    grill: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80', // BBQ/Grill
  },

  // Indonesian Dishes
  dishes: {
    nasiGoreng: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    satay: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800&q=80',
    rendang: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=800&q=80',
    ayamBakar: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
    gadoGado: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',
    soto: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
    bakso: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800&q=80',
    mieGoreng: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&q=80',
  },

  // General Food
  food: {
    plate1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', // Salad
    plate2: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', // Bowl food
    plate3: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', // Pizza
    plate4: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', // Pancakes
    plate5: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80', // Burger
    plate6: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80', // Burger close
  },

  // Restaurant Ambiance
  ambiance: {
    dining1: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
    dining2: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    interior1: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    interior2: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    bar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
    outdoor: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },

  // Cooking/Kitchen
  kitchen: {
    chef1: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    chef2: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80',
    cooking: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    grill: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  },
};

/**
 * Gallery Data for Homepage
 */
export const HOMEPAGE_GALLERY = [
  { id: '1', publicId: 'samples/food/nasigoreng', alt: 'Nasi Goreng - Indonesian Fried Rice', url: DEMO_IMAGES.dishes.nasiGoreng },
  { id: '2', publicId: 'samples/food/satay', alt: 'Chicken Satay with Peanut Sauce', url: DEMO_IMAGES.dishes.satay },
  { id: '3', publicId: 'samples/food/rendang', alt: 'Beef Rendang', url: DEMO_IMAGES.dishes.rendang },
  { id: '4', publicId: 'samples/food/ayam', alt: 'Ayam Bakar - Grilled Chicken', url: DEMO_IMAGES.dishes.ayamBakar },
  { id: '5', publicId: 'samples/food/gado', alt: 'Gado-Gado - Indonesian Salad', url: DEMO_IMAGES.dishes.gadoGado },
  { id: '6', publicId: 'samples/food/soto', alt: 'Soto Ayam - Chicken Soup', url: DEMO_IMAGES.dishes.soto },
];

/**
 * Menu Item Sample Images
 */
export const MENU_SAMPLE_IMAGES = [
  { category: 'Appetizers', image: DEMO_IMAGES.food.plate1 },
  { category: 'Main Course', image: DEMO_IMAGES.dishes.nasiGoreng },
  { category: 'Grilled', image: DEMO_IMAGES.dishes.ayamBakar },
  { category: 'Noodles', image: DEMO_IMAGES.dishes.mieGoreng },
  { category: 'Soup', image: DEMO_IMAGES.dishes.soto },
  { category: 'Desserts', image: DEMO_IMAGES.food.plate4 },
];
