'use client';

/**
 * React Hook for Cloudinary Uploads
 *
 * Usage:
 * const { upload, uploading, progress } = useCloudinaryUpload();
 * await upload(file, { clientId: 'abc', category: 'menu' });
 */

import { useState } from 'react';

interface UploadOptions {
  clientId: string;
  category?: 'menu' | 'hero' | 'gallery' | 'team' | 'logo';
  subcategory?: string;
}

interface UploadResult {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (
    file: File,
    options: UploadOptions
  ): Promise<UploadResult | null> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('clientId', options.clientId);
      if (options.category) formData.append('category', options.category);
      if (options.subcategory) formData.append('subcategory', options.subcategory);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      const result = await new Promise<UploadResult>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });

      setProgress(100);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (publicId: string) => {
    setError(null);
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) throw new Error('Delete failed');

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
      return false;
    }
  };

  const listImages = async (
    clientId: string,
    category?: string,
    subcategory?: string
  ) => {
    setError(null);
    try {
      const params = new URLSearchParams({
        clientId,
        ...(category && { category }),
        ...(subcategory && { subcategory }),
      });

      const response = await fetch(`/api/upload?${params}`);
      if (!response.ok) throw new Error('Failed to list images');

      const data = await response.json();
      return data.images;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to list images';
      setError(message);
      return [];
    }
  };

  return {
    upload,
    deleteImage,
    listImages,
    uploading,
    progress,
    error,
  };
}
