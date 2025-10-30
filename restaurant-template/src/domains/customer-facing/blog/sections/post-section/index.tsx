import type { PostRendererProps, PostVariant } from './types';
import type { PostContent } from './types/schema';
import { postRegistry, getPostVariant, getPostComponent, listPostVariants } from './registry';

export * from './types';
export { postRegistry, listPostVariants };

export function PostRenderer({ variant, fallbackVariant, content }: PostRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getPostVariant(requested);
  const Component = getPostComponent(resolved);
  return <Component {...content} />;
}

export function renderPost(props: PostRendererProps) {
  const requested = props.variant ?? props.fallbackVariant;
  const resolved = getPostVariant(requested);
  const Component = getPostComponent(resolved);
  return <Component {...props.content} />;
}

export function getPostVariants(): Array<{ key: PostVariant; label: string; description: string }> {
  return listPostVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { PostContent };
