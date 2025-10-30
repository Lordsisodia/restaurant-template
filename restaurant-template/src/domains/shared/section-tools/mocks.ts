export function defineSectionMocks<TVariant extends string, TData>(
  label: string,
  options: {
    defaultVariant: TVariant;
    variants: Record<TVariant, TData>;
  },
): Record<TVariant, TData> {
  const { defaultVariant, variants } = options;

  if (!variants[defaultVariant]) {
    throw new Error(
      `${label} mocks missing default variant "${defaultVariant}". Add a payload for it before registering the mocks.`,
    );
  }

  return variants;
}
