import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Samsung Effect',
  description: 'Samsung-inspired kinetic headline animation for playful intros.',
  recommendedUse: ['Youthful brands', 'Digital product launches'],
  tags: ['hero', 'animation'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroSamsungEffect')).default,
});

export { default as HeroSamsungEffect } from './HeroSamsungEffect';
