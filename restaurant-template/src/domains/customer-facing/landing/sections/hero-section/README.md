# Hero Section Architecture

Scaffolded with `pnpm scaffold:section landing hero-section` and wired to the historic landing hero variants. Each variant now lives in `templates/<variant>/` with metadata, story, and registry support.

- `index.tsx` – public API (renderer, helpers, types).
- `registry.ts` – variant registry metadata and component map.
- `types/` – Zod schema + TypeScript types shared by all variants.
- `data/mock.ts` – Storybook/test payloads.
- `shared/` – reusable atoms/hooks/utils for the section.
- `templates/<variant>/` – variant implementations plus metadata and README.
- `stories/` – Storybook stories rendering every variant from mocks.
- `tests/` – smoke tests for registry wiring.

### Data contract (`HeroContent`)

```ts
{
  title: string;
  subtitle?: string;
  imageUrl?: string;
  images?: string[];
  logoUrl?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  words?: [string, string, string];
  videoUrl?: string;
  useAnimatedHeadline?: boolean;
}
```

Variants implemented: `primary`, `classic-center`, `gradient-words`, `logo-center`, `minimal-center`, `split-left`, `video-overlay`, `animated-text`, `typewriter`, `blur-fade`, `flip-words`, `typing-animation`, `magic-reveal`, `reveal-text`, `samsung-effect`.

See `docs/domains/section-architecture.md` for the full playbook.
