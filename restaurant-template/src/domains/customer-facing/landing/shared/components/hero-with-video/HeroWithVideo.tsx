'use client';

import { useState, useEffect } from 'react';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

/**
 * Hero Section with Optional Video Background
 *
 * Features:
 * - Video background (if provided)
 * - Fallback to beautiful image
 * - Mobile: Shows image (saves bandwidth)
 * - Auto WebP for images
 */

interface HeroWithVideoProps {
  title: string;
  subtitle: string;
  videoUrl?: string;
  imageUrl?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function HeroWithVideo({
  title,
  subtitle,
  videoUrl,
  imageUrl = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80',
  ctaPrimary,
  ctaSecondary,
}: HeroWithVideoProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldShowVideo = videoUrl && !isMobile;

  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Media */}
      {shouldShowVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster={imageUrl}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/95 sm:text-2xl">
            {subtitle}
          </p>

          {/* Call-to-Actions */}
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              {ctaPrimary && (
                <Button
                  asChild
                  size="lg"
                  className="bg-white px-8 py-6 text-lg font-semibold text-black shadow-xl hover:bg-white/90 hover:shadow-2xl"
                >
                  <a href={ctaPrimary.href}>{ctaPrimary.label}</a>
                </Button>
              )}
              {ctaSecondary && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white shadow-xl hover:bg-white/10"
                >
                  <a href={ctaSecondary.href}>{ctaSecondary.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <svg
            className="h-8 w-8 text-white/80"
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
