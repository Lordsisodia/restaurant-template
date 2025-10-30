import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const categorySchema = z.object({
  key: z.string(),
  label: z.string(),
  count: z.number().int().nonnegative().optional(),
  pillText: z.string().optional(),
});

export const categoriesContentZodSchema = z.object({
  categories: z.array(categorySchema),
  activeCategoryKey: z.string().optional(),
  label: z.string().optional(),
});

export const categoriesContentSchema = createSectionSchema(categoriesContentZodSchema);

export type CategoriesContentInput = z.input<typeof categoriesContentZodSchema>;
export type CategoriesContent = z.output<typeof categoriesContentZodSchema>;
export type CategoryOption = z.output<typeof categorySchema>;
