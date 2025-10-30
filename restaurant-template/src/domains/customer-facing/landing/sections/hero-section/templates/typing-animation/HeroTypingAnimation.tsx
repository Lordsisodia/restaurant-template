import { TypingAnimation } from '@/components/ui/typing-animation';
import type { HeroContent } from '../../types/schema';

export default function HeroTypingAnimation({ title, subtitle }: HeroContent) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto max-w-6xl text-center">
        <TypingAnimation
          text={title}
          className="mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl"
        />
        {subtitle ? (
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
