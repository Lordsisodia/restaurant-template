import type { EssentialsRendererProps } from './types';
import type { EssentialsVariant } from './types';
import type { EssentialsContent } from './types/schema';
import { essentialsRegistry, getEssentialsVariant, getEssentialsComponent, listEssentialsVariants } from './registry';

export * from './types';
export { essentialsRegistry, listEssentialsVariants };

export function EssentialsRenderer({ variant, fallbackVariant, content }: EssentialsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getEssentialsVariant(requested);
  const Component = getEssentialsComponent(resolved);
  return <Component {...content} />;
}

export function renderEssentials({ variant, fallbackVariant, content }: EssentialsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getEssentialsVariant(requested);
  const Component = getEssentialsComponent(resolved);
  return <Component {...content} />;
}

export function getEssentialsVariants(): Array<{ key: EssentialsVariant; label: string; description: string }> {
  return listEssentialsVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { EssentialsContent };
