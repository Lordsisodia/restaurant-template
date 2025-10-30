import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { CategoriesContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Categories · Template Three',
  description: 'Dark grid variant reserved for future experimentation.',
  recommendedUse: ['Concept testing'],
  tags: ['categories', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<CategoriesContent> = async () => ({
  default: (await import('./CategoriesTemplate3')).default,
});

export { default as CategoriesTemplate3 } from './CategoriesTemplate3';
