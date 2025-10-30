import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { MenuContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Menu · Signature Dishes',
  description: 'Highlight 3-4 hero plates with animated cards and CTA support.',
  recommendedUse: ['Landing hero stack', 'Campaign pages', 'Menu highlights'],
  tags: ['menu', 'carousel', 'featured'],
});

export const load: SectionVariantLoader<MenuContent> = async () => ({
  default: (await import('./MenuSignatureDishes')).default,
});

export { default as MenuSignatureDishes } from './MenuSignatureDishes';
