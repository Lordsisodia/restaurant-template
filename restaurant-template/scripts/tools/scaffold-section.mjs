#!/usr/bin/env node

import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

function usage() {
  console.error(`\nSection Scaffold\n-----------------\nUsage: pnpm scaffold:section <domain> <section> [--component=<Prefix>] [--variants=a,b,c] [--force]\n\nExamples:\n  pnpm scaffold:section about-us hero-section\n  pnpm scaffold:section menu specials-section --variants=primary,highlight\n`);
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length < 2) {
  usage();
  process.exit(1);
}

const [domainKey, sectionKey, ...optionTokens] = rawArgs;

const options = optionTokens.reduce((acc, token) => {
  if (!token.startsWith('--')) {
    return acc;
  }
  const [flag, value] = token.replace(/^--/, '').split('=');
  if (typeof value === 'undefined') {
    acc[flag] = true;
  } else {
    acc[flag] = value;
  }
  return acc;
}, {});

const projectRoot = resolve(process.cwd());
const sectionRoot = join(projectRoot, 'src', 'domains', domainKey, sectionKey);

if (!existsSync(join(projectRoot, 'src', 'domains', domainKey))) {
  console.error(`Domain "${domainKey}" not found at src/domains/${domainKey}.`);
  process.exit(1);
}

const defaultVariants = ['primary', 'template-2', 'template-3'];
const variantKeys = typeof options.variants === 'string'
  ? options.variants.split(',').map((value) => value.trim()).filter(Boolean)
  : defaultVariants;

if (variantKeys.length === 0) {
  console.error('You must supply at least one variant.');
  process.exit(1);
}

const toPascalCase = (value) => value
  .split(/[^a-zA-Z0-9]+/)
  .filter(Boolean)
  .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
  .join('');

const deriveComponentPrefix = () => {
  const trimmed = sectionKey.replace(/-(section|block|area)$/i, '');
  const derived = toPascalCase(trimmed);
  return derived || toPascalCase(sectionKey);
};

const componentPrefix = typeof options.component === 'string' && options.component.trim().length > 0
  ? options.component.trim()
  : deriveComponentPrefix();

const sectionPascal = toPascalCase(sectionKey);
const rendererName = `${componentPrefix}Renderer`;
const registryName = `${componentPrefix.charAt(0).toLowerCase()}${componentPrefix.slice(1)}Registry`;
const mocksName = `${componentPrefix.charAt(0).toLowerCase()}${componentPrefix.slice(1)}Mocks`;

const variantDefinitions = variantKeys.map((variant) => {
  const pascal = toPascalCase(variant);
  const componentName = `${componentPrefix}${pascal}`;
  const fileName = `${componentName}.tsx`;
  return {
    key: variant,
    pascal,
    componentName,
    fileName,
  };
});

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function pathRelative(target) {
  const normalizedRoot = projectRoot.endsWith('/') ? projectRoot : `${projectRoot}/`;
  if (target.startsWith(normalizedRoot)) {
    return target.slice(normalizedRoot.length);
  }
  const windowsRoot = projectRoot.replace(/\\+/g, '\\') + '\\';
  if (target.startsWith(windowsRoot)) {
    return target.slice(windowsRoot.length);
  }
  return target;
}

function writeFile(filePath, content) {
  const alreadyExists = existsSync(filePath);
  if (alreadyExists && !options.force) {
    console.log(`skip   ${pathRelative(filePath)} (exists)`);
    return;
  }

  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, 'utf8');
  console.log(`${alreadyExists ? 'update' : 'create'} ${pathRelative(filePath)}`);
}

ensureDir(sectionRoot);

const schemaContent = `import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const ${componentPrefix[0].toLowerCase()}${componentPrefix.slice(1)}ContentZodSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export const ${componentPrefix[0].toLowerCase()}${componentPrefix.slice(1)}ContentSchema = createSectionSchema(${componentPrefix[0].toLowerCase()}${componentPrefix.slice(1)}ContentZodSchema);

export type ${componentPrefix}ContentInput = z.input<typeof ${componentPrefix[0].toLowerCase()}${componentPrefix.slice(1)}ContentZodSchema>;
export type ${componentPrefix}Content = z.output<typeof ${componentPrefix[0].toLowerCase()}${componentPrefix.slice(1)}ContentZodSchema>;
`;

writeFile(join(sectionRoot, 'types', 'schema.ts'), schemaContent);

const typesIndexContent = `import type { ComponentType } from 'react';
import type { ${componentPrefix}Content } from './schema';

export type ${componentPrefix}Variant = ${variantDefinitions.map(({ key }) => `'${key}'`).join(' | ')};

export interface ${componentPrefix}RendererProps {
  variant?: ${componentPrefix}Variant;
  content: ${componentPrefix}Content;
  fallbackVariant?: ${componentPrefix}Variant;
}

export type ${componentPrefix}Component = ComponentType<${componentPrefix}Content>;
`;

writeFile(join(sectionRoot, 'types', 'index.ts'), typesIndexContent);

const dataMockContent = `import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { ${componentPrefix}Variant } from '../types';
import type { ${componentPrefix}Content } from '../types/schema';

export const ${mocksName} = defineSectionMocks<${componentPrefix}Variant, ${componentPrefix}Content>('${componentPrefix} Section', {
  defaultVariant: '${variantDefinitions[0].key}',
  variants: {
${variantDefinitions.map(({ key }) => `    '${key}': {
      title: '${componentPrefix} ${toPascalCase(key)}',
      subtitle: 'Replace with final copy',
      description: 'This is placeholder data generated by the scaffold script.',
    },`).join('\n')}
  },
});

export type ${componentPrefix}MockKey = keyof typeof ${mocksName};
`;

writeFile(join(sectionRoot, 'data', 'mock.ts'), dataMockContent);

['components', 'hooks', 'utils'].forEach((sub) => {
  writeFile(join(sectionRoot, 'shared', sub, '.gitkeep'), '');
});

writeFile(join(sectionRoot, 'data', 'fixtures', '.gitkeep'), '');

const readmeContent = `# ${componentPrefix} Section Architecture

Scaffolded with \`pnpm scaffold:section ${domainKey} ${sectionKey}\`. Update the generated files to match the section's data contract and UI.

- \`index.tsx\` – public API (renderer, helpers, types).
- \`registry.ts\` – variant registry metadata and component map.
- \`types/\` – Zod schema + TypeScript types shared by all variants.
- \`data/mock.ts\` – Storybook/test payloads.
- \`shared/\` – reusable atoms/hooks/utils for the section.
- \`templates/<variant>/\` – variant implementations plus metadata and README.
- \`stories/\` – Storybook stories rendering every variant from mocks.
- \`tests/\` – smoke tests for registry wiring.

Variants scaffolded: ${variantDefinitions.map(({ key }) => `\`${key}\``).join(', ')}.

See \`docs/domains/section-architecture.md\` for the full playbook.
`;

writeFile(join(sectionRoot, 'README.md'), readmeContent);

variantDefinitions.forEach(({ key, componentName, fileName }) => {
  const templateDir = join(sectionRoot, 'templates', key);
  ensureDir(templateDir);

  const templateComponentContent = `"use client";

import type { ${componentPrefix}Content } from '../../types/schema';

export default function ${componentName}(props: ${componentPrefix}Content) {
  const { title, subtitle, description } = props;
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {subtitle ?? '${componentPrefix} ${toPascalCase(key)}'}
        </p>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {title ?? '${componentPrefix} Template Placeholder'}
        </h1>
        {description ? (
          <p className="text-base text-muted-foreground">{description}</p>
        ) : (
          <p className="text-base text-muted-foreground">
            Replace this placeholder with the final design for the ${key} variant.
          </p>
        )}
      </div>
    </section>
  );
}
`;

  writeFile(join(templateDir, fileName), templateComponentContent);

  const templateIndexContent = `import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { ${componentPrefix}Content } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: '${componentPrefix} ${toPascalCase(key)}',
  description: 'TODO: describe when to use the ${key} variant.',
  recommendedUse: ['Draft description pending'],
  tags: ['placeholder'],
});

export const load: SectionVariantLoader<${componentPrefix}Content> = async () => ({
  default: (await import('./${fileName.replace('.tsx', '')}')).default,
});

export { default as ${componentName} } from './${fileName.replace('.tsx', '')}';
`;

  writeFile(join(templateDir, 'index.ts'), templateIndexContent);

  const templateReadmeContent = `# ${componentPrefix} Template · ${toPascalCase(key)}

- **Best for**: TODO
- **Layout**: TODO
- **Content fields**: Update once schema is final.
- **Notes**: Replace scaffold copy and styling with the approved design.
`;

  writeFile(join(templateDir, 'README.md'), templateReadmeContent);
});

const registryImports = variantDefinitions
  .map(({ key, componentName }) => `import { metadata as ${componentName}Metadata, ${componentName} } from './templates/${key}';`)
  .join('\n');

const registryContent = `import type { ${componentPrefix}Variant } from './types';
import type { ${componentPrefix}Content } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
${registryImports}

export const ${registryName} = createSectionRegistry<${componentPrefix}Variant, ${componentPrefix}Content>({
  defaultVariant: '${variantDefinitions[0].key}',
  variants: {
${variantDefinitions.map(({ key, componentName }) => `    '${key}': {
      label: ${componentName}Metadata.name,
      description: ${componentName}Metadata.description,
      screenshot: ${componentName}Metadata.screenshot,
      tags: ${componentName}Metadata.tags,
      load: async () => ({ default: ${componentName} }),
    },`).join('\n')}
  },
});

const components: Record<${componentPrefix}Variant, (props: ${componentPrefix}Content) => JSX.Element> = {
${variantDefinitions.map(({ key, componentName }) => `  '${key}': ${componentName},`).join('\n')}
};

export function get${componentPrefix}Variant(variant: string | undefined): ${componentPrefix}Variant {
  return resolveVariant(variant, ${registryName});
}

export function get${componentPrefix}Component(variant: ${componentPrefix}Variant) {
  return components[variant];
}

export function list${componentPrefix}Variants() {
  return listVariants(${registryName});
}
`;

writeFile(join(sectionRoot, 'registry.ts'), registryContent);

const indexContent = `import type { ${componentPrefix}RendererProps } from './types';
import type { ${componentPrefix}Variant } from './types';
import type { ${componentPrefix}Content } from './types/schema';
import { ${registryName}, get${componentPrefix}Variant, get${componentPrefix}Component, list${componentPrefix}Variants } from './registry';

export * from './types';
export { ${registryName}, list${componentPrefix}Variants };

export function ${rendererName}({ variant, fallbackVariant, content }: ${componentPrefix}RendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = get${componentPrefix}Variant(requested);
  const Component = get${componentPrefix}Component(resolved);
  return <Component {...content} />;
}

export function render${componentPrefix}({ variant, fallbackVariant, content }: ${componentPrefix}RendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = get${componentPrefix}Variant(requested);
  const Component = get${componentPrefix}Component(resolved);
  return <Component {...content} />;
}

export function get${componentPrefix}Variants(): Array<{ key: ${componentPrefix}Variant; label: string; description: string }> {
  return list${componentPrefix}Variants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { ${componentPrefix}Content };
`;

writeFile(join(sectionRoot, 'index.tsx'), indexContent);

const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${rendererName} } from '..';
import { ${mocksName} } from '../data/mock';

const meta: Meta<typeof ${rendererName}> = {
  title: 'Domains/${toPascalCase(domainKey)} / ${sectionPascal}',
  component: ${rendererName},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ${rendererName}>;

${variantDefinitions.map(({ key }) => `export const ${toPascalCase(key)}: Story = {
  args: {
    variant: '${key}',
    content: ${mocksName}['${key}'],
  },
};`).join('\n\n')}
`;

writeFile(join(sectionRoot, 'stories', `${componentPrefix}Section.stories.tsx`), storyContent);

const testContent = `import { describe, expect, it } from 'vitest';
import { ${registryName}, list${componentPrefix}Variants, get${componentPrefix}Variant } from '../registry';

describe('${componentPrefix} Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(${registryName}.defaultVariant).toBe('${variantDefinitions[0].key}');
  });

  it('lists all registered variants', () => {
    const keys = list${componentPrefix}Variants().map(({ key }) => key);
    expect(keys).toEqual([${variantDefinitions.map(({ key }) => `'${key}'`).join(', ')}]);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(get${componentPrefix}Variant('unknown')).toBe('${variantDefinitions[0].key}');
  });
});
`;

writeFile(join(sectionRoot, 'tests', `${sectionPascal.toLowerCase()}.spec.ts`), testContent);

console.log('\nScaffold complete. Next steps:');
console.log(`1. Update ${pathRelative(join(sectionRoot, 'types', 'schema.ts'))} with the real data contract.`);
console.log(`2. Replace placeholder copy/UI inside ${pathRelative(join(sectionRoot, 'templates'))}.`);
console.log(`3. Adjust ${pathRelative(join(sectionRoot, 'data', 'mock.ts'))} to match production data.`);
console.log('4. Run Storybook/tests to verify the new section.');
