'use client';

/**
 * Gallery Photo Uploader
 *
 * Uploads gallery photos to Cloudinary + saves to database
 */

import { useState, type ChangeEvent } from 'react';
import { useCloudinaryUpload } from '@/domains/shared/hooks/use-cloudinary-upload';
import { SmartImage, ImageSource } from '@/domains/shared/components';

interface GalleryUploaderProps {
  clientId: string;
  onUpload?: (photo: any) => void;
}

export function GalleryUploader({ clientId, onUpload }: GalleryUploaderProps) {
  const { upload, uploading, progress, error } = useCloudinaryUpload();
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      // Upload to Cloudinary
      const result = await upload(file, {
        clientId,
        category: 'gallery',
      });

      if (result) {
        // Save to database
        try {
          const response = await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id: clientId,
              cloudinary_public_id: result.publicId,
              image_url: result.url,
            }),
          });

          if (response.ok) {
            const photo = await response.json();
            setUploadedPhotos(prev => [...prev, photo.cloudinary_public_id]);
            onUpload?.(photo);
          }
        } catch (err) {
          console.error('Failed to save to database:', err);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Upload Gallery Photos</h2>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm text-gray-600">
            {uploading ? `Uploading... ${progress}%` : 'Upload gallery photos (multiple)'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, WebP up to 10MB each
          </p>
        </label>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Uploaded Photos Grid */}
      {uploadedPhotos.length > 0 && (
        <div>
          <h3 className="font-medium mb-4">Uploaded Photos ({uploadedPhotos.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedPhotos.map((publicId) => (
              <div key={publicId} className="relative group">
                <SmartImage
                  src={ImageSource.cloudinary(publicId)}
                  alt="Gallery photo"
                  width={300}
                  aspectRatio="square"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={async () => {
                      // Delete from database
                      await fetch(`/api/gallery?publicId=${publicId}`, {
                        method: 'DELETE',
                      });
                      setUploadedPhotos(prev => prev.filter(id => id !== publicId));
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
