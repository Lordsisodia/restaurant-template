"use client";

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Playfair_Display, Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
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

      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-6 pb-16 pt-24 text-center md:pb-20 md:pt-32">
        <div className="max-w-3xl text-white">
          <div className="flex flex-col items-center gap-4 md:gap-5">
            {pillText && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                <Sparkles className="h-4 w-4" />
                <span>{pillText}</span>
              </div>
            )}

            <h1
              className={cn(
                'relative mx-auto inline-block text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white md:text-[3.1rem] lg:text-[3.75rem]',
                playfair.className
              )}
            >
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  {title ?? 'About Us'}
                </span>
                <span className="absolute -bottom-3 left-0 hidden h-[3px] w-full rounded-full bg-gradient-to-r from-white/70 via-primary/60 to-white/70 md:block" />
              </span>
            </h1>

            {subtitle && (
              <p
                className={cn(
                  'max-w-2xl text-base font-medium text-white/85 md:text-lg',
                  manrope.className
                )}
              >
                {subtitle}
              </p>
            )}

            {description && (
              <p
                className={cn(
                  'max-w-2xl text-sm leading-relaxed text-white/70 md:text-base',
                  manrope.className
                )}
              >
                {description}
              </p>
            )}
          </div>

          <div className="mt-12 animate-bounce md:mt-14">
            <div className="mx-auto h-10 w-6 rounded-full border-2 border-white/40">
              <div className="mt-2 mx-auto h-2 w-1 rounded-full bg-white/55 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
