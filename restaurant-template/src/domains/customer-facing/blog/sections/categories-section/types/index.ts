import type { ComponentType } from 'react';
import type { CategoriesContent } from './schema';

export type CategoriesVariant = 'primary' | 'template-2' | 'template-3';

export interface CategoriesRendererProps {
  variant?: CategoriesVariant;
  fallbackVariant?: CategoriesVariant;
  content: CategoriesContent;
  onCategoryChange?: (categoryKey: string) => void;
}

export type CategoriesComponent = ComponentType<CategoriesContent & { onCategoryChange?: (categoryKey: string) => void }>;
