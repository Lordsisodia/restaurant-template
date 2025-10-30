import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Primary Gradient',
  description: 'Full-bleed hero with optional animated headline and dual CTAs.',
  recommendedUse: ['Landing home pages', 'High-impact campaign hero'],
  tags: ['hero', 'glassmorphism', 'cta'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroPrimary')).default,
});

export { default as HeroPrimary } from './HeroPrimary';
