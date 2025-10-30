import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { QuickRepliesVariant } from '../types';
import type { QuickRepliesContent } from '../types/schema';

export const quickRepliesMocks = defineSectionMocks<QuickRepliesVariant, QuickRepliesContent>('QuickReplies Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      heading: 'Popular quick replies',
      description: 'Tap a card to auto-fill the assistant with helpful context.',
      emptyStateMessage: "Our assistant is learning new answers. Reach out if you can't find what you need.",
      locale: 'id-ID',
      macros: [
        {
          id: 'macro-1',
          title: 'What are today’s specials?',
          prompt: 'Can you show me the specials available today?',
          tags: ['menu', 'specials'],
          createdAt: new Date().toISOString(),
        },
        {
          id: 'macro-2',
          title: 'Do you offer vegetarian options?',
          prompt: 'List vegetarian-friendly dishes and drinks.',
          tags: ['dietary'],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'macro-3',
          title: 'What time do you close?',
          prompt: 'Share operating hours for today.',
          tags: ['hours'],
          createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        },
        {
          id: 'macro-4',
          title: 'How do I make a reservation?',
          prompt: 'Explain how to book a table for 4 people.',
          tags: ['reservations'],
          createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        },
      ],
    },
  },
});

export type QuickRepliesMockKey = keyof typeof quickRepliesMocks;
