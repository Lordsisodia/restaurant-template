import { describe, expect, it } from 'vitest';
import { sidebarRegistry, listSidebarVariants, getSidebarVariant } from '../registry';

describe('Blog Sidebar Section Registry', () => {
  it('uses the expected default variant', () => {
    expect(sidebarRegistry.defaultVariant).toBe('primary');
  });

  it('lists all variants', () => {
    const keys = listSidebarVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to default for unknown variants', () => {
    expect(getSidebarVariant('unknown')).toBe('primary');
  });
});
