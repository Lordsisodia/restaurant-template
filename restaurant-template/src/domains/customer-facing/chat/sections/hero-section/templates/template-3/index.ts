import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Chat Hero · Compact',
  description: 'Condensed hero variant for secondary placements or mobile feature blocks.',
  recommendedUse: ['Mobile-first layouts', 'Secondary assistant promos'],
  tags: ['chat', 'hero', 'compact'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTemplate3')).default,
});

export { default as HeroTemplate3 } from './HeroTemplate3';
