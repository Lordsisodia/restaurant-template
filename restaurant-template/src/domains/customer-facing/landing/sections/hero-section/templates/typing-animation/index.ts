import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero TypingAnimation',
  description: 'TODO: describe when to use the typing-animation variant.',
  recommendedUse: ['Draft description pending'],
  tags: ['placeholder'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTypingAnimation')).default,
});

export { default as HeroTypingAnimation } from './HeroTypingAnimation';
