'use client';

import { useState } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { ProductFormData, ProductVariant } from '@/lib/validations/product';

interface VariantFieldsProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
  errors?: any[];
}

export default function VariantFields({ formData, setFormData, errors }: VariantFieldsProps) {
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [newVariant, setNewVariant] = useState<ProductVariant>({
    size: '',
    color: '',
    stock: 0,
    images: [],
    sku: ''
  });
console.log("formData", formData)
  // Add a new variant
  const addVariant = () => {
    if (!newVariant.size || !newVariant.color) {
      alert('Please fill in size and color');
      return;
    }

    // Check for duplicate size/color combination
    const duplicate = formData.variants.find(
      v => v.size === newVariant.size && v.color === newVariant.color
    );

    if (duplicate) {
      alert('This size/color combination already exists');
      return;
    }

    setFormData({
      ...formData,
      variants: [...formData.variants, { ...newVariant }]
    });

    // Reset form
    setNewVariant({
      size: '',
      color: '',
      stock: 0,
      images: [],
      sku: ''
    });
    setShowAddVariant(false);
  };

  // Remove a variant
  const removeVariant = (index: number) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      variants: updatedVariants
    });
  };

  // Update variant
  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value
    };
    setFormData({
      ...formData,
      variants: updatedVariants
    });
  };

  // Add image to variant
  const addVariantImage = (variantIndex: number, imageUrl: string) => {
    if (!imageUrl.trim()) return;

    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].images = [
      ...updatedVariants[variantIndex].images,
      imageUrl.trim()
    ];
    setFormData({
      ...formData,
      variants: updatedVariants
    });
  };

  // Remove image from variant
  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].images = updatedVariants[variantIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setFormData({
      ...formData,
      variants: updatedVariants
    });
  };

  // Generate variants from sizes and colors
  const generateVariants = () => {
    if (formData.sizes.length === 0 || formData.colors.length === 0) {
      alert('Please add sizes and colors first');
      return;
    }

    const newVariants: ProductVariant[] = [];
    
    formData.sizes.forEach(size => {
      formData.colors.forEach(color => {
        // Check if this combination already exists
        const exists = formData.variants.find(
          v => v.size === size && v.color === color
        );
        
        if (!exists) {
          newVariants.push({
            size,
            color,
            stock: 0,
            images: [],
            sku: `${formData.sku}-${color.toUpperCase()}-${size}`
          });
        }
      });
    });

    if (newVariants.length > 0) {
      setFormData({
        ...formData,
        variants: [...formData.variants, ...newVariants]
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Generate Button */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Product Variants</h4>
          <p className="text-sm text-gray-500">Manage stock by size and color combinations</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={generateVariants}
            className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            Generate from Sizes/Colors
          </button>
          <button
            type="button"
            onClick={() => setShowAddVariant(true)}
            className="px-3 py-2 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Variant
          </button>
        </div>
      </div>

      {/* Existing Variants */}
      {formData.variants.length > 0 && (
        <div className="space-y-4">
          {formData.variants.map((variant, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-gray-900">
                  {variant.color} - {variant.size}
                </h5>
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => updateVariant(index, 'color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    value={variant.sku || ''}
                    onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="AUTO-RED-XL"
                  />
                </div>
              </div>

              {/* Color-specific Images */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color-specific Images (Optional)
                </label>
                <div className="space-y-2">
                  {variant?.images && JSON.parse(variant.images || '[]')?.map((image, imageIndex) => (
                    <div key={imageIndex} className="flex items-center gap-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => {
                          const updatedVariants = [...formData.variants];
                          updatedVariants[index].images[imageIndex] = e.target.value;
                          setFormData({ ...formData, variants: updatedVariants });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/red-corset.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariantImage(index, imageIndex)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addVariantImage(index, '')}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Variant Modal */}
      {showAddVariant && (
        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium text-gray-900">Add New Variant</h5>
            <button
              type="button"
              onClick={() => setShowAddVariant(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size *
              </label>
              <input
                type="text"
                value={newVariant.size}
                onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="XL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color *
              </label>
              <input
                type="text"
                value={newVariant.color}
                onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={newVariant.stock}
                onChange={(e) => setNewVariant({ ...newVariant, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU (Optional)
              </label>
              <input
                type="text"
                value={newVariant.sku || ''}
                onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AUTO-RED-XL"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowAddVariant(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addVariant}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Variant
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {formData.variants.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">No variants added yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Add sizes and colors first, then generate variants or add manually
            </p>
          </div>
        </div>
      )}
    </div>
  );
}