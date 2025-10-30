import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyMembershipShowcaseContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Membership Showcase · Template 3',
  description: 'Compact treatment for tighter layouts while retaining the interactive card.',
  recommendedUse: ['Mobile-first layouts', 'Sidebar embeds'],
  tags: ['membership', 'compact'],
});

export const load: SectionVariantLoader<LoyaltyMembershipShowcaseContent> = async () => ({
  default: (await import('./LoyaltyMembershipShowcaseTemplate3')).default,
});

export { default as LoyaltyMembershipShowcaseTemplate3 } from './LoyaltyMembershipShowcaseTemplate3';
