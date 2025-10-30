#!/usr/bin/env node
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'src/domains/shared/components';

async function main() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const violations = entries
    .filter((entry) => entry.isFile() && entry.name !== 'index.ts')
    .map((entry) => entry.name);

  if (violations.length > 0) {
    console.error('\u274c Shared components root contains files without folders:');
    for (const name of violations) {
      console.error(`  - ${join(ROOT, name)}`);
    }
    process.exit(1);
  }

  console.log('\u2705 Shared components root is folderized.');
}

main().catch((error) => {
  console.error('Failed to validate shared components structure:', error);
  process.exit(1);
});
