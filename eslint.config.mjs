import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

const reactRecommended = reactPlugin.configs.recommended ?? {};
const reactHooksRecommended = reactHooksPlugin.configs.recommended ?? {};
const jsxA11yRecommended = jsxA11yPlugin.configs.recommended ?? {};
const nextRecommended = nextPlugin.configs.recommended ?? {};

const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
};

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'bmad-method/**', 'supabase/**', 'docs/**', 'public/**', 'src/domains/archive/**'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['src/domains/archive/**', '**/src/domains/archive/**'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: sharedGlobals,
    },
    plugins: {
      '@next/next': nextPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...(js.configs.recommended.rules ?? {}),
      ...(reactRecommended.rules ?? {}),
      ...(reactHooksRecommended.rules ?? {}),
      ...(jsxA11yRecommended.rules ?? {}),
      ...(nextRecommended.rules ?? {}),
      'no-undef': 'off',
      'import/no-anonymous-default-export': 'warn',
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'react/jsx-no-target-blank': 'off',
    },
  },
];
