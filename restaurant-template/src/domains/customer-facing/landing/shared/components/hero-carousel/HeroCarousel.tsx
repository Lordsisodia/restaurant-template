'use client';

import { useEffect, useState } from 'react';

import { ImageWithFallback } from '../image-with-fallback';

interface HeroCarouselProps {
  images: string[];
  interval?: number; // milliseconds, default 6000 (6 seconds)
  alt?: string;
}

export function HeroCarousel({ images, interval = 6000, alt = 'Hero' }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('HeroCarousel: images array:', images);
    console.log('HeroCarousel: images.length:', images.length);

    if (images.length <= 1) {
      console.log('HeroCarousel: Not enough images for carousel, need more than 1');
      return;
    }

    console.log('HeroCarousel: Starting carousel with', images.length, 'images, interval:', interval);

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        console.log('HeroCarousel: Rotating from', prevIndex, 'to', nextIndex);
        return nextIndex;
      });
    }, interval);

    return () => {
      console.log('HeroCarousel: Cleaning up carousel');
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 -z-10">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ImageWithFallback
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
    </div>
  );
}
