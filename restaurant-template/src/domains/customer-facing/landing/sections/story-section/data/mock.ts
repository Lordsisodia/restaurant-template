import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { StoryVariant } from '../types';
import type { StoryContent } from '../types/schema';

export const storyMocks = defineSectionMocks<StoryVariant, StoryContent>('Story Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      title: 'From Jakarta With Love',
      story:
        'Three generations of coffee craftsmanship, roasted in Jakarta and perfected in Bali. Every plate tells a family story, every cup celebrates our farmers.',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1589308078053-f88ed85ba83f?w=1600&q=80',
          title: 'Where It All Began',
          description: 'Jakarta, 1986 — the first roast.',
        },
        {
          src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80',
          title: 'Crafted With Love',
          description: 'Handmade pastries baked every morning.',
        },
        {
          src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
          title: 'Locally Sourced',
          description: 'Fresh produce picked from nearby farms.',
        },
      ],
      highlights: [
        { icon: 'heart', label: 'Family Recipes' },
        { icon: 'sparkles', label: 'House-roasted Beans' },
        { icon: 'clock', label: 'Slow Fermentation' },
      ],
      ctaLabel: 'Read the full story',
      ctaHref: '/about',
      useCarousel: true,
    },
  },
});

export type StoryMockKey = keyof typeof storyMocks;
