import { Typewriter } from '@/components/ui/typewriter-text';
import type { HeroContent } from '../../types/schema';

export default function HeroTypewriter({ title, subtitle, words }: HeroContent) {
  const displayWords = words && words.length === 3 ? words : [title];

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="mb-8 text-5xl font-extrabold md:text-7xl">
          <Typewriter
            text={displayWords}
            speed={100}
            loop
            className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          />
        </div>
        {subtitle ? (
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
