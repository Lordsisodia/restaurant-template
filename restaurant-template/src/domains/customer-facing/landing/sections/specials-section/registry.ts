import type { SpecialsVariant } from './types';
import type { SpecialsContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as SpecialsGridMetadata, SpecialsGrid } from './templates/grid';
import { metadata as SpecialsSliderMetadata, SpecialsSlider } from './templates/slider';

export const specialsRegistry = createSectionRegistry<SpecialsVariant, SpecialsContent>({
  defaultVariant: 'grid',
  variants: {
    'grid': {
      label: SpecialsGridMetadata.name,
      description: SpecialsGridMetadata.description,
      screenshot: SpecialsGridMetadata.screenshot,
      tags: SpecialsGridMetadata.tags,
      load: async () => ({ default: SpecialsGrid }),
    },
    'slider': {
      label: SpecialsSliderMetadata.name,
      description: SpecialsSliderMetadata.description,
      screenshot: SpecialsSliderMetadata.screenshot,
      tags: SpecialsSliderMetadata.tags,
      load: async () => ({ default: SpecialsSlider }),
    },
  },
});

const components: Record<SpecialsVariant, (props: SpecialsContent) => JSX.Element> = {
  'grid': SpecialsGrid,
  'slider': SpecialsSlider,
};

export function getSpecialsVariant(variant: string | undefined): SpecialsVariant {
  return resolveVariant(variant, specialsRegistry);
}

export function getSpecialsComponent(variant: SpecialsVariant) {
  return components[variant];
}

export function listSpecialsVariants() {
  return listVariants(specialsRegistry);
}
