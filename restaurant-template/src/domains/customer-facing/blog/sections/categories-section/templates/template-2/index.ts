import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { CategoriesContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Categories · Template Two',
  description: 'Lightweight pill group placeholder pending final designs.',
  recommendedUse: ['Editorial blog pages'],
  tags: ['categories', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<CategoriesContent> = async () => ({
  default: (await import('./CategoriesTemplate2')).default,
});

export { default as CategoriesTemplate2 } from './CategoriesTemplate2';
