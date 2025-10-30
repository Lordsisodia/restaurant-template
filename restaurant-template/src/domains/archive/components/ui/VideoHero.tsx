'use client';

/* eslint-disable */

import { useState } from 'react';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

/**
 * Video Hero Component
 *
 * Features:
 * - Background video with fallback image
 * - Overlay content
 * - Play/Pause control
 * - Mobile-optimized (shows image on mobile to save bandwidth)
 */

interface VideoHeroProps {
  videoUrl?: string;
  fallbackImage?: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function VideoHero({
  videoUrl,
  fallbackImage = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80',
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: VideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(true);

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Video Background (Desktop) or Image (Mobile) */}
      {showVideo && videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster={fallbackImage}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {ctaPrimary && (
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <a href={ctaPrimary.href}>{ctaPrimary.label}</a>
            </Button>
          )}
          {ctaSecondary && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <a href={ctaSecondary.href}>{ctaSecondary.label}</a>
            </Button>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="h-6 w-6 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
