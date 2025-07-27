'use client';

import { ProductFormData, ValidationError, generateSlugFromName, generateSKUFromName } from '@/lib/validations/product';

interface BasicInfoFieldsProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  errors: ValidationError[];
  categories: Array<{ id: string; name: string }>;
}

export default function BasicInfoFields({ 
  formData, 
  setFormData, 
  errors,
  categories 
}: BasicInfoFieldsProps) {
  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      // Auto-generate slug if it hasn't been manually edited
      slug: prev.slug === generateSlugFromName(prev.name) || !prev.slug 
        ? generateSlugFromName(name) 
        : prev.slug,
      // Auto-generate SKU if it hasn't been manually edited
      sku: prev.sku === generateSKUFromName(prev.name) || !prev.sku 
        ? generateSKUFromName(name) 
        : prev.sku
    }));
  };

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('name') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter product name"
          maxLength={100}
        />
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
        )}
      </div>

      {/* Slug and SKU Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('slug') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="product-slug"
            maxLength={100}
          />
          {getFieldError('slug') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('slug')}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            URL-friendly version of the product name
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU *
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value.toUpperCase() }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('sku') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="PRODUCT-SKU-1234"
            maxLength={50}
          />
          {getFieldError('sku') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('sku')}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Unique product identifier
          </p>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('categoryId') ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {getFieldError('categoryId') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('categoryId')}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('description') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter detailed product description"
          maxLength={2000}
        />
        <div className="flex justify-between mt-1">
          {getFieldError('description') ? (
            <p className="text-sm text-red-600">{getFieldError('description')}</p>
          ) : (
            <div />
          )}
          <p className="text-sm text-gray-500">
            {formData.description.length}/2000
          </p>
        </div>
      </div>

      {/* Price and Compare Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            max="999999.99"
            value={formData.price || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              price: parseFloat(e.target.value) || 0 
            }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('price') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {getFieldError('price') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('price')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compare Price ($)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            max="999999.99"
            value={formData.comparePrice || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              comparePrice: e.target.value ? parseFloat(e.target.value) : null
            }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('comparePrice') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {getFieldError('comparePrice') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('comparePrice')}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Original price for showing discounts
          </p>
        </div>
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stock Quantity *
        </label>
        <input
          type="number"
          min="0"
          max="999999"
          value={formData.stock || ''}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            stock: parseInt(e.target.value) || 0 
          }))}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('stock') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0"
        />
        {getFieldError('stock') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('stock')}</p>
        )}
      </div>

      {/* Product Status */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Product Status</h4>
        
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Featured Product</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Featured products appear in special sections</p>
          <p>• Inactive products won&apos;t be visible to customers</p>
        </div>
      </div>
    </div>
  );
}