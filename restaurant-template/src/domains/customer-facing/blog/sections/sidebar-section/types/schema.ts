import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const widgetItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  description: z.string().optional(),
});

const widgetSchema = z.object({
  key: z.string(),
  title: z.string(),
  body: z.string().optional(),
  items: z.array(widgetItemSchema).optional(),
});

export const sidebarContentZodSchema = z.object({
  widgets: z.array(widgetSchema),
});

export const sidebarContentSchema = createSectionSchema(sidebarContentZodSchema);

export type SidebarContentInput = z.input<typeof sidebarContentZodSchema>;
export type SidebarContent = z.output<typeof sidebarContentZodSchema>;
export type SidebarWidget = z.output<typeof widgetSchema>;
export type SidebarWidgetItem = z.output<typeof widgetItemSchema>;
