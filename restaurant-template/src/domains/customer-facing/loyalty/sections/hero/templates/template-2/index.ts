import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyHeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Hero · Template 2',
  description: 'Secondary hero layout mirroring the primary copy with alternate art direction.',
  recommendedUse: ['Brand experiments', 'Seasonal loyalty campaigns'],
  tags: ['hero', 'variant'],
});

export const load: SectionVariantLoader<LoyaltyHeroContent> = async () => ({
  default: (await import('./LoyaltyHeroTemplate2')).default,
});

export { default as LoyaltyHeroTemplate2 } from './LoyaltyHeroTemplate2';
