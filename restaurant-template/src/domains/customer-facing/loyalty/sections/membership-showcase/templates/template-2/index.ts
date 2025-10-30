import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyMembershipShowcaseContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Membership Showcase · Template 2',
  description: 'Alternate framing to pair the membership card with campaign copy.',
  recommendedUse: ['Campaign LPs', 'A/B variant against primary layout'],
  tags: ['membership', 'variant'],
});

export const load: SectionVariantLoader<LoyaltyMembershipShowcaseContent> = async () => ({
  default: (await import('./LoyaltyMembershipShowcaseTemplate2')).default,
});

export { default as LoyaltyMembershipShowcaseTemplate2 } from './LoyaltyMembershipShowcaseTemplate2';
