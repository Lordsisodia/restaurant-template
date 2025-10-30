import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Reveal Text',
  description: 'Interactive reveal text hero with hover overlay effect.',
  recommendedUse: ['Interactive hero moments', 'Event launches'],
  tags: ['hero', 'interaction'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroRevealText')).default,
});

export { default as HeroRevealText } from './HeroRevealText';
