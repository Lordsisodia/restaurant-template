import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { CtaContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'CTA · Smart Sticky Bar',
  description: 'Mobile sticky CTA bar that appears after scrolling past hero content.',
  recommendedUse: ['Delivery/order funnels', 'Mobile conversion nudges'],
  tags: ['cta', 'mobile', 'sticky'],
});

export const load: SectionVariantLoader<CtaContent> = async () => ({
  default: (await import('./CtaPrimary')).default,
});

export { default as CtaPrimary } from './CtaPrimary';
