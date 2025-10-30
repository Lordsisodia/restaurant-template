import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const specialItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  tag: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.string().url().nullable().optional(),
  price: z.number().nonnegative().optional(),
  priceFormatted: z.string().optional(),
  cta: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),
});

export const specialsContentZodSchema = z.object({
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  viewAllHref: z.string().optional(),
  viewMenuHref: z.string().optional(),
  layout: z.enum(['grid', 'slider']).optional(),
  items: z.array(specialItemSchema),
});

export const specialsContentSchema = createSectionSchema(specialsContentZodSchema);

export type SpecialsContentInput = z.input<typeof specialsContentZodSchema>;
export type SpecialsContent = z.output<typeof specialsContentZodSchema>;
