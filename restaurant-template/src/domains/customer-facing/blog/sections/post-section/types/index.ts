import type { ComponentType } from 'react';
import type { PostContent } from './schema';

export type PostVariant = 'primary' | 'template-2' | 'template-3';

export interface PostRendererProps {
  variant?: PostVariant;
  fallbackVariant?: PostVariant;
  content: PostContent;
}

export type PostComponent = ComponentType<PostContent>;
