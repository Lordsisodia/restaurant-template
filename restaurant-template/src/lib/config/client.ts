/**
 * Draco Coffee and Eatery - Client Configuration
 *
 * This file contains all client-specific information including:
 * - Business details
 * - Contact information
 * - Location and hours
 * - Branding colors
 * - Social media links
 *
 * Update this file to customize the template for any restaurant client.
 *
 * @see /client-info/client-info.md for complete documentation
 * @see /client-info/menu.md for full menu details
 * @see /client-info/brand-colors.md for design system
 */

export const CLIENT_CONFIG = {
  // ===== BUSINESS INFORMATION =====
  businessName: "Draco Coffee and Eatery",
  tagline: "Where Strong Coffee Meets Authentic Flavor",
  description: "A modern coffee shop and eatery in Denpasar, Bali, serving specialty coffee, authentic Indonesian dishes, and unique local spirit cocktails. Open until 11 PM.",
  type: "Coffee Shop & Eatery",

  // ===== CONTACT INFORMATION =====
  contact: {
    phone: "0813-3840-9090",
    phoneFormatted: "+62 813-3840-9090",
    phoneHref: "tel:+6281338409090",

    deliveryPhone: "+62-819-9977-7138",
    deliveryPhoneFormatted: "+62 819 9977 7138",
    deliveryPhoneHref: "tel:+6281999777138",

    whatsapp: "6281338409090",
    whatsappUrl: "https://wa.me/6281338409090",

    whatsappDelivery: "6281999777138",
    whatsappDeliveryUrl: "https://wa.me/6281999777138",

    email: "", // TBD
  },

  // ===== LOCATION =====
  address: {
    street: "Jl. Mahendradatta Selatan No.7b",
    district: "Pemecutan Klod",
    subDistrict: "Kec. Denpasar Bar.",
    city: "Kota Denpasar",
    province: "Bali",
    postalCode: "80119",
    country: "Indonesia",
    plusCode: "857P+PP",
    full: "Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80119",

    // For display
    displayShort: "Jl. Mahendradatta Selatan No.7b, Denpasar, Bali",
    displayFull: "Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119",
  },

  coordinates: {
    lat: null, // TBD - Extract from Google Maps
    lng: null, // TBD - Extract from Google Maps
  },

  // ===== OPERATING HOURS =====
  hours: {
    general: "Open until 11:00 PM",
    closingTime: "23:00",
    timezone: "Asia/Makassar", // WITA (UTC+8)

    // TBD - Need complete schedule from client
    schedule: {
      monday: { open: "", close: "23:00", isOpen: true },
      tuesday: { open: "", close: "23:00", isOpen: true },
      wednesday: { open: "", close: "23:00", isOpen: true },
      thursday: { open: "", close: "23:00", isOpen: true },
      friday: { open: "", close: "23:00", isOpen: true },
      saturday: { open: "", close: "23:00", isOpen: true },
      sunday: { open: "", close: "23:00", isOpen: true },
    },
  },

  // ===== RATING & REVIEWS =====
  rating: {
    score: 4.6,
    maxScore: 5.0,
    reviews: 149,
    source: "Google",
    displayText: "4.6 (149 reviews)",
  },

  // ===== PRICING =====
  pricing: {
    min: 25000,
    max: 195000,
    typical: {
      min: 50000,
      max: 75000,
    },
    currency: "IDR",
    currencySymbol: "Rp",
    taxRate: 0.05,
    taxNote: "All prices exclude 5% tax",

    // For display
    displayRange: "Rp 25,000 - 195,000",
    displayTypical: "Rp 50,000 - 75,000 per person",
    displaySymbols: "Rp 50K - 75K",
  },

  // ===== SERVICES =====
  services: {
    dineIn: true,
    takeaway: true,
    delivery: true,
    noContactDelivery: true,
    reservation: false, // TBD

    deliveryPlatforms: [
      {
        name: "GoFood",
        enabled: true,
        url: "", // TBD - Add deep link
        icon: "/images/delivery/gofood.svg",
      },
      {
        name: "GrabFood",
        enabled: true,
        url: "", // TBD - Add deep link
        icon: "/images/delivery/grabfood.svg",
      },
      {
        name: "Direct Delivery",
        enabled: true,
        phone: "+62-819-9977-7138",
        whatsapp: "6281999777138",
      },
    ],
  },

  // ===== CUISINE TYPES =====
  cuisine: [
    "Coffee",
    "Indonesian",
    "Western",
    "Fusion",
    "Cocktails",
  ],

  // ===== SOCIAL MEDIA =====
  social: {
    instagram: {
      handle: "draco.cofeeandeatery",
      url: "https://instagram.com/draco.cofeeandeatery",
      displayHandle: "@draco.cofeeandeatery",
    },
    facebook: {
      handle: "", // TBD
      url: "", // TBD
    },
    googleMaps: {
      url: "", // TBD
      placeId: "", // TBD
    },
  },

  // ===== BRANDING & DESIGN =====
  branding: {
    colors: {
      // Primary theme: Black background, White text
      primary: {
        background: "#000000",
        text: "#FFFFFF",
      },

      // Accent colors
      accent: {
        gold: "#D4AF37",
        coffee: "#6D4C41",
      },

      // Status colors
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },

    logo: {
      primary: "/images/tenants/draco/brand/logo/draco-logo.svg",
      inverse: "/images/tenants/draco/brand/logo/draco-logo.svg",
      favicon: "/favicon.ico",
    },

    fonts: {
      // TBD - Confirm with client
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      heading: "'Poppins', sans-serif",
    },
  },

  // ===== FEATURES & AMENITIES =====
  features: {
    wifi: null, // TBD
    parking: null, // TBD
    outdoorSeating: null, // TBD
    airConditioning: null, // TBD
    petFriendly: null, // TBD
    accessibility: null, // TBD
  },

  // ===== MENU STATS =====
  menu: {
    totalCategories: 17,
    totalItems: 80,

    // Popular items based on customer feedback
    popular: [
      "Nasi Bakar Ayam",
      "Nasi Bakar Cumi",
      "Chicken Sambal Matah",
      "Specialty Coffee",
      "Espresso Martini",
    ],

    // Signature/must-try items
    signature: [
      "Nasi Bakar Ayam",
      "Strong Caffeine Coffee",
      "Local Spirit Cocktails",
    ],
  },

  // ===== SEO & METADATA =====
  seo: {
    title: "Draco Coffee and Eatery - Best Coffee Shop in Denpasar, Bali",
    description: "Experience the perfect blend of specialty coffee and authentic Indonesian cuisine at Draco Coffee and Eatery. Located in Denpasar, Bali. Open until 11 PM.",
    keywords: [
      "Draco Coffee Denpasar",
      "Coffee shop Bali",
      "Nasi bakar Denpasar",
      "Late night coffee Bali",
      "Best coffee in Denpasar",
      "Indonesian coffee shop",
      "Study cafe Bali",
      "Coffee and eatery Pemecutan",
      "Bali cocktails",
      "Denpasar restaurants",
    ],

    ogImage: "/images/og-image.jpg", // TBD
    twitterCard: "summary_large_image",
  },

  // ===== CUSTOMER TESTIMONIALS =====
  testimonials: [
    {
      id: 1,
      text: "Nasi bakar cuminya enak",
      textEn: "The cumin nasi bakar is delicious",
      author: "Google Review",
      rating: 5,
      source: "Google",
    },
    {
      id: 2,
      text: "Kopi disini nendang caffeine nya",
      textEn: "The coffee here has a strong caffeine kick",
      author: "Google Review",
      rating: 5,
      source: "Google",
    },
    {
      id: 3,
      text: "Bikin mata terang-terus-terang",
      textEn: "Makes your eyes bright and awake",
      author: "Google Review",
      rating: 5,
      source: "Google",
    },
  ],

  // ===== LOCALE SETTINGS =====
  locale: {
    primary: "id-ID", // Indonesian (Bahasa Indonesia)
    secondary: "en-US", // English
    currency: "IDR",
    timezone: "Asia/Makassar",
  },
} as const;

// ===== HELPER FUNCTIONS =====

/**
 * Get formatted phone number for display
 */
export const getDisplayPhone = () => CLIENT_CONFIG.contact.phoneFormatted;

/**
 * Get clickable phone link
 */
export const getPhoneLink = () => CLIENT_CONFIG.contact.phoneHref;

/**
 * Get formatted delivery phone
 */
export const getDeliveryPhone = () => CLIENT_CONFIG.contact.deliveryPhoneFormatted;

/**
 * Get WhatsApp link for delivery
 */
export const getWhatsAppDeliveryLink = () => CLIENT_CONFIG.contact.whatsappDeliveryUrl;

/**
 * Get full address for display
 */
export const getFullAddress = () => CLIENT_CONFIG.address.full;

/**
 * Get short address for display
 */
export const getShortAddress = () => CLIENT_CONFIG.address.displayShort;

/**
 * Get rating text for display
 */
export const getRatingDisplay = () => CLIENT_CONFIG.rating.displayText;

/**
 * Check if restaurant is currently open
 * @param currentTime - Optional Date object, defaults to now
 */
export const isOpen = (currentTime: Date = new Date()): boolean => {
  // TBD - Implement based on complete schedule
  const hour = currentTime.getHours();
  return hour < 23; // Closes at 11 PM (23:00)
};

/**
 * Get Instagram URL
 */
export const getInstagramUrl = () => CLIENT_CONFIG.social.instagram.url;

/**
 * Get Instagram handle with @
 */
export const getInstagramHandle = () => CLIENT_CONFIG.social.instagram.displayHandle;

/**
 * Format price in IDR
 */
export const formatPrice = (amount: number): string => {
  return `${CLIENT_CONFIG.pricing.currencySymbol} ${amount.toLocaleString("id-ID")}`;
};

/**
 * Format price in K format (25000 -> 25K)
 */
export const formatPriceShort = (amount: number): string => {
  return `${CLIENT_CONFIG.pricing.currencySymbol} ${(amount / 1000)}K`;
};

/**
 * Calculate price with tax
 */
export const getPriceWithTax = (amount: number): number => {
  return amount * (1 + CLIENT_CONFIG.pricing.taxRate);
};

// Export individual sections for easier imports
export const { contact, address, hours, rating, pricing, services, social, branding, menu } = CLIENT_CONFIG;

// Export type for TypeScript
export type ClientConfig = typeof CLIENT_CONFIG;
