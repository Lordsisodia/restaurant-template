import { AnimatedText } from '@/domains/shared/components/animated-text';
import type { HeroContent } from '../../types/schema';

export default function HeroAnimatedText({ title, subtitle }: HeroContent) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto max-w-6xl text-center">
        <AnimatedText
          text={title}
          textClassName="text-5xl md:text-7xl font-extrabold"
          underlineGradient="from-primary via-purple-500 to-pink-500"
          underlineHeight="h-[3px]"
          underlineOffset="mt-2"
          className="mb-8"
        />
        {subtitle ? (
          <p className="mt-12 mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
