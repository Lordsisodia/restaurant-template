import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Gradient Words',
  description: 'Animated gradient typography with optional carousel background.',
  recommendedUse: ['Brand campaigns', 'Animated headline hero'],
  tags: ['hero', 'animation', 'carousel'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroGradientWords')).default,
});

export { default as HeroGradientWords } from './HeroGradientWords';
