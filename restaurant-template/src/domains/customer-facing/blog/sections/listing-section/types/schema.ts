import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().optional(),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  readTimeMinutes: z.number().int().positive().optional(),
  publishedAt: z.string().optional(),
  createdAt: z.string(),
});

export const listingContentZodSchema = z.object({
  posts: z.array(postSchema),
  featuredPosts: z.array(postSchema).optional(),
  categoryGroups: z
    .array(
      z.object({
        name: z.string(),
        posts: z.array(postSchema),
      }),
    )
    .optional(),
  emptyStateTitle: z.string().optional(),
  emptyStateMessage: z.string().optional(),
});

export const listingContentSchema = createSectionSchema(listingContentZodSchema);

export type ListingContentInput = z.input<typeof listingContentZodSchema>;
export type ListingContent = z.output<typeof listingContentZodSchema>;
export type ListingPost = z.output<typeof postSchema>;
