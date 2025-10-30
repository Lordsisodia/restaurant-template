import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyHeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Hero · Primary',
  description: 'High-impact hero positioning the loyalty programme with primary/secondary CTAs.',
  recommendedUse: ['Landing page hero for loyalty marketing', 'Standalone loyalty microsite'],
  tags: ['hero', 'loyalty', 'ctas'],
});

export const load: SectionVariantLoader<LoyaltyHeroContent> = async () => ({
  default: (await import('./LoyaltyHeroPrimary')).default,
});

export { default as LoyaltyHeroPrimary } from './LoyaltyHeroPrimary';
