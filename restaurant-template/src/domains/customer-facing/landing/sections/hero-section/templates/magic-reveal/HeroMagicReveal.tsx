import { MagicTextReveal } from '@/components/ui/magic-text-reveal';
import type { HeroContent } from '../../types/schema';

export default function HeroMagicReveal({ title, subtitle }: HeroContent) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto flex max-w-6xl flex-col items-center text-center">
        <MagicTextReveal
          text={title}
          fontSize={80}
          color="rgba(255, 255, 255, 1)"
          spread={50}
          speed={0.5}
          className="mb-8"
        />
        {subtitle ? (
          <p className="mx-auto mt-12 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
