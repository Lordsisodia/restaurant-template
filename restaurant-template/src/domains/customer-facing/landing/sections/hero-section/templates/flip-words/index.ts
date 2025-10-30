import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Flip Words',
  description: 'Flip-word animation cycling through supporting adjectives.',
  recommendedUse: ['Brand messaging', 'Campaign showcases'],
  tags: ['hero', 'text-animation'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroFlipWords')).default,
});

export { default as HeroFlipWords } from './HeroFlipWords';
