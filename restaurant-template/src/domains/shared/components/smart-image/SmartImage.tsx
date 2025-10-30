'use client';

import Image from 'next/image';
import { CloudinaryImage } from '../cloudinary-image';

/**
 * Smart Image Component - Works with BOTH Cloudinary AND hardcoded images
 *
 * Automatically detects source type and applies optimal lazy loading
 *
 * Examples:
 *
 * // Cloudinary (dynamic, client-specific)
 * <SmartImage src="cloudinary:restaurants/client-abc/menu/burger.jpg" alt="Burger" />
 *
 * // Hardcoded in /public (static, rarely changes)
 * <SmartImage src="/reviews/customer-1.jpg" alt="Review" />
 *
 * // External URL
 * <SmartImage src="https://example.com/image.jpg" alt="External" />
 */

interface SmartImageProps {
  /**
   * Image source:
   * - "cloudinary:path/to/image" for Cloudinary
   * - "/path/to/image.jpg" for hardcoded in /public
   * - "https://..." for external URLs
   */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: 'square' | 'video' | '4:3' | '16:9';
  /** Priority loading (disable lazy for above-fold images) */
  priority?: boolean;
  /** Fill parent container */
  fill?: boolean;
  /** Object fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export function SmartImage({
  src,
  alt,
  width = 800,
  height,
  className = '',
  aspectRatio,
  priority = false,
  fill = false,
  objectFit = 'cover',
}: SmartImageProps) {
  // Detect image type
  const isCloudinary = src.startsWith('cloudinary:');
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  // Cloudinary images
  if (isCloudinary) {
    const publicId = src.replace('cloudinary:', '');
    return (
      <CloudinaryImage
        publicId={publicId}
        alt={alt}
        width={width}
        height={height}
        className={className}
        aspectRatio={aspectRatio}
        lazy={!priority}
      />
    );
  }

  // Local or external images - use Next.js Image with lazy loading
  const aspectRatioMap = {
    square: 1,
    video: 16 / 9,
    '16:9': 16 / 9,
    '4:3': 4 / 3,
  };

  const calculatedHeight = height || (aspectRatio ? width / aspectRatioMap[aspectRatio] : undefined);

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : calculatedHeight}
      fill={fill}
      className={className}
      loading={priority ? 'eager' : 'lazy'} // ✅ Native browser lazy loading
      priority={priority}
      quality={85}
      style={{
        objectFit: fill ? objectFit : undefined,
      }}
      // External images need unoptimized or domain config
      {...(isExternal && { unoptimized: true })}
    />
  );
}

/**
 * Helper to create image source strings
 */
export const ImageSource = {
  cloudinary: (publicId: string) => `cloudinary:${publicId}`,
  local: (path: string) => path.startsWith('/') ? path : `/${path}`,
  external: (url: string) => url,
};
