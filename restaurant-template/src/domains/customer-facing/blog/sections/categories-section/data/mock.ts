import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { CategoriesVariant } from '../types';
import type { CategoriesContent } from '../types/schema';

const baseCategories: CategoriesContent['categories'] = [
  { key: 'all', label: 'All Stories', pillText: 'FEATURED' },
  { key: 'news', label: 'News' },
  { key: 'recipes', label: 'Recipes' },
  { key: 'events', label: 'Events' },
];

export const categoriesMocks = defineSectionMocks<CategoriesVariant, CategoriesContent>('Blog Categories Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      categories: baseCategories,
      activeCategoryKey: 'all',
      label: 'Filter by',
    },
    'template-2': {
      categories: baseCategories,
      label: 'Browse topics',
    },
    'template-3': {
      categories: baseCategories.slice(0, 3),
    },
  },
});

export type CategoriesMockKey = keyof typeof categoriesMocks;
