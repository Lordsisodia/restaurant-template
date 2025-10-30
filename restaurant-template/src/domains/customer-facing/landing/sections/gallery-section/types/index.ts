import type { ComponentType } from 'react';
import type { GalleryContent } from './schema';

export type GalleryVariant = 'grid';

export interface GalleryRendererProps {
  variant?: GalleryVariant;
  content: GalleryContent;
  fallbackVariant?: GalleryVariant;
}

export type GalleryComponent = ComponentType<GalleryContent>;
