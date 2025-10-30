import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { EssentialsVariant } from '../types';
import type { EssentialsContent } from '../types/schema';

export const essentialsMocks = defineSectionMocks<EssentialsVariant, EssentialsContent>('Essentials Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      hours: 'Open today · 8 AM – 10 PM',
      address: 'Jl. Raya Seminyak No. 21, Badung, Bali',
      whatsapp: '+62 812-3456-7890',
      phone: '+62 361-987-654',
      partners: ['GrabFood', 'GoFood'],
    },
  },
});

export type EssentialsMockKey = keyof typeof essentialsMocks;
