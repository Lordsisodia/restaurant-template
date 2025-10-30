/**
 * Cloudinary Multi-Client Upload System
 *
 * Handles per-client folder organization and automatic metadata tracking
 */

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  clientId: string;
  category?: 'menu' | 'hero' | 'gallery' | 'team' | 'logo';
  subcategory?: string;
  tags?: string[];
}

/**
 * Generate folder path for client images
 */
export function getClientFolder(clientId: string, category?: string, subcategory?: string) {
  let folder = `restaurants/client-${clientId}`;
  if (category) folder += `/${category}`;
  if (subcategory) folder += `/${subcategory}`;
  return folder;
}

/**
 * Upload image to client-specific folder
 */
export async function uploadToCloudinary(
  file: File | string, // File object or base64
  options: UploadOptions
) {
  const { clientId, category, subcategory, tags = [] } = options;

  const folder = getClientFolder(clientId, category, subcategory);

  try {
    // Convert File to base64 if needed
    let uploadSource: string;
    if (typeof file === 'string') {
      uploadSource = file;
    } else {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      uploadSource = `data:${file.type};base64,${base64}`;
    }

    const result = await cloudinary.uploader.upload(uploadSource, {
      folder,
      tags: [
        `client:${clientId}`,
        category && `category:${category}`,
        subcategory && `subcategory:${subcategory}`,
        ...tags,
      ].filter(Boolean),
      // Auto-optimize uploads
      format: 'auto',
      quality: 'auto',
      // Generate responsive breakpoints
      responsive_breakpoints: {
        create_derived: true,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1200,
        max_images: 5,
      },
      // Add metadata
      context: {
        client_id: clientId,
        category: category || '',
        uploaded_at: new Date().toISOString(),
      },
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * List all images for a client
 */
export async function listClientImages(
  clientId: string,
  category?: string,
  subcategory?: string
) {
  const folder = getClientFolder(clientId, category, subcategory);

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 500,
      context: true,
      tags: true,
    });

    return result.resources.map((resource: any) => ({
      publicId: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      createdAt: resource.created_at,
      tags: resource.tags,
      context: resource.context,
    }));
  } catch (error) {
    console.error('Failed to list images:', error);
    return [];
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete image:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Delete entire client folder (use with caution!)
 */
export async function deleteClientFolder(clientId: string) {
  const folder = getClientFolder(clientId);

  try {
    // Delete all resources in folder
    await cloudinary.api.delete_resources_by_prefix(folder);
    // Delete the folder itself
    await cloudinary.api.delete_folder(folder);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete client folder:', error);
    throw new Error('Failed to delete client folder');
  }
}

/**
 * Get folder stats (image count, total size)
 */
export async function getClientFolderStats(clientId: string) {
  const folder = getClientFolder(clientId);

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 500,
    });

    const totalBytes = result.resources.reduce(
      (sum: number, r: any) => sum + r.bytes,
      0
    );

    return {
      count: result.resources.length,
      totalBytes,
      totalMB: (totalBytes / 1024 / 1024).toFixed(2),
    };
  } catch (error) {
    console.error('Failed to get folder stats:', error);
    return { count: 0, totalBytes: 0, totalMB: '0' };
  }
}
