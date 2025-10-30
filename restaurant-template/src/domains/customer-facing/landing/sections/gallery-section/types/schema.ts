import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const galleryContentZodSchema = z.object({
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()).min(1),
  layout: z.enum(['grid']).optional(),
});

export const galleryContentSchema = createSectionSchema(galleryContentZodSchema);

export type GalleryContentInput = z.input<typeof galleryContentZodSchema>;
export type GalleryContent = z.output<typeof galleryContentZodSchema>;
