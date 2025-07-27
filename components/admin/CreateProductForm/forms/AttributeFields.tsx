'use client';

import { ProductFormData } from '@/lib/validations/product';

interface AttributeFieldsProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const availableColors = [
  'Black', 'White', 'Red', 'Blue', 'Green', 
  'Yellow', 'Pink', 'Purple', 'Gray', 'Brown',
  'Navy', 'Orange', 'Beige', 'Maroon', 'Teal'
];

export default function AttributeFields({ formData, setFormData }: AttributeFieldsProps) {
  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const selectAllSizes = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...availableSizes]
    }));
  };

  const clearAllSizes = () => {
    setFormData(prev => ({
      ...prev,
      sizes: []
    }));
  };

  const selectAllColors = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...availableColors]
    }));
  };

  const clearAllColors = () => {
    setFormData(prev => ({
      ...prev,
      colors: []
    }));
  };

  return (
    <div className="space-y-6">
      {/* Sizes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Available Sizes
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAllSizes}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              type="button"
              onClick={clearAllSizes}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-3 py-2 rounded-md border transition-colors ${
                formData.sizes.includes(size)
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {formData.sizes.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: {formData.sizes.join(', ')}
          </p>
        )}
      </div>

      {/* Colors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Available Colors
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAllColors}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              type="button"
              onClick={clearAllColors}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableColors.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => toggleColor(color)}
              className={`px-3 py-2 rounded-md border transition-colors ${
                formData.colors.includes(color)
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
        {formData.colors.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: {formData.colors.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}