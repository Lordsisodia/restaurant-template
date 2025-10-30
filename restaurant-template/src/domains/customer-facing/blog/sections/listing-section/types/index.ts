import type { ComponentType } from 'react';
import type { ListingContent } from './schema';

export type ListingVariant = 'primary' | 'template-2' | 'template-3';

export interface ListingRendererProps {
  variant?: ListingVariant;
  fallbackVariant?: ListingVariant;
  content: ListingContent;
}

export type ListingComponent = ComponentType<ListingContent>;
