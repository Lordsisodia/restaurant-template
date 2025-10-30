import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { LoyaltyTierHighlightsVariant } from '../types';
import type { LoyaltyTierHighlightsContent } from '../types/schema';

export const loyaltyTierHighlightsMocks = defineSectionMocks<LoyaltyTierHighlightsVariant, LoyaltyTierHighlightsContent>('Loyalty Tier Highlights Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      heading: 'Unlock new tiers faster',
      description: 'Each membership level adds richer experiences—highlight your favourites below.',
      tiers: [
        {
          title: 'Bronze',
          description: '5% back in points and a complimentary welcome drink on your second visit.',
        },
        {
          title: 'Gold',
          description: '10% back, double points on weekends, and early access to seasonal menus.',
        },
        {
          title: 'Platinum',
          description: 'Chef’s table invites, private tastings, and access to our concierge team.',
        },
      ],
    },
    'template-2': {
      heading: 'Choose your elite path',
      tiers: [
        {
          title: 'Silver',
          description: 'Complimentary appetiser every third visit and priority waitlist moves.',
        },
        {
          title: 'Gold',
          description: 'Monthly sommelier pairing previews plus double points on anniversaries.',
        },
        {
          title: 'Platinum',
          description: 'Dedicated host, VIP reservations, and surprise chef exclusives.',
        },
      ],
    },
    'template-3': {
      heading: 'Tier overview',
      description: 'Ideal for mobile flows where a stacked presentation is needed.',
      tiers: [
        {
          title: 'Member',
          description: 'Earn 1x points and access seasonal specials.',
        },
        {
          title: 'Insider',
          description: 'Earn 1.5x points with quarterly mixology classes.',
        },
        {
          title: 'Icon',
          description: 'Earn 2x points and receive curated chef surprises monthly.',
        },
      ],
    },
  },
});

export type LoyaltyTierHighlightsMockKey = keyof typeof loyaltyTierHighlightsMocks;
