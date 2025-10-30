import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Blur Fade',
  description: 'Soft blur-fade reveal for headline and supporting copy.',
  recommendedUse: ['Minimal hero', 'Announcements'],
  tags: ['hero', 'motion'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroBlurFade')).default,
});

export { default as HeroBlurFade } from './HeroBlurFade';
