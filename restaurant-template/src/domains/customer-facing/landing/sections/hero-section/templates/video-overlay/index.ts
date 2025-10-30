import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Video Overlay',
  description: 'Autoplay hero video with fallback poster and paired CTAs.',
  recommendedUse: ['Experience-led brands', 'Product launch teasers'],
  tags: ['hero', 'video'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroVideoOverlay')).default,
});

export { default as HeroVideoOverlay } from './HeroVideoOverlay';
