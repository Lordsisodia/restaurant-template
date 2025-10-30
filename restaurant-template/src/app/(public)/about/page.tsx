import { AboutPage } from '@/domains/customer-facing/about-us';
import type { AboutPageData } from '@/domains/customer-facing/about-us';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Draco Coffee & Eatery',
  description: 'Meet the team, explore our venue, and learn how Draco Coffee & Eatery brings authentic Indonesian flavor to Denpasar.',
};

const ABOUT_DATA: AboutPageData = {
  hero: {
    title: "About Draco",
    subtitle: "Where Strong Coffee Meets Authentic Flavor",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=90",
    description: "Nestled in the heart of Denpasar, serving Bali's boldest coffee and most authentic flavors since our opening.",
  },
  
  venueGallery: {
    pillText: "Inside Draco",
    title: "Our Space in Motion",
    subtitle: "Snapshots from our space",
    intro: "From sunlit mornings to vinyl-fuelled nights, here’s a rolling look at Draco’s energy.",
    layout: 'slider',
    showCategories: true,
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
        alt: "Cozy interior with warm lighting",
        category: "interior",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
        alt: "Freshly brewed specialty coffee",
        category: "coffee",
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        alt: "Signature Nasi Bakar dish",
        category: "food",
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800&q=80",
        alt: "Outdoor seating area",
        category: "outdoor",
      },
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        alt: "Coffee bar and brewing station",
        category: "coffee",
      },
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        alt: "Evening atmosphere",
        category: "atmosphere",
      },
    ],
  },
  venueGalleryVariant: 'template-2',

  cuisinePhilosophy: {
    philosophyPoints: [
      {
        id: "1",
        icon: "leaf",
        title: "Fresh Local Ingredients",
        description: "We source the finest ingredients from trusted local suppliers daily, ensuring every dish bursts with authentic Balinese flavor.",
      },
      {
        id: "2",
        icon: "flame",
        title: "Traditional Methods",
        description: "Our signature Nasi Bakar is prepared using generations-old techniques, bringing you the true taste of Indonesian cuisine.",
      },
      {
        id: "3",
        icon: "heart",
        title: "Crafted with Passion",
        description: "Every cup of coffee and every plate is prepared with meticulous care and genuine love for the craft.",
      },
      {
        id: "4",
        icon: "award",
        title: "Award-Winning Quality",
        description: "Recognized by our community with a 4.6★ rating and loved by locals and visitors alike.",
      },
    ],
  },

  awards: {
    title: "Loved by Our Community",
    subtitle: "See what our customers are saying about Draco",
    compact: false,
    googleRating: {
      score: 4.6,
      totalReviews: 149,
      source: "Google",
    },
    testimonials: [
      {
        id: "1",
        name: "Sarah Johnson",
        rating: 5,
        text: "Best Nasi Bakar in Bali! The coffee is exceptional too. This place has become my go-to spot.",
        date: "2 weeks ago",
        platform: "Google",
      },
      {
        id: "2",
        name: "Made Wirawan",
        rating: 5,
        text: "Authentic Indonesian flavors with a modern twist. Open until 11 PM which is perfect for late dinners!",
        date: "1 month ago",
        platform: "Google",
      },
      {
        id: "3",
        name: "Emma Williams",
        rating: 5,
        text: "The espresso martini here is incredible. Great atmosphere and friendly staff. Highly recommend!",
        date: "3 weeks ago",
        platform: "Google",
      },
    ],
    achievements: [],
  },

  story: {
    milestones: [
      {
        id: "1",
        year: "2020",
        title: "The Dream Begins",
        description: "Draco Coffee and Eatery was born from a passion for exceptional coffee and authentic Indonesian cuisine. We envisioned a space where quality meets comfort.",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      },
      {
        id: "2",
        year: "2021",
        title: "Grand Opening",
        description: "Opening our doors in Denpasar, we quickly became a favorite among coffee enthusiasts and food lovers seeking authentic flavors.",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      },
      {
        id: "3",
        year: "2023",
        title: "Menu Evolution",
        description: "Expanded our menu to include our now-famous Nasi Bakar varieties, Chicken Sambal Matah, and premium espresso-based drinks including the Espresso Martini.",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      },
      {
        id: "4",
        year: "2024",
        title: "Community Recognition",
        description: "Achieved a 4.6★ rating with 149+ Google reviews. Extended hours until 11 PM to serve our night-owl customers. Partnered with GrabFood and GoFood for delivery.",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      },
    ],
  },

  team: {
    members: [
      {
        id: "1",
        name: "Chef Kadek",
        role: "Head Chef & Co-Founder",
        bio: "With over 15 years of culinary expertise, Chef Kadek brings the authentic flavors of Bali to every dish. Specializing in traditional Indonesian cuisine with a contemporary twist, he's the creative force behind our signature Nasi Bakar.",
        imageUrl: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&q=80",
      },
      {
        id: "2",
        name: "Wayan Sujana",
        role: "Master Barista",
        bio: "Certified specialty coffee expert with a deep passion for the perfect espresso. Wayan has trained in Jakarta and Singapore, bringing world-class coffee craftsmanship to Denpasar. Every cup is a work of art.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      },
      {
        id: "3",
        name: "Made Surya",
        role: "Operations Manager",
        bio: "The heart of Draco's daily operations, Made ensures every guest receives exceptional service. His attention to detail and warm hospitality create the welcoming atmosphere we're known for.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      },
      {
        id: "4",
        name: "Putu Ayu",
        role: "Pastry Chef",
        bio: "Creating our beloved desserts and breakfast pastries with precision and creativity. Putu's artisanal approach brings sweetness to every morning and the perfect ending to every meal.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      },
    ],
  },

  values: {
    pillText: "Our DNA",
    title: "What Powers Draco",
    subtitle: "The principles guiding every cup and conversation",
    values: [
      {
        id: "1",
        icon: "sprout",
        title: "Sustainable & Local",
        description: "Supporting Bali's farmers and suppliers with ethical sourcing practices.",
      },
      {
        id: "2",
        icon: "heart",
        title: "Community First",
        description: "Creating a welcoming space where everyone feels at home, from morning coffee to late-night dining.",
      },
      {
        id: "3",
        icon: "award",
        title: "Excellence in Quality",
        description: "Never compromising on ingredients, preparation, or service standards.",
      },
      {
        id: "4",
        icon: "coffee",
        title: "Coffee Craftsmanship",
        description: "Every espresso shot pulled with precision, every brew crafted to perfection.",
      },
    ],
  },
  valuesVariant: 'primary',

  location: {
    pillText: "Find Us",
    title: "Visit Us",
    subtitle: "Open until 11 PM • Ready to serve you",
    address: "Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119",
    map: {
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2!2d115.2!3d-8.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzknMDAuMCJTIDExNcKwMTInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890",
      link: "https://maps.google.com/?q=Jl.+Mahendradatta+Selatan+No.7b,+Pemecutan+Klod,+Denpasar,+Bali",
    },
    contacts: [
      {
        id: 'call',
        type: 'phone',
        label: 'Call the cafe',
        value: '0813-3840-9090',
      },
      {
        id: 'whatsapp',
        type: 'whatsapp',
        label: 'WhatsApp reservations',
        value: '+62 819-9977-7138',
      },
    ],
    hoursSummary: "Open daily until 11:00 PM",
    operatingHours: [
      { day: 'Monday – Thursday', open: '08:00', close: '23:00' },
      { day: 'Friday – Saturday', open: '08:00', close: '24:00', note: 'Live DJ from 21:00' },
      { day: 'Sunday', open: '08:00', close: '22:00' },
    ],
    directions: "Located on Jl. Mahendradatta Selatan, easily accessible from central Denpasar. Look for our distinctive Draco logo.",
    parkingInfo: "Street parking available. Motorcycle parking directly in front.",
    notes: ['Wheelchair access via the east entrance ramp'],
  },
  locationVariant: 'primary',

  faq: {
    pillText: "Need a hand?",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about dining with us",
    showCategories: true,
    timestamp: "Updated 24 Oct 2025",
    cta: {
      href: 'https://wa.me/6281999777138',
      label: 'Chat with support',
    },
    emptyState: 'No questions in this category yet. Ping us anytime!',
    items: [
      {
        id: "1",
        question: "Do you offer delivery?",
        answer: "Yes! Order through GrabFood or GoFood for delivery to your location. All prices exclude 5% tax.",
        category: "delivery",
        icon: "🛵",
        iconPosition: "right",
      },
      {
        id: "2",
        question: "What are your opening hours?",
        answer: "We're open daily until 11:00 PM, perfect for late-night coffee cravings or dinner!",
        category: "general",
        icon: "🌙",
        iconPosition: "left",
      },
      {
        id: "3",
        question: "Do you have WiFi?",
        answer: "Yes, we offer complimentary high-speed WiFi for all our customers. Perfect for remote work or catching up on emails.",
        category: "general",
        icon: "📡",
        iconPosition: "right",
      },
      {
        id: "4",
        question: "Can you accommodate dietary restrictions?",
        answer: "Absolutely! We can adjust many dishes for vegetarian preferences and allergies. Just let our staff know your requirements.",
        category: "dining",
      },
      {
        id: "5",
        question: "What are your most popular dishes?",
        answer: "Our signature Nasi Bakar (both Ayam and Cumi), Chicken Sambal Matah, specialty coffee, and the famous Espresso Martini!",
        category: "ordering",
        icon: "⭐",
        iconPosition: "left",
      },
      {
        id: "6",
        question: "Do you accept reservations?",
        answer: "While we welcome walk-ins, you can message us on WhatsApp (+62 819-9977-7138) to reserve a table for larger groups.",
        category: "dining",
      },
      {
        id: "7",
        question: "Is parking available?",
        answer: "Yes, we have street parking and motorcycle parking directly in front of our location.",
        category: "general",
      },
      {
        id: "8",
        question: "Can I order just coffee?",
        answer: "Of course! We're a coffee shop first. Whether it's a quick espresso or a relaxing afternoon with specialty brews, you're always welcome.",
        category: "ordering",
        icon: "☕",
        iconPosition: "right",
      },
    ],
  },
  faqVariant: 'primary',

};

export default function AboutRoute() {
  return <AboutPage data={ABOUT_DATA} tenant={{ displayName: "Restaurant", slug: "restaurant" }} />;
}
