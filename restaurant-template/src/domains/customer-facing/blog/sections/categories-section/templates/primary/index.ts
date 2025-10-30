import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { CategoriesContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Categories · Primary',
  description: 'Filter pill row with active state styling.',
  recommendedUse: ['Blog landing page'],
  tags: ['categories', 'filters'],
});

export const load: SectionVariantLoader<CategoriesContent> = async () => ({
  default: (await import('./CategoriesPrimary')).default,
});

export { default as CategoriesPrimary } from './CategoriesPrimary';
