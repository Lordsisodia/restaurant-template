import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyTierHighlightsContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Tier Highlights · Template 2',
  description: 'Alternate styling for campaigns needing lighter backgrounds.',
  recommendedUse: ['Email landing variants', 'Seasonal loyalty pushes'],
  tags: ['tiers', 'variant'],
});

export const load: SectionVariantLoader<LoyaltyTierHighlightsContent> = async () => ({
  default: (await import('./LoyaltyTierHighlightsTemplate2')).default,
});

export { default as LoyaltyTierHighlightsTemplate2 } from './LoyaltyTierHighlightsTemplate2';
