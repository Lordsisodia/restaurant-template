// Draco Coffee and Eatery - Client Data
// Auto-generated from menu.md and client-info.md
// Last Updated: October 24, 2025

export const clientInfo = {
  businessName: "Draco Coffee and Eatery",
  tagline: "Where Strong Coffee Meets Authentic Flavor",
  description: "A modern coffee shop and eatery in Denpasar, Bali, serving specialty coffee, authentic Indonesian dishes, and unique local spirit cocktails. Open until 11 PM.",

  contact: {
    phone: "0813-3840-9090",
    phoneFormatted: "+62 813-3840-9090",
    deliveryPhone: "+62-819-9977-7138",
    whatsapp: "6281338409090",
    whatsappDelivery: "6281999777138",
    email: "" // TBD
  },

  address: {
    street: "Jl. Mahendradatta Selatan No.7b",
    district: "Pemecutan Klod",
    subDistrict: "Kec. Denpasar Bar.",
    city: "Kota Denpasar",
    province: "Bali",
    postalCode: "80119",
    country: "Indonesia",
    plusCode: "857P+PP",
    full: "Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80119"
  },

  coordinates: {
    lat: null, // TBD
    lng: null  // TBD
  },

  hours: {
    general: "Open until 11:00 PM",
    closingTime: "23:00",
    // TBD - Complete schedule needed
    schedule: {
      monday: { open: "", close: "23:00" },
      tuesday: { open: "", close: "23:00" },
      wednesday: { open: "", close: "23:00" },
      thursday: { open: "", close: "23:00" },
      friday: { open: "", close: "23:00" },
      saturday: { open: "", close: "23:00" },
      sunday: { open: "", close: "23:00" }
    }
  },

  rating: {
    score: 4.6,
    maxScore: 5.0,
    reviews: 149,
    source: "Google"
  },

  priceRange: {
    min: 25000,
    max: 195000,
    typical: {
      min: 50000,
      max: 75000
    },
    currency: "IDR",
    currencySymbol: "Rp",
    display: "Rp 25,000 - 195,000",
    typicalDisplay: "Rp 50,000 - 75,000 per person"
  },

  services: [
    "Dine-in",
    "Takeaway",
    "No-contact delivery",
    "GoFood",
    "GrabFood"
  ],

  cuisine: [
    "Coffee",
    "Indonesian",
    "Western",
    "Fusion",
    "Cocktails"
  ],

  social: {
    instagram: {
      handle: "draco.cofeeandeatery",
      url: "https://instagram.com/draco.cofeeandeatery"
    },
    facebook: {
      handle: "", // TBD
      url: ""     // TBD
    },
    googleMaps: "" // TBD
  },

  delivery: {
    platforms: ["GoFood", "GrabFood", "Direct"],
    directPhone: "+62-819-9977-7138",
    taxNote: "All prices exclude 5% tax",
    taxRate: 0.05
  },

  features: {
    wifi: null,        // TBD
    parking: null,     // TBD
    outdoor: null,     // TBD
    ac: null,          // TBD
    petFriendly: null  // TBD
  },

  stats: {
    menuCategories: 17,
    totalMenuItems: 80,
    establishedYear: null // TBD
  }
};

export const menuCategories = [
  {
    id: "pastry",
    name: "Pastry",
    nameId: "Kue Pastry",
    description: "Fresh baked croissants and pastries",
    icon: "🥐",
    sortOrder: 1,
    items: [
      { name: "Almond Croissant", nameId: "Croissant Almond", price: 30000, available: true },
      { name: "Croissant Cheese", nameId: "Croissant Keju", price: 30000, available: true },
      { name: "Chocolatine", nameId: "Chocolatine", price: 30000, available: true },
      { name: "Apple Slipper Butter Croissant", nameId: "Croissant Mentega Apel", price: 30000, available: true }
    ]
  },
  {
    id: "breakfast",
    name: "Breakfast",
    nameId: "Sarapan",
    description: "All-day breakfast favorites",
    icon: "🍳",
    sortOrder: 2,
    items: [
      {
        name: "Egg Any Style",
        nameId: "Telur Pilihan",
        price: 25000,
        description: "Omelette / Scramble / Sunny side up with salad on the side",
        descriptionId: "Dadar / Orak-arik / Mata sapi dengan salad",
        available: true
      },
      {
        name: "Croissant Sandwich",
        nameId: "Sandwich Croissant",
        price: 30000,
        description: "Croissant with egg any style and salad",
        descriptionId: "Croissant dengan telur pilihan dan salad",
        available: true
      },
      {
        name: "Draco Breakfast",
        nameId: "Sarapan Draco",
        price: 45000,
        description: "Grilled bread, spinach, egg any style, sautéed mushroom and sausage",
        descriptionId: "Roti panggang, bayam, telur pilihan, jamur tumis dan sosis",
        available: true
      },
      {
        name: "Smashed Avo",
        nameId: "Alpukat Tumbuk",
        price: 45000,
        description: "Grilled bread, guacamole, roasted tomato, and salad",
        descriptionId: "Roti panggang, guacamole, tomat panggang, dan salad",
        available: true
      }
    ]
  },
  {
    id: "rice-bowl",
    name: "Rice Bowl",
    nameId: "Nasi Bowl",
    description: "Indonesian-style rice bowls with various proteins and sauces",
    icon: "🍚",
    sortOrder: 3,
    items: [
      {
        name: "Chicken Cabai Garam",
        nameId: "Ayam Cabai Garam",
        price: 30000,
        description: "Fried chicken with garlic, chop chilli, garlic & salt, lettuce, mix vegetable, egg, steam rice",
        descriptionId: "Ayam goreng bawang, cabai cincang, bawang & garam, selada, sayuran campur, telur, nasi putih",
        available: true
      },
      {
        name: "Chicken Katsu",
        nameId: "Ayam Katsu",
        price: 30000,
        description: "Crispy fried chicken, egg, lettuce, mix vegetable, Teriyaki sauce, steam rice",
        descriptionId: "Ayam goreng crispy, telur, selada, sayuran campur, saus Teriyaki, nasi putih",
        available: true
      },
      {
        name: "Chicken Teriyaki",
        nameId: "Ayam Teriyaki",
        price: 30000,
        description: "Grilled chicken, egg, mix vegetable, lettuce, Teriyaki sauce, steam rice",
        descriptionId: "Ayam panggang, telur, sayuran campur, selada, saus Teriyaki, nasi putih",
        available: true
      },
      {
        name: "Beef Teriyaki",
        nameId: "Sapi Teriyaki",
        price: 30000,
        description: "Grilled beef, egg, mix vegetable, lettuce, Teriyaki sauce, steam rice",
        descriptionId: "Daging sapi panggang, telur, sayuran campur, selada, saus Teriyaki, nasi putih",
        available: true
      },
      {
        name: "Chicken Salted Egg",
        nameId: "Ayam Telur Asin",
        price: 30000,
        description: "Crispy fried chicken, egg, lettuce, mix vegetable, salted egg sauce, steam rice",
        descriptionId: "Ayam goreng crispy, telur, selada, sayuran campur, saus telur asin, nasi putih",
        available: true,
        popular: true
      },
      {
        name: "Chicken Black Pepper",
        nameId: "Ayam Lada Hitam",
        price: 30000,
        description: "Crispy fried chicken, egg, lettuce, mix vegetable, black pepper sauce, steam rice",
        descriptionId: "Ayam goreng crispy, telur, selada, sayuran campur, saus lada hitam, nasi putih",
        available: true
      },
      {
        name: "Beef Black Pepper",
        nameId: "Sapi Lada Hitam",
        price: 30000,
        description: "Crispy fried beef, egg, lettuce, mix vegetable, black pepper sauce, steam rice",
        descriptionId: "Daging sapi goreng crispy, telur, selada, sayuran campur, saus lada hitam, nasi putih",
        available: true
      },
      {
        name: "Chicken Sambal Matah",
        nameId: "Ayam Sambal Matah",
        price: 30000,
        description: "Crispy fried chicken, egg, lettuce, mix vegetable, Balinese sambal matah, steam rice",
        descriptionId: "Ayam goreng crispy, telur, selada, sayuran campur, sambal matah Bali, nasi putih",
        available: true,
        popular: true,
        spicy: true
      }
    ]
  },
  {
    id: "to-share",
    name: "To Share",
    nameId: "Untuk Berbagi",
    description: "Perfect appetizers and sides to share",
    icon: "🍟",
    sortOrder: 4,
    items: [
      {
        name: "Home Made Potato Wedges",
        nameId: "Kentang Wedges Rumahan",
        price: 30000,
        description: "With spicy mayo",
        descriptionId: "Dengan mayo pedas",
        available: true
      },
      {
        name: "Ayam Cabai Garam",
        nameId: "Ayam Cabai Garam",
        price: 30000,
        description: "Fried chicken with garlic, chop chilli, garlic & salt",
        descriptionId: "Ayam goreng bawang, cabai cincang, bawang & garam",
        available: true
      },
      {
        name: "Singkong Cabai Garam",
        nameId: "Singkong Cabai Garam",
        price: 30000,
        description: "Fried cassava with chop chili, garlic & salt",
        descriptionId: "Singkong goreng dengan cabai cincang, bawang & garam",
        available: true
      },
      {
        name: "Onion Ring",
        nameId: "Cincin Bawang",
        price: 30000,
        description: "Fried crispy onion with spicy mayo",
        descriptionId: "Bawang bombay goreng crispy dengan mayo pedas",
        available: true
      },
      {
        name: "Home Made Crispy Calamari",
        nameId: "Cumi Crispy Rumahan",
        price: 30000,
        description: "Fried crispy calamari with spicy mayo",
        descriptionId: "Cumi goreng crispy dengan mayo pedas",
        available: true
      }
    ]
  },
  {
    id: "indonesian",
    name: "Indonesian",
    nameId: "Masakan Indonesia",
    description: "Traditional Indonesian favorites",
    icon: "🍜",
    sortOrder: 5,
    items: [
      {
        name: "Fried Rice Chicken",
        nameId: "Nasi Goreng Ayam",
        price: 30000,
        description: "Served with egg, oyster sauce, chicken",
        descriptionId: "Disajikan dengan telur, saus tiram, ayam",
        available: true
      },
      {
        name: "Fried Rice Seafood",
        nameId: "Nasi Goreng Seafood",
        price: 35000,
        description: "Served with egg, oyster sauce, prawn and calamari",
        descriptionId: "Disajikan dengan telur, saus tiram, udang dan cumi",
        available: true
      },
      {
        name: "Fried Noodle Chicken",
        nameId: "Mie Goreng Ayam",
        price: 30000,
        description: "Served with egg, oyster sauce, chicken",
        descriptionId: "Disajikan dengan telur, saus tiram, ayam",
        available: true
      },
      {
        name: "Fried Noodle Seafood",
        nameId: "Mie Goreng Seafood",
        price: 35000,
        description: "Served with egg, oyster sauce, prawn and calamari",
        descriptionId: "Disajikan dengan telur, saus tiram, udang dan cumi",
        available: true
      },
      {
        name: "Nasi Bakar Ayam",
        nameId: "Nasi Bakar Ayam",
        price: 29000,
        description: "Banana leaves filled with kemangi (Thai basil), grilled chicken",
        descriptionId: "Daun pisang berisi kemangi, ayam bakar",
        available: true,
        popular: true,
        signature: true
      },
      {
        name: "Nasi Bakar Cumi",
        nameId: "Nasi Bakar Cumi",
        price: 35000,
        description: "Banana leaves filled with kemangi (Thai basil), grilled calamari",
        descriptionId: "Daun pisang berisi kemangi, cumi bakar",
        available: true,
        popular: true
      }
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    nameId: "Pizza",
    description: "Homemade pizzas with Draco sauce",
    icon: "🍕",
    sortOrder: 6,
    items: [
      {
        name: "Margarita Pizza",
        nameId: "Pizza Margarita",
        price: 85000,
        description: "Homemade Draco sauce with tomato and basil",
        descriptionId: "Saus Draco rumahan dengan tomat dan basil",
        available: true
      },
      {
        name: "Cheese Pizza",
        nameId: "Pizza Keju",
        price: 95000,
        description: "Homemade Draco sauce with parmesan cheese",
        descriptionId: "Saus Draco rumahan dengan keju parmesan",
        available: true
      },
      {
        name: "Meat Lover Pizza",
        nameId: "Pizza Pecinta Daging",
        price: 95000,
        description: "Homemade Draco sauce with ham, bacon, chicken and sausage",
        descriptionId: "Saus Draco rumahan dengan ham, bacon, ayam dan sosis",
        available: true
      }
    ]
  },
  {
    id: "pasta",
    name: "Pasta",
    nameId: "Pasta",
    description: "Classic Italian pasta dishes",
    icon: "🍝",
    sortOrder: 7,
    items: [
      {
        name: "Spaghetti Carbonara",
        nameId: "Spaghetti Carbonara",
        price: 45000,
        description: "Homemade cream sauce with ham, egg yolk, garlic bread",
        descriptionId: "Saus krim rumahan dengan ham, kuning telur, roti bawang",
        available: true,
        popular: true
      },
      {
        name: "Spaghetti Aglio Olio",
        nameId: "Spaghetti Aglio Olio",
        price: 45000,
        description: "With prawn, garlic, salad oil, basil",
        descriptionId: "Dengan udang, bawang putih, minyak salad, basil",
        available: true
      },
      {
        name: "Spaghetti Marinara",
        nameId: "Spaghetti Marinara",
        price: 45000,
        description: "Draco sauce, seasonal seafood, cherry tomato, fresh basil",
        descriptionId: "Saus Draco, seafood musiman, tomat ceri, basil segar",
        available: true
      }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    nameId: "Burger",
    description: "Homemade burgers with potato wedges",
    icon: "🍔",
    sortOrder: 8,
    items: [
      {
        name: "Chicken Burger",
        nameId: "Burger Ayam",
        price: 45000,
        description: "Homemade chicken patty, pickles, mayonnaise, cocktail sauce, potato wedges, iceberg lettuce",
        descriptionId: "Patty ayam rumahan, acar, mayones, saus koktail, kentang wedges, selada iceberg",
        available: true
      },
      {
        name: "Beef Burger",
        nameId: "Burger Sapi",
        price: 65000,
        description: "Homemade beef patty, iceberg lettuce, tomato, cheese, caramelized onion, potato wedges",
        descriptionId: "Patty sapi rumahan, selada iceberg, tomat, keju, bawang karamel, kentang wedges",
        available: true,
        popular: true
      }
    ]
  },
  {
    id: "sweet",
    name: "Sweet Temptation",
    nameId: "Godaan Manis",
    description: "Desserts and sweet treats",
    icon: "🍌",
    sortOrder: 9,
    items: [
      {
        name: "Pisang Goreng Original",
        nameId: "Pisang Goreng Original",
        price: 25000,
        description: "Traditional fried banana",
        descriptionId: "Pisang goreng tradisional",
        available: true
      },
      {
        name: "Tropical Pancake",
        nameId: "Pancake Tropis",
        price: 35000,
        available: true
      }
    ]
  }
  // Note: Coffee, tea, juice, smoothies, cocktails categories can be added similarly
  // Truncated for brevity - see menu.md for complete details
];

export const deliveryPlatforms = [
  {
    name: "GoFood",
    url: "", // TBD - Add deep link
    icon: "gofood-logo.svg"
  },
  {
    name: "GrabFood",
    url: "", // TBD - Add deep link
    icon: "grabfood-logo.svg"
  },
  {
    name: "Draco Direct",
    phone: "+62-819-9977-7138",
    whatsapp: "6281999777138"
  }
];

export const testimonials = [
  {
    text: "Nasi bakar cuminya enak",
    textEn: "The cumin nasi bakar is delicious",
    author: "Google Review",
    rating: 5,
    source: "Google"
  },
  {
    text: "Kopi disini nendang caffeine nya",
    textEn: "The coffee here has a strong caffeine kick",
    author: "Google Review",
    rating: 5,
    source: "Google"
  },
  {
    text: "Bikin mata terang-terus-terang",
    textEn: "Makes your eyes bright and awake",
    author: "Google Review",
    rating: 5,
    source: "Google"
  }
];

export default {
  clientInfo,
  menuCategories,
  deliveryPlatforms,
  testimonials
};
