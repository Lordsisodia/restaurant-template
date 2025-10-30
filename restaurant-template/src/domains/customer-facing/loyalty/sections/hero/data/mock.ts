import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { LoyaltyHeroVariant } from '../types';
import type { LoyaltyHeroContent } from '../types/schema';

export const loyaltyHeroMocks = defineSectionMocks<LoyaltyHeroVariant, LoyaltyHeroContent>('Loyalty Hero Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      eyebrow: 'Membership',
      headline: 'Join the Inner Circle',
      description: 'Earn rewards on every visit and unlock chef-curated surprises.',
      primaryCta: { href: '/contact', label: 'Join the loyalty programme' },
      secondaryCta: { href: '/menu', label: 'Browse the menu' },
    },
    'template-2': {
      eyebrow: 'VIP Access',
      headline: 'Collect points and savour the perks',
      description: 'Double your earnings during weekend service with exclusive status tiers.',
      primaryCta: { href: '/loyalty', label: 'See member perks' },
      secondaryCta: { href: '/reservations', label: 'Reserve a table' },
    },
    'template-3': {
      eyebrow: 'Reward Programme',
      headline: 'Eat well, earn faster',
      description: 'Stack points for seasonal tasting menus and private dinners.',
      primaryCta: { href: '/join', label: 'Activate membership' },
    },
  },
});

export type LoyaltyHeroMockKey = keyof typeof loyaltyHeroMocks;
