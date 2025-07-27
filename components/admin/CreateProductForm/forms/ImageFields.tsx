'use client';

import { useState } from 'react';
import { X, Plus, Eye, EyeOff } from 'lucide-react';
import { ProductFormData, ValidationError, isValidUrl } from '@/lib/validations/product';

interface ImageFieldsProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  errors: ValidationError[];
}

export default function ImageFields({ formData, setFormData, errors }: ImageFieldsProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
      if (previewIndex === index) {
        setPreviewIndex(null);
      }
    }
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const togglePreview = (index: number) => {
    setPreviewIndex(previewIndex === index ? null : index);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images *
      </label>
      <div className="space-y-3">
        {formData.images.map((image, index) => (
          <div key={index} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  image && !isValidUrl(image) ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter image URL (https://...)"
              />
              
              {/* Preview Toggle Button */}
              {image && isValidUrl(image) && (
                <button
                  type="button"
                  onClick={() => togglePreview(index)}
                  className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200"
                  title={previewIndex === index ? 'Hide preview' : 'Show preview'}
                >
                  {previewIndex === index ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Remove Button */}
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md border border-red-200"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* URL Validation Error */}
            {image && !isValidUrl(image) && (
              <p className="text-sm text-red-600">Please enter a valid URL</p>
            )}

            {/* Image Preview */}
            {previewIndex === index && image && isValidUrl(image) && (
              <div className="border rounded-md p-2 bg-gray-50">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="max-w-full h-32 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const errorDiv = target.nextElementSibling as HTMLElement;
                    if (errorDiv) {
                      errorDiv.style.display = 'block';
                    }
                  }}
                />
                <div 
                  className="text-sm text-red-600 mt-2 hidden"
                  style={{ display: 'none' }}
                >
                  Failed to load image. Please check the URL.
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Image Button */}
        <button
          type="button"
          onClick={addImageField}
          className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200"
        >
          <Plus className="w-4 h-4" />
          Add Another Image
        </button>

        {/* General Images Error */}
        {getFieldError('images') && (
          <p className="text-sm text-red-600">{getFieldError('images')}</p>
        )}

        {/* Helper Text */}
        <p className="text-sm text-gray-500">
          Add high-quality product images. The first image will be used as the main product image.
        </p>
      </div>
    </div>
  );
}