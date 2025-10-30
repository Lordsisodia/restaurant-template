import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Magic Reveal',
  description: 'Luminous halo text reveal for high-drama storytelling.',
  recommendedUse: ['Hero campaigns', 'Premium experience callouts'],
  tags: ['hero', 'motion'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroMagicReveal')).default,
});

export { default as HeroMagicReveal } from './HeroMagicReveal';
