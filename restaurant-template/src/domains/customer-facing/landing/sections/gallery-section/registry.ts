import type { GalleryVariant } from './types';
import type { GalleryContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as GalleryGridMetadata, GalleryGrid } from './templates/grid';

export const galleryRegistry = createSectionRegistry<GalleryVariant, GalleryContent>({
  defaultVariant: 'grid',
  variants: {
    'grid': {
      label: GalleryGridMetadata.name,
      description: GalleryGridMetadata.description,
      screenshot: GalleryGridMetadata.screenshot,
      tags: GalleryGridMetadata.tags,
      load: async () => ({ default: GalleryGrid }),
    },
  },
});

const components: Record<GalleryVariant, (props: GalleryContent) => JSX.Element> = {
  'grid': GalleryGrid,
};

export function getGalleryVariant(variant: string | undefined): GalleryVariant {
  return resolveVariant(variant, galleryRegistry);
}

export function getGalleryComponent(variant: GalleryVariant) {
  return components[variant];
}

export function listGalleryVariants() {
  return listVariants(galleryRegistry);
}
