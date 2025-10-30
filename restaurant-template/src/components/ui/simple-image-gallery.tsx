'use client';

import Image from 'next/image';

/**
 * Simple Image Gallery using Next.js Image Optimization
 *
 * Uses Unsplash photos temporarily (free tier friendly)
 * No Cloudinary needed - uses Next.js built-in optimization
 */

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface SimpleImageGalleryProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function SimpleImageGallery({
  title = 'Our Signature Dishes',
  subtitle = 'Every dish is crafted with authentic Indonesian flavors and fresh ingredients',
  images,
  columns = 3,
}: SimpleImageGalleryProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-16">
      <div className="space-y-3 text-center">
        <h2 className="text-4xl font-bold text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>

      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-2xl bg-muted shadow-lg transition-all hover:shadow-2xl"
          >
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-lg font-semibold text-white">{image.alt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
