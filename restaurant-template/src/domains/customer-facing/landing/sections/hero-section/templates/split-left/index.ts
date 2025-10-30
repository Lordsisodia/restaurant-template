import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Split Left',
  description: 'Two-column hero with image emphasis and call-to-actions on the left.',
  recommendedUse: ['Menu-driven storytelling', 'Destination restaurants'],
  tags: ['hero', 'two-column'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroSplitLeft')).default,
});

export { default as HeroSplitLeft } from './HeroSplitLeft';
