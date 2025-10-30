import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { SpecialsVariant } from '../types';
import type { SpecialsContent } from '../types/schema';

export const specialsMocks = defineSectionMocks<SpecialsVariant, SpecialsContent>('Specials Section', {
  defaultVariant: 'grid',
  variants: {
    'grid': {
      heading: "Today's Specials",
      subtitle: 'Limited-time dishes curated by Chef Rani.',
      viewAllHref: '/specials',
      items: [
        {
          id: 'spc-1',
          title: 'Balinese Spice Fried Chicken',
          description: 'Crispy ayam goreng with sambal matah and torch ginger slaw.',
          type: 'Chef Pick',
        },
        {
          id: 'spc-2',
          title: 'Caramelised Pineapple Tart',
          description: 'Served warm with coconut gelato and palm sugar caramel.',
          type: 'Dessert',
        },
        {
          id: 'spc-3',
          title: 'Cold Brew Citrus Spritz',
          description: 'Single-origin cold brew, orange oleo, tonic.',
          type: 'Beverage',
        },
      ],
    },
    'slider': {
      heading: '✨ Specialty Drinks & Delights',
      subtitle: 'Handcrafted beverages and signature creations from Draco Coffee & Eatery',
      viewMenuHref: '/menu',
      items: [
        {
          id: 'slider-1',
          title: 'Pandan Coconut Frappe',
          description: 'House pandan syrup, coconut cream, espresso shot.',
          category: 'Coffee',
          imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=880&q=80',
          priceFormatted: 'Rp 48.000',
        },
        {
          id: 'slider-2',
          title: 'Dragon Fruit Cooler',
          description: 'Dragon fruit puree, lychee, lemon balm.',
          category: 'Mocktails',
          imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=880&q=80',
          priceFormatted: 'Rp 45.000',
        },
        {
          id: 'slider-3',
          title: 'Smoked Jasmine Tea',
          description: 'Jasmine cold brew, smoked honey, soda.',
          category: 'Tea',
          imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=880&q=80',
          priceFormatted: 'Rp 38.000',
        },
      ],
    },
  },
});

export type SpecialsMockKey = keyof typeof specialsMocks;
