// Theme tokens drive CSS variables (see globals.css).
// Kebab-case CSS vars (e.g. --color-primary-foreground) are derived from camelCase keys
// by AppProviders (primaryForeground -> --color-primary-foreground).
export const defaultThemeTokens = {
  color: {
    // Brand
    primary: '#2E7D32',
    primaryForeground: '#FFFFFF',
    secondary: '#FF7043',
    // Surfaces & text
    background: '#F8F9FB',
    foreground: '#111827',
    muted: '#F1F5F9',
    mutedForeground: '#475569',
    // UI chrome
    border: '#E2E8F0',
    input: '#CBD5F5',

    // Back-compat aliases (mapped in AppProviders)
    surface: '#FFFFFF',
    text: '#111827',
  },
} as const;

export type ThemeTokens = typeof defaultThemeTokens;
