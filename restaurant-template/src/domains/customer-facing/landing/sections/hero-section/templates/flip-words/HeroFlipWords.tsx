import { FlipWords } from '@/components/ui/flip-words';
import type { HeroContent } from '../../types/schema';

export default function HeroFlipWords({ title, subtitle, words }: HeroContent) {
  const displayWords = words && words.length === 3 ? words : ['Delicious', 'Fresh', 'Amazing'];

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="mb-8 text-4xl font-extrabold md:text-6xl">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{title}</span>
          <br />
          <FlipWords words={displayWords} className="text-5xl md:text-7xl" />
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
