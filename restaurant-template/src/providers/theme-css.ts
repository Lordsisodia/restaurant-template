import type { ThemeTokens } from '@/providers/TenantProvider';

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Creates a flat map of CSS variable names to string values from the provided theme tokens.
 * The keys are prefixed with `--color-` to match the variables consumed in Tailwind/CSS.
 */
export function getThemeCssVariables(theme: ThemeTokens) {
  const colors = (theme?.color ?? {}) as Record<string, unknown>;

  const entries = Object.entries(colors).map(([key, raw]) => [
    `--color-${toKebabCase(key)}`,
    String(raw),
  ]);

  const variables: Record<string, string> = Object.fromEntries(entries);

  // Back-compat aliases: older configs may only provide surface/text keys.
  if ('surface' in colors && !('background' in colors)) {
    variables['--color-background'] = String(colors.surface);
  }
  if ('text' in colors && !('foreground' in colors)) {
    variables['--color-foreground'] = String(colors.text);
  }

  return variables;
}

export type ThemeCssVariables = ReturnType<typeof getThemeCssVariables>;
