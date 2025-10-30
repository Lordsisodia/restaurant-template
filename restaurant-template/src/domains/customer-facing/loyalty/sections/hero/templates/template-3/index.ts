import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { LoyaltyHeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Loyalty Hero · Template 3',
  description: 'Minimal hero arrangement for lightweight loyalty entry points.',
  recommendedUse: ['Mobile-first microsites', 'Email landing pages'],
  tags: ['hero', 'minimal'],
});

export const load: SectionVariantLoader<LoyaltyHeroContent> = async () => ({
  default: (await import('./LoyaltyHeroTemplate3')).default,
});

export { default as LoyaltyHeroTemplate3 } from './LoyaltyHeroTemplate3';
