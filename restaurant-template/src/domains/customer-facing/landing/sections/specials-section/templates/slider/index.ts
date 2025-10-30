import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { SpecialsContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Specials · Signature Slider',
  description: 'Auto-sliding showcase for specialty drinks or featured items.',
  recommendedUse: ['Hero-adjacent carousel', 'Seasonal beverage spotlight'],
  tags: ['specials', 'slider', 'carousel'],
});

export const load: SectionVariantLoader<SpecialsContent> = async () => ({
  default: (await import('./SpecialsSlider')).default,
});

export { default as SpecialsSlider } from './SpecialsSlider';
