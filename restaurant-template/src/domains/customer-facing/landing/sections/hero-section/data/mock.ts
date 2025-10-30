import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { HeroVariant } from '../types';
import type { HeroContent } from '../types/schema';

const baseContent: HeroContent = {
  title: 'Draco Coffee & Eatery',
  subtitle: 'Bali’s boldest coffee and comfort dishes.',
  imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80&auto=format&fit=crop',
  primaryCta: { label: 'Order Now', href: '/menu' },
  secondaryCta: { label: 'Message on WhatsApp', href: 'https://wa.me/6281234567890' },
  words: ['Bold.', 'Fresh.', 'Now.'],
};

export const heroMocks = defineSectionMocks<HeroVariant, HeroContent>('Hero Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      ...baseContent,
      useAnimatedHeadline: true,
    },
    'classic-center': {
      ...baseContent,
    },
    'gradient-words': {
      ...baseContent,
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=60&auto=format&fit=crop&sat=-30',
      ],
      words: ['Brewed', 'With', 'Care'],
    },
    'logo-center': {
      ...baseContent,
      logoUrl: '/images/tenants/draco/logos/primary-light.png',
    },
    'minimal-center': {
      ...baseContent,
      primaryCta: undefined,
      secondaryCta: undefined,
    },
    'split-left': {
      ...baseContent,
    },
    'video-overlay': {
      ...baseContent,
      videoUrl: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    },
    'animated-text': {
      ...baseContent,
    },
    'typewriter': {
      ...baseContent,
      words: ['Signature Brews', 'Comfort Plates', 'Local Favorites'],
    },
    'blur-fade': {
      ...baseContent,
      primaryCta: undefined,
      secondaryCta: undefined,
    },
    'flip-words': {
      ...baseContent,
      words: ['Artisanal', 'Seasonal', 'Sourced'],
    },
    'typing-animation': {
      ...baseContent,
    },
    'magic-reveal': {
      ...baseContent,
    },
    'reveal-text': {
      ...baseContent,
    },
    'samsung-effect': {
      ...baseContent,
      subtitle: 'Coffee, brunch, and community every single day.',
      primaryCta: undefined,
      secondaryCta: undefined,
      words: undefined,
    },
  },
});

export type HeroMockKey = keyof typeof heroMocks;
