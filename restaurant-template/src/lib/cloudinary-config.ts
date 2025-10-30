/**
 * Cloudinary Image Configuration & Editing Presets
 *
 * This file contains all image transformation presets for easy image editing
 * No need to manually edit images - just apply presets!
 */

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ddfgfpelo',

  // Image folder organization
  folders: {
    portfolio: 'restaurant/portfolio',
    menu: 'restaurant/menu',
    team: 'restaurant/team',
    hero: 'restaurant/hero',
    gallery: 'restaurant/gallery',
  }
};

/**
 * 🎨 IMAGE EDITING PRESETS
 * Apply these to automatically transform images
 */
export const IMAGE_PRESETS = {
  // Portfolio Images
  portfolioHero: {
    width: 1200,
    height: 800,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  },

  portfolioThumbnail: {
    width: 400,
    height: 300,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  },

  // Menu Images
  menuItem: {
    width: 600,
    height: 600,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
    effect: 'sharpen:100', // Makes food look crispy!
  },

  // Team Photos
  teamMember: {
    width: 400,
    height: 400,
    crop: 'fill',
    gravity: 'face', // Auto-centers on faces
    quality: 'auto',
    format: 'auto',
  },

  // Hero Images
  heroFull: {
    width: 1920,
    height: 1080,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  },

  // Gallery Grid
  gallerySquare: {
    width: 500,
    height: 500,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  },
};

/**
 * 🎨 ADVANCED EDITING EFFECTS
 * Apply filters and effects to your images
 */
export const IMAGE_EFFECTS = {
  // Color adjustments
  vibrant: { effect: 'vibrance:30' },
  warm: { effect: 'tint:50:red:yellow' },
  cool: { effect: 'tint:50:blue:green' },
  vintage: { effect: 'sepia:50' },
  blackAndWhite: { effect: 'grayscale' },

  // Enhancement
  sharpen: { effect: 'sharpen:100' },
  blur: { effect: 'blur:300' },
  brightness: { effect: 'brightness:20' },
  contrast: { effect: 'contrast:20' },

  // Artistic
  cartoonify: { effect: 'cartoonify' },
  oilPaint: { effect: 'oil_paint:50' },
  pixelate: { effect: 'pixelate:20' },

  // Overlays
  vignette: { effect: 'vignette' },
  gradient: { overlay: 'gradient_fade:symmetric' },
};

/**
 * Helper function to combine presets and effects
 */
export function combineTransformations(preset: keyof typeof IMAGE_PRESETS, effect?: keyof typeof IMAGE_EFFECTS) {
  const basePreset = IMAGE_PRESETS[preset];
  const appliedEffect = effect ? IMAGE_EFFECTS[effect] : {};

  return {
    ...basePreset,
    ...appliedEffect,
  };
}
