'use client';

import { useState, type ChangeEvent } from 'react';
import { useCloudinaryUpload } from '@/domains/shared/hooks/use-cloudinary-upload';
import { CloudinaryImage } from '@/domains/shared/components/CloudinaryImage';

interface ClientImageUploaderProps {
  clientId: string;
  category?: 'menu' | 'hero' | 'gallery' | 'team' | 'logo';
  subcategory?: string;
  onUploadComplete?: (publicId: string) => void;
}

export function ClientImageUploader({
  clientId,
  category = 'menu',
  subcategory,
  onUploadComplete,
}: ClientImageUploaderProps) {
  const { upload, uploading, progress, error } = useCloudinaryUpload();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Upload multiple files
    for (const file of Array.from(files)) {
      const result = await upload(file, {
        clientId,
        category,
        subcategory,
      });

      if (result) {
        setUploadedImages((prev) => [...prev, result.publicId]);
        onUploadComplete?.(result.publicId);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <svg
            className="w-12 h-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            {uploading ? 'Uploading...' : 'Click to upload images'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, WebP up to 10MB
          </p>
        </label>

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {progress}%
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Uploaded Images Gallery */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((publicId) => (
            <div key={publicId} className="relative group">
              <CloudinaryImage
                publicId={publicId}
                alt="Uploaded image"
                width={300}
                aspectRatio="square"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button
                  onClick={() => {
                    // TODO: Implement delete
                    setUploadedImages((prev) =>
                      prev.filter((id) => id !== publicId)
                    );
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
