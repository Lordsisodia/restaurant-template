import { BlurFade } from '@/components/ui/blur-fade';
import type { HeroContent } from '../../types/schema';

export default function HeroBlurFade({ title, subtitle }: HeroContent) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-16">
      <div className="container mx-auto max-w-6xl text-center">
        <BlurFade delay={0.25} inView>
          <h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
            {title}
          </h1>
        </BlurFade>
        {subtitle ? (
          <BlurFade delay={0.5} inView>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          </BlurFade>
        ) : null}
      </div>
    </section>
  );
}
