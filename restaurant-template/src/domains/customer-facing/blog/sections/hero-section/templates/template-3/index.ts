import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Hero · Template Three',
  description: 'Dark experimental hero reserved for future iterations.',
  recommendedUse: ['Concept testing'],
  tags: ['hero', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTemplate3')).default,
});

export { default as HeroTemplate3 } from './HeroTemplate3';
