import type { GalleryRendererProps } from './types';
import type { GalleryVariant } from './types';
import type { GalleryContent } from './types/schema';
import { galleryRegistry, getGalleryVariant, getGalleryComponent, listGalleryVariants } from './registry';

export * from './types';
export { galleryRegistry, listGalleryVariants };

export function GalleryRenderer({ variant, fallbackVariant, content }: GalleryRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getGalleryVariant(requested);
  const Component = getGalleryComponent(resolved);
  return <Component {...content} />;
}

export function renderGallery({ variant, fallbackVariant, content }: GalleryRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getGalleryVariant(requested);
  const Component = getGalleryComponent(resolved);
  return <Component {...content} />;
}

export function getGalleryVariants(): Array<{ key: GalleryVariant; label: string; description: string }> {
  return listGalleryVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { GalleryContent };
