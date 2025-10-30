import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { HeroVariant } from '../types';
import type { HeroContent } from '../types/schema';

const baseContent: HeroContent = {
  pillText: 'Blog',
  title: 'Kitchen Stories',
  subtitle: 'Stories, insights, and updates from our team',
  backgroundImageUrl: '/images/shared/defaults/hero-default.jpg',
};

export const heroMocks = defineSectionMocks<HeroVariant, HeroContent>('Blog Hero Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      ...baseContent,
    },
    'template-2': {
      ...baseContent,
      subtitle: 'Behind-the-scenes, chef notes, and community spotlights',
    },
    'template-3': {
      ...baseContent,
      pillText: 'Stories',
    },
  },
});

export type HeroMockKey = keyof typeof heroMocks;
