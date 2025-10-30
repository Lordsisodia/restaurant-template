import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { LoyaltyTopDinersVariant } from '../types';
import type { LoyaltyTopDinersContent } from '../types/schema';

export const loyaltyTopDinersMocks = defineSectionMocks<LoyaltyTopDinersVariant, LoyaltyTopDinersContent>('Loyalty Top Diners Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      heading: 'Top diners this month',
      subheading: 'Keep dining to climb the ranks.',
      members: [
        {
          id: '1',
          fullName: 'Mira Patel',
          tier: 'platinum',
          points: 9820,
          lastVisit: '2025-10-05T12:00:00.000Z',
        },
        {
          id: '2',
          fullName: 'Jonas Müller',
          tier: 'gold',
          points: 8640,
          lastVisit: '2025-10-18T18:30:00.000Z',
        },
        {
          id: '3',
          fullName: 'Sofia Alvarez',
          tier: 'gold',
          points: 8120,
          lastVisit: '2025-10-21T14:15:00.000Z',
        },
        {
          id: '4',
          fullName: 'Noah Chen',
          tier: 'silver',
          points: 7050,
          lastVisit: '2025-10-20T09:45:00.000Z',
        },
      ],
    },
    'template-2': {
      heading: 'Leaderboard champions',
      subheading: 'Points update nightly based on your reservations.',
      members: [
        {
          id: '5',
          fullName: 'Elena Rossi',
          tier: 'platinum',
          points: 10200,
          lastVisit: '2025-10-10T19:10:00.000Z',
        },
        {
          id: '6',
          fullName: 'Marcus Lee',
          tier: 'gold',
          points: 8975,
          lastVisit: '2025-10-22T20:05:00.000Z',
        },
      ],
    },
    'template-3': {
      heading: 'Monthly MVPs',
      emptyStateMessage: 'No diners on the board yet—your guests will appear here once points accrue.',
      members: [],
    },
  },
});

export type LoyaltyTopDinersMockKey = keyof typeof loyaltyTopDinersMocks;
