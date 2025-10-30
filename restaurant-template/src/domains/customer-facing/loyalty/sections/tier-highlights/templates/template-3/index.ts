import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyTierHighlightsContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Tier Highlights · Template 3',
  description: 'Compact single-column tier list for constrained layouts.',
  recommendedUse: ['Mobile-first stacks', 'Sidebar upsell modules'],
  tags: ['tiers', 'compact'],
});

export const load: SectionVariantLoader<LoyaltyTierHighlightsContent> = async () => ({
  default: (await import('./LoyaltyTierHighlightsTemplate3')).default,
});

export { default as LoyaltyTierHighlightsTemplate3 } from './LoyaltyTierHighlightsTemplate3';
