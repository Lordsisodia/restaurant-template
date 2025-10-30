import type { SpecialsRendererProps } from './types';
import type { SpecialsVariant } from './types';
import type { SpecialsContent } from './types/schema';
import { specialsRegistry, getSpecialsVariant, getSpecialsComponent, listSpecialsVariants } from './registry';

export * from './types';
export { specialsRegistry, listSpecialsVariants };

export function SpecialsRenderer({ variant, fallbackVariant, content }: SpecialsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getSpecialsVariant(requested);
  const Component = getSpecialsComponent(resolved);
  return <Component {...content} />;
}

export function renderSpecials({ variant, fallbackVariant, content }: SpecialsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getSpecialsVariant(requested);
  const Component = getSpecialsComponent(resolved);
  return <Component {...content} />;
}

export function getSpecialsVariants(): Array<{ key: SpecialsVariant; label: string; description: string }> {
  return listSpecialsVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { SpecialsContent };
