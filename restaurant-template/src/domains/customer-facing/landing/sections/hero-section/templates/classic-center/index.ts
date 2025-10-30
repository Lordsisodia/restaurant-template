import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Classic Center',
  description: 'Centered headline over hero image with stacked CTA cards.',
  recommendedUse: ['Restaurant landing pages', 'Home hero with minimal copy'],
  tags: ['hero', 'centered', 'cta'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroClassicCenter')).default,
});

export { default as HeroClassicCenter } from './HeroClassicCenter';
