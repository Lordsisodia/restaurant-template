"use client";

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Playfair_Display, Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import { TextRotate } from '@/components/ui/text-rotate';
import type { HeroContent } from '../../types/schema';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function HeroPrimary({
  title = 'About Us',
  subtitle = 'Our Story, Our Passion',
  description,
  imageUrl = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop',
  pillText = 'Discover Our Journey',
}: HeroContent) {
  const rotatingHighlights = [
    'Strong Coffee Rituals',
    'Late-Night Vinyl Sets',
    'Balinese Hospitality',
    'Signature Nasi Bakar',
  ];

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={title ?? 'About Us hero image'}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={90}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center">
        <div className="max-w-3xl text-white">
          {pillText && (
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.25)] md:mb-3">
              <Sparkles className="h-4 w-4" />
              <span>{pillText}</span>
            </div>
          )}

          <div className={cn('mb-6 flex justify-center text-center text-4xl font-semibold md:text-5xl', playfair.className)}>
            <TextRotate
              texts={rotatingHighlights}
              mainClassName="gap-2"
              elementLevelClassName="tracking-tight"
              splitBy="words"
              rotationInterval={2600}
              staggerDuration={0.04}
              staggerFrom="first"
              initial={{ y: '120%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
            />
          </div>

          <div className="mx-auto max-w-2xl">
            <h1
              className={cn(
                'relative mx-auto inline-block text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-[4.25rem] lg:text-[5rem]',
                playfair.className
              )}
            >
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  {title ?? 'About Us'}
                </span>
                <span className="absolute -bottom-2 left-0 hidden h-[3px] w-full rounded-full bg-gradient-to-r from-white/80 via-primary/70 to-white/80 md:block" />
              </span>
            </h1>
          </div>

          {subtitle && (
            <p
              className={cn(
                'mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg',
                manrope.className
              )}
            >
              {subtitle}
            </p>
          )}

          {description && (
            <p className={cn('mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base', manrope.className)}>
              {description}
            </p>
          )}

          <div className="mt-12 animate-bounce">
            <div className="mx-auto h-10 w-6 rounded-full border-2 border-white/40">
              <div className="mt-2 mx-auto h-2 w-1 rounded-full bg-white/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
