"use client";

import { CldImage } from 'next-cloudinary';
import { IMAGE_PRESETS, IMAGE_EFFECTS, combineTransformations } from '@/lib/cloudinary-config';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  preset: keyof typeof IMAGE_PRESETS;
  effect?: keyof typeof IMAGE_EFFECTS;
  className?: string;
  priority?: boolean;
}

/**
 * 🎨 Smart Cloudinary Image Component
 *
 * AUTO-EDITING BUILT-IN!
 * Just specify a preset and optional effect - images are automatically:
 * - Cropped to perfect size
 * - Optimized for web (WebP/AVIF)
 * - Responsive across devices
 * - Lazy loaded
 * - Enhanced with filters
 *
 * @example
 * <CloudinaryImage
 *   src="food-dish-1"
 *   alt="Pasta Carbonara"
 *   preset="menuItem"
 *   effect="sharpen"
 * />
 */
export default function CloudinaryImage({
  src,
  alt,
  preset,
  effect,
  className = '',
  priority = false,
}: CloudinaryImageProps) {
  const transformations = effect
    ? combineTransformations(preset, effect)
    : IMAGE_PRESETS[preset];

  return (
    <CldImage
      src={src}
      alt={alt}
      {...transformations}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
