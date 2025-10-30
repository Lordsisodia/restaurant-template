import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { EssentialsContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Essentials · Contact Chips',
  description: 'Compact pill row that surfaces hours, contact options, and delivery partners.',
  recommendedUse: ['Landing pages', 'Mobile-first contact summaries'],
  tags: ['contact', 'chips', 'utility'],
});

export const load: SectionVariantLoader<EssentialsContent> = async () => ({
  default: (await import('./EssentialsPrimary')).default,
});

export { default as EssentialsPrimary } from './EssentialsPrimary';
