import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyMembershipShowcaseContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Membership Showcase · Primary',
  description: 'Centres the interactive membership card with optional intro copy.',
  recommendedUse: ['Loyalty landing page mid-section', 'Account dashboard highlight'],
  tags: ['membership', 'card', 'interactive'],
});

export const load: SectionVariantLoader<LoyaltyMembershipShowcaseContent> = async () => ({
  default: (await import('./LoyaltyMembershipShowcasePrimary')).default,
});

export { default as LoyaltyMembershipShowcasePrimary } from './LoyaltyMembershipShowcasePrimary';
