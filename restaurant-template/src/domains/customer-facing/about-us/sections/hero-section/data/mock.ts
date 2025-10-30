import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { HeroVariant } from '../types';
import type { HeroContent } from '../types/schema';

export const heroMocks = defineSectionMocks<HeroVariant, HeroContent>('Hero Section', {
  defaultVariant: 'primary',
  variants: {
    primary: {
      title: 'About Us',
      subtitle: 'Our Story, Our Passion',
      description:
        'Since opening our doors, Draco Coffee and Eatery has been serving Bali’s boldest coffee and most authentic flavors.',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop',
      pillText: 'Discover Our Journey',
    },
    'template-2': {
      title: 'Where Taste Meets Tradition',
      subtitle: 'Three decades of craftsmanship in every cup',
      description: 'Explore seasonal highlights, signature drinks, and the people who make them unforgettable.',
      imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&q=90&auto=format&fit=crop',
    },
    'template-3': {
      title: 'Rooted in Community',
      subtitle: 'Hospitality that feels like home',
      description: 'Small-batch roasting, locally sourced ingredients, and a team that treats every guest like family.',
      imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1920&q=90&auto=format&fit=crop',
    },
  },
});

export type HeroMockKey = keyof typeof heroMocks;
