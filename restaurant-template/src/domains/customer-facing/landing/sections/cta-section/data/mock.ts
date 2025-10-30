import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { CtaVariant } from '../types';
import type { CtaContent } from '../types/schema';

export const ctaMocks = defineSectionMocks<CtaVariant, CtaContent>('Cta Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      primaryCTA: {
        label: 'Order on GrabFood',
        href: 'https://grab.onelink.me/12345/draco-coffee',
      },
      secondaryCTA: {
        label: 'WhatsApp',
        href: 'https://wa.me/6281234567890',
      },
      showAfterScroll: 35,
    },
  },
});

export type CtaMockKey = keyof typeof ctaMocks;
