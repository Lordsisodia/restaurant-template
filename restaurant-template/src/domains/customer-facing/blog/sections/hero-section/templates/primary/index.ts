import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Hero · Primary',
  description: 'Full-width hero with background image and centered copy.',
  recommendedUse: ['Blog landing pages', 'Content hubs'],
  tags: ['hero', 'blog', 'featured'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroPrimary')).default,
});

export { default as HeroPrimary } from './HeroPrimary';
