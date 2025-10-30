import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { LoyaltyMembershipShowcaseVariant } from '../types';
import type { LoyaltyMembershipShowcaseContent } from '../types/schema';

export const loyaltyMembershipShowcaseMocks = defineSectionMocks<LoyaltyMembershipShowcaseVariant, LoyaltyMembershipShowcaseContent>('Loyalty Membership Showcase Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      title: 'Preview your digital membership card',
      description: 'Hover or tap to explore tier status, perks, and card details that stay synced with your profile.',
      card: {
        name: 'Jamie Rivera',
        tier: 'gold',
        points: 4820,
        nextTier: 'platinum',
        pointsToNextTier: 680,
        benefits: ['Priority reservations', 'Complimentary dessert tastings', 'Birthday bottle service'],
      },
    },
    'template-2': {
      title: 'Member spotlight',
      description: 'Dynamic loyalty card with campaign-focused copy alongside the UI.',
      card: {
        name: 'Tara Singh',
        tier: 'platinum',
        points: 9210,
        nextTier: 'diamond',
        pointsToNextTier: 1790,
      },
    },
    'template-3': {
      title: 'Your rewards wallet',
      description: 'Compact card layout optimised for mobile loyalty dashboards.',
      card: {
        name: 'Chris Lee',
        tier: 'silver',
        points: 2450,
        nextTier: 'gold',
        pointsToNextTier: 550,
      },
    },
  },
});

export type LoyaltyMembershipShowcaseMockKey = keyof typeof loyaltyMembershipShowcaseMocks;
