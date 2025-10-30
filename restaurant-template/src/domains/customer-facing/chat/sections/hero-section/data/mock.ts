import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { HeroVariant } from '../types';
import type { HeroContent } from '../types/schema';

export const heroMocks = defineSectionMocks<HeroVariant, HeroContent>('Hero Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      tenantName: 'Draco Coffee & Eatery',
      badgeLabel: 'Chat assistant',
      headline: 'Need a hand? Our assistant replies instantly with accurate answers.',
      description: 'Ask about menu items, delivery windows, or dietary preferences. These quick responses come straight from the team at Draco.',
      primaryCta: {
        label: 'Start WhatsApp chat',
        href: 'https://wa.me/6281234567890',
        target: '_blank',
        rel: 'noreferrer',
      },
      secondaryCta: {
        label: 'Contact support',
        href: '/contact',
      },
    },
    'template-1': {
      tenantName: 'Draco Coffee & Eatery',
      badgeLabel: 'Assistant tools',
      headline: 'Instant answers, powered by your in-house team.',
      description: 'Double-check allergens, get live table availability, or find the right person to help.',
      primaryCta: {
        label: 'Open assistant',
        href: '#assistant',
      },
      secondaryCta: {
        label: 'Chat on WhatsApp',
        href: 'https://wa.me/6281234567890',
        target: '_blank',
        rel: 'noreferrer',
      },
    },
    'template-2': {
      tenantName: 'Draco Coffee & Eatery',
      badgeLabel: 'New',
      headline: 'Say hello to your digital concierge.',
      description: 'From signature dishes to dietary needs, our assistant has the answers in seconds.',
      primaryCta: {
        label: 'Launch assistant',
        href: '#assistant',
      },
      secondaryCta: {
        label: 'Reserve a table',
        href: '/reservations',
      },
    },
    'template-3': {
      tenantName: 'Draco Coffee & Eatery',
      badgeLabel: 'Available 24/7',
      headline: 'Questions outside business hours? We’ve got you.',
      description: 'Browse FAQs, quick replies, and direct contact options whenever you need them.',
      primaryCta: {
        label: 'Explore quick replies',
        href: '#quick-replies',
      },
    },
  },
});

export type HeroMockKey = keyof typeof heroMocks;
