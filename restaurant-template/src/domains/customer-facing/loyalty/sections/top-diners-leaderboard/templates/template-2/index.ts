import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyTopDinersContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Top Diners · Template 2',
  description: 'Variant styling for experimentation with alternative heading treatments.',
  recommendedUse: ['Campaign landing variants', 'Experiments against the primary leaderboard'],
  tags: ['leaderboard', 'variant'],
});

export const load: SectionVariantLoader<LoyaltyTopDinersContent> = async () => ({
  default: (await import('./LoyaltyTopDinersTemplate2')).default,
});

export { default as LoyaltyTopDinersTemplate2 } from './LoyaltyTopDinersTemplate2';
