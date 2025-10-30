import type { CategoriesVariant, CategoriesComponent } from './types';
import type { CategoriesContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as CategoriesPrimaryMetadata, CategoriesPrimary } from './templates/primary';
import { metadata as CategoriesTemplate2Metadata, CategoriesTemplate2 } from './templates/template-2';
import { metadata as CategoriesTemplate3Metadata, CategoriesTemplate3 } from './templates/template-3';

export const categoriesRegistry = createSectionRegistry<CategoriesVariant, CategoriesContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: CategoriesPrimaryMetadata.name,
      description: CategoriesPrimaryMetadata.description,
      screenshot: CategoriesPrimaryMetadata.screenshot,
      tags: CategoriesPrimaryMetadata.tags,
      load: async () => ({ default: CategoriesPrimary }),
    },
    'template-2': {
      label: CategoriesTemplate2Metadata.name,
      description: CategoriesTemplate2Metadata.description,
      screenshot: CategoriesTemplate2Metadata.screenshot,
      tags: CategoriesTemplate2Metadata.tags,
      load: async () => ({ default: CategoriesTemplate2 }),
    },
    'template-3': {
      label: CategoriesTemplate3Metadata.name,
      description: CategoriesTemplate3Metadata.description,
      screenshot: CategoriesTemplate3Metadata.screenshot,
      tags: CategoriesTemplate3Metadata.tags,
      load: async () => ({ default: CategoriesTemplate3 }),
    },
  },
});

const components: Record<CategoriesVariant, CategoriesComponent> = {
  'primary': CategoriesPrimary,
  'template-2': CategoriesTemplate2,
  'template-3': CategoriesTemplate3,
};

export function getCategoriesVariant(variant: string | undefined): CategoriesVariant {
  return resolveVariant(variant, categoriesRegistry);
}

export function getCategoriesComponent(variant: CategoriesVariant) {
  return components[variant];
}

export function listCategoriesVariants() {
  return listVariants(categoriesRegistry);
}
