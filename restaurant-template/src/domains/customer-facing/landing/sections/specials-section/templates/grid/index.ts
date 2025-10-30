import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { SpecialsContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Specials · Chef Highlights',
  description: 'Grid of limited-time specials with quick context and view-all CTA.',
  recommendedUse: ['Landing mid-page trust', 'Seasonal promotions'],
  tags: ['specials', 'grid', 'promotions'],
});

export const load: SectionVariantLoader<SpecialsContent> = async () => ({
  default: (await import('./SpecialsGrid')).default,
});

export { default as SpecialsGrid } from './SpecialsGrid';
