import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const dishSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.number().nonnegative().optional(),
  priceFormatted: z.string().optional(),
  imageUrl: z.string().url().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  isSpecial: z.boolean().optional(),
  prepTime: z.number().int().positive().optional(),
  servingSize: z.string().optional(),
});

export const menuContentZodSchema = z.object({
  items: z.array(dishSchema),
  maxItems: z.number().int().positive().optional(),
  deliveryLink: z.string().optional(),
  viewAllHref: z.string().optional(),
});

export const menuContentSchema = createSectionSchema(menuContentZodSchema);

export type MenuContentInput = z.input<typeof menuContentZodSchema>;
export type MenuContent = z.output<typeof menuContentZodSchema>;
