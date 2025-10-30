import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const highlightSchema = z.object({
  icon: z.enum(['sparkles', 'heart', 'clock']).optional(),
  label: z.string(),
});

const storyImageSchema = z.object({
  src: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

export const storyContentZodSchema = z.object({
  title: z.string().optional(),
  story: z.string(),
  imageUrl: z.string().url().optional(),
  images: z.array(storyImageSchema).optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  highlights: z.array(highlightSchema).optional(),
  useCarousel: z.boolean().optional(),
});

export const storyContentSchema = createSectionSchema(storyContentZodSchema);

export type StoryContentInput = z.input<typeof storyContentZodSchema>;
export type StoryContent = z.output<typeof storyContentZodSchema>;
