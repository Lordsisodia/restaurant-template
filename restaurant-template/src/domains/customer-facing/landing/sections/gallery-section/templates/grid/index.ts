import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { GalleryContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Gallery · Mini Mosaic',
  description: 'Responsive 3-column mosaic highlighting venue/food imagery.',
  recommendedUse: ['Visual credibility near hero', 'Event photography highlight'],
  tags: ['gallery', 'imagery', 'grid'],
});

export const load: SectionVariantLoader<GalleryContent> = async () => ({
  default: (await import('./GalleryGrid')).default,
});

export { default as GalleryGrid } from './GalleryGrid';
