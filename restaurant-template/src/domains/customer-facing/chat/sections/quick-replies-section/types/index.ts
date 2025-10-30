import type { ComponentType } from 'react';
import type { QuickRepliesContent } from './schema';

export type QuickRepliesVariant = 'primary';

export interface QuickRepliesRendererProps {
  variant?: QuickRepliesVariant;
  content: QuickRepliesContent;
  fallbackVariant?: QuickRepliesVariant;
}

export type QuickRepliesComponent = ComponentType<QuickRepliesContent>;
