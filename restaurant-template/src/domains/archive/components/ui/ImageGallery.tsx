'use client';

/* eslint-disable */

import { CloudinaryImage } from './cloudinary-image';

/**
 * Image Gallery Component
 *
 * Displays a grid of beautiful food/restaurant images
 */

interface Image {
  id: string;
  publicId: string;
  alt: string;
}

interface ImageGalleryProps {
  title?: string;
  subtitle?: string;
  images: Image[];
  columns?: 2 | 3 | 4;
}

export function ImageGallery({
  title = 'Our Signature Dishes',
  subtitle = 'Every dish is crafted with authentic Indonesian flavors and fresh ingredients',
  images,
  columns = 3,
}: ImageGalleryProps) {
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

      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-2xl bg-muted shadow-md transition-all hover:shadow-xl"
          >
            <div className="aspect-square">
              <CloudinaryImage
                publicId={image.publicId}
                alt={image.alt}
                width={600}
                aspectRatio="square"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
