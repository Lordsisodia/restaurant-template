import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyTopDinersContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Top Diners · Primary',
  description: 'Leaderboard of top loyalty members with rank, tier, and last visit details.',
  recommendedUse: ['Loyalty landing leaderboard', 'Admin/member dashboards'],
  tags: ['leaderboard', 'loyalty'],
});

export const load: SectionVariantLoader<LoyaltyTopDinersContent> = async () => ({
  default: (await import('./LoyaltyTopDinersPrimary')).default,
});

export { default as LoyaltyTopDinersPrimary } from './LoyaltyTopDinersPrimary';
