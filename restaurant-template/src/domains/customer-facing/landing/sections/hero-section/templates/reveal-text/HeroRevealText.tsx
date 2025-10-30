import { RevealText } from '@/components/ui/reveal-text';
import type { HeroContent } from '../../types/schema';

export default function HeroRevealText({ title, subtitle }: HeroContent) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto flex max-w-6xl flex-col items-center text-center">
        <RevealText
          text={title}
          textColor="text-primary"
          overlayColor="text-purple-500"
          fontSize="text-6xl md:text-8xl"
          className="mb-8"
        />
        {subtitle ? (
          <p className="mx-auto mt-12 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        ) : null}
        <p className="mt-4 text-sm text-muted-foreground/60">Hover over the text</p>
      </div>
    </section>
  );
}
