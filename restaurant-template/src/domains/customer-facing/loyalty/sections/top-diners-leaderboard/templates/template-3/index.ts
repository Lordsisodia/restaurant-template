import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyTopDinersContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Top Diners · Template 3',
  description: 'Stacked leaderboard for vertical or mobile-dominant layouts.',
  recommendedUse: ['Mobile-first loyalty flows', 'Sidebar leaderboard'],
  tags: ['leaderboard', 'compact'],
});

export const load: SectionVariantLoader<LoyaltyTopDinersContent> = async () => ({
  default: (await import('./LoyaltyTopDinersTemplate3')).default,
});

export { default as LoyaltyTopDinersTemplate3 } from './LoyaltyTopDinersTemplate3';
