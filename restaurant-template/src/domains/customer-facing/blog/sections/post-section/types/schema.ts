import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const postContentZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  category: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  readTimeMinutes: z.number().int().positive().nullable().optional(),
  backLinkHref: z.string().optional(),
  backLinkLabel: z.string().optional(),
});

export const postContentSchema = createSectionSchema(postContentZodSchema);

export type PostContentInput = z.input<typeof postContentZodSchema>;
export type PostContent = z.output<typeof postContentZodSchema>;
