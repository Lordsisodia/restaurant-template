import type { CategoriesRendererProps, CategoriesVariant } from './types';
import type { CategoriesContent } from './types/schema';
import { categoriesRegistry, getCategoriesVariant, getCategoriesComponent, listCategoriesVariants } from './registry';

export * from './types';
export { categoriesRegistry, listCategoriesVariants };

export function CategoriesRenderer({ variant, fallbackVariant, content, onCategoryChange }: CategoriesRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getCategoriesVariant(requested);
  const Component = getCategoriesComponent(resolved);
  return <Component {...content} onCategoryChange={onCategoryChange} />;
}

export function renderCategories(props: CategoriesRendererProps) {
  const requested = props.variant ?? props.fallbackVariant;
  const resolved = getCategoriesVariant(requested);
  const Component = getCategoriesComponent(resolved);
  return <Component {...props.content} onCategoryChange={props.onCategoryChange} />;
}

export function getCategoriesVariants(): Array<{ key: CategoriesVariant; label: string; description: string }> {
  return listCategoriesVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { CategoriesContent };
export type { CategoryOption } from './types/schema';
