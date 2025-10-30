import type { ComponentType } from 'react';
import type { StoryContent } from './schema';

export type StoryVariant = 'primary';

export interface StoryRendererProps {
  variant?: StoryVariant;
  content: StoryContent;
  fallbackVariant?: StoryVariant;
}

export type StoryComponent = ComponentType<StoryContent>;
