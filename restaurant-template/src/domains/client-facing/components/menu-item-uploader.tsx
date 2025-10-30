'use client';

/**
 * Menu Item Uploader
 *
 * Uploads menu item image to Cloudinary + saves to database
 */

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useCloudinaryUpload } from '@/domains/shared/hooks/use-cloudinary-upload';
import { SmartImage, ImageSource } from '@/domains/shared/components';

interface MenuItemUploaderProps {
  clientId: string;
  onSave?: (menuItem: any) => void;
}

interface MenuItemForm {
  name: string;
  description: string;
  price: string;
  category: 'appetizers' | 'entrees' | 'desserts' | 'drinks';
  cloudinary_public_id?: string;
}

export function MenuItemUploader({ clientId, onSave }: MenuItemUploaderProps) {
  const { upload, uploading, progress, error } = useCloudinaryUpload();
  const [formData, setFormData] = useState<MenuItemForm>({
    name: '',
    description: '',
    price: '',
    category: 'entrees',
  });
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload to Cloudinary
    const result = await upload(file, {
      clientId,
      category: 'menu',
      subcategory: formData.category,
    });

    if (result) {
      setFormData(prev => ({
        ...prev,
        cloudinary_public_id: result.publicId,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.cloudinary_public_id) {
      alert('Please upload an image first');
      return;
    }

    setSaving(true);
    try {
      // Save to database via API
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          cloudinary_public_id: formData.cloudinary_public_id,
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      const menuItem = await response.json();
      onSave?.(menuItem);

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'entrees',
      });
    } catch (error) {
      console.error('[MenuItemUploader] Failed to save menu item', error);
      alert('Failed to save menu item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Add Menu Item</h2>

      {/* Image Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        {formData.cloudinary_public_id ? (
          <div className="space-y-4">
            <SmartImage
              src={ImageSource.cloudinary(formData.cloudinary_public_id)}
              alt="Menu item preview"
              width={400}
              aspectRatio="square"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, cloudinary_public_id: undefined }))}
              className="text-sm text-red-600"
            >
              Remove image
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
              id="menu-image-upload"
            />
            <label
              htmlFor="menu-image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="text-4xl mb-2">📸</div>
              <p className="text-sm text-gray-600">
                {uploading ? `Uploading... ${progress}%` : 'Upload menu item photo'}
              </p>
            </label>
          </>
        )}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="menu-item-name">Item Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border rounded-md px-3 py-2"
            placeholder="e.g., Gourmet Burger"
            id="menu-item-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="menu-item-description">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border rounded-md px-3 py-2"
            rows={3}
            placeholder="Describe the dish..."
            id="menu-item-description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="menu-item-price">Price *</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full border rounded-md px-3 py-2"
              placeholder="12.99"
              id="menu-item-price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="menu-item-category">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
              className="w-full border rounded-md px-3 py-2"
              id="menu-item-category"
            >
              <option value="appetizers">Appetizers</option>
              <option value="entrees">Entrees</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving || uploading || !formData.cloudinary_public_id}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium disabled:bg-gray-400"
      >
        {saving ? 'Saving...' : 'Add Menu Item'}
      </button>
    </form>
  );
}
