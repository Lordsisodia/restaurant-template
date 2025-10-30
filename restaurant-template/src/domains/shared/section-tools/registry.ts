import type { ComponentType } from 'react';

export type SectionVariantLoader<TProps> = () => Promise<{ default: ComponentType<TProps> }>;

export interface SectionVariantConfig<TProps> {
  /** Human-readable label that appears in editors and docs. */
  label: string;
  /** Short description explaining when to pick this variant. */
  description: string;
  /** Optional path to a preview image. */
  screenshot?: string;
  /** Storybook story id or deep link for quick preview. */
  storyId?: string;
  /** Feature flags or capabilities (e.g. supportsVideo, darkMode). */
  supports?: Record<string, boolean>;
  /** Optional tags used for filtering (e.g. "minimal", "luxury"). */
  tags?: string[];
  /** Async loader that returns the React component for this variant. */
  load: SectionVariantLoader<TProps>;
}

export interface SectionRegistry<TVariant extends string, TProps> {
  defaultVariant: TVariant;
  variants: Record<TVariant, SectionVariantConfig<TProps>>;
}

export function assertVariantConfig<TProps>(
  key: string,
  config: SectionVariantConfig<TProps>,
): void {
  if (!config.label?.trim()) {
    throw new Error(`Section variant "${key}" is missing a label.`);
  }
  if (!config.description?.trim()) {
    throw new Error(`Section variant "${key}" is missing a description.`);
  }
  if (typeof config.load !== 'function') {
    throw new Error(`Section variant "${key}" must provide a load() function.`);
  }
}

export function createSectionRegistry<TVariant extends string, TProps>(
  registry: SectionRegistry<TVariant, TProps>,
): SectionRegistry<TVariant, TProps> {
  if (!registry.defaultVariant) {
    throw new Error('Section registry must define a defaultVariant.');
  }

  const entry = registry.variants[registry.defaultVariant];
  if (!entry) {
    throw new Error(
      `Default variant "${registry.defaultVariant}" is not present in the registry variants record.`,
    );
  }

  Object.entries(registry.variants).forEach(([key, value]) => assertVariantConfig(key, value));

  return registry;
}

export function resolveVariant<TVariant extends string, TProps>(
  requested: string | undefined,
  registry: SectionRegistry<TVariant, TProps>,
): TVariant {
  if (!requested) {
    return registry.defaultVariant;
  }

  return (requested in registry.variants
    ? (requested as TVariant)
    : registry.defaultVariant);
}

export function listVariants<TVariant extends string, TProps>(
  registry: SectionRegistry<TVariant, TProps>,
): Array<{ key: TVariant } & SectionVariantConfig<TProps>> {
  return (Object.entries(registry.variants) as Array<[TVariant, SectionVariantConfig<TProps>]>).map(
    ([key, value]) => ({ key, ...value }),
  );
}
