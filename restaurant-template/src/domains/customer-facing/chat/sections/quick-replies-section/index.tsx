import type { QuickRepliesRendererProps } from './types';
import type { QuickRepliesVariant } from './types';
import type { QuickRepliesContent } from './types/schema';
import { quickRepliesRegistry, getQuickRepliesVariant, getQuickRepliesComponent, listQuickRepliesVariants } from './registry';

export * from './types';
export { quickRepliesRegistry, listQuickRepliesVariants };

export function QuickRepliesRenderer({ variant, fallbackVariant, content }: QuickRepliesRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getQuickRepliesVariant(requested);
  const Component = getQuickRepliesComponent(resolved);
  return <Component {...content} />;
}

export function renderQuickReplies({ variant, fallbackVariant, content }: QuickRepliesRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getQuickRepliesVariant(requested);
  const Component = getQuickRepliesComponent(resolved);
  return <Component {...content} />;
}

export function getQuickRepliesVariants(): Array<{ key: QuickRepliesVariant; label: string; description: string }> {
  return listQuickRepliesVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { QuickRepliesContent };
