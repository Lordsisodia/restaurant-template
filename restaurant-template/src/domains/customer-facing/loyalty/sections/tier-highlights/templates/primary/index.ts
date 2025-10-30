import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyTierHighlightsContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Tier Highlights · Primary',
  description: 'Three-column gradient panel outlining key member tiers and benefits.',
  recommendedUse: ['Loyalty LP tiers section', 'Account upgrades page'],
  tags: ['tiers', 'loyalty', 'grid'],
});

export const load: SectionVariantLoader<LoyaltyTierHighlightsContent> = async () => ({
  default: (await import('./LoyaltyTierHighlightsPrimary')).default,
});

export { default as LoyaltyTierHighlightsPrimary } from './LoyaltyTierHighlightsPrimary';
