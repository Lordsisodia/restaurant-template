"use client";

import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import { SectionHeading } from '@/domains/shared/components';
import type { GalleryContent } from '../../types/schema';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
  'https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80',
  'https://images.unsplash.com/photo-1523942839745-7848c839b661?w=900&q=80',
  'https://images.unsplash.com/photo-1579631384019-29d447ef1bc0?w=900&q=80',
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&q=80',
];

function withFallbackImages(primary: string[] = []) {
  const sanitized = primary.filter((url) => typeof url === 'string' && url.trim().length > 0);
  const existing = new Set(sanitized);
  const supplemented = [...sanitized];

  for (const fallback of FALLBACK_IMAGES) {
    if (supplemented.length >= 6) break;
    if (!existing.has(fallback)) {
      supplemented.push(fallback);
      existing.add(fallback);
    }
  }

  return supplemented.slice(0, 6);
}

export default function GalleryGrid({ heading, subtitle, images }: GalleryContent) {
  const items = withFallbackImages(images);
  if (!items.length) return null;

  const finalHeading = heading ?? 'Scenes from Draco';

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        pillText="Gallery"
        pillTone="dark"
        title={finalHeading}
        subtitle={subtitle}
        titleClassName="text-3xl md:text-4xl font-semibold text-foreground"
        className="mb-8 text-foreground"
        centered
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {items.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/40 bg-muted/40 shadow-sm"
          >
            <ImageWithFallback
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
