export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  sku: string;
  stock: number;
  categoryId: string;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  active: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const validateProductForm = (data: ProductFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Product name is required' });
  } else if (data.name.trim().length < 3) {
    errors.push({ field: 'name', message: 'Product name must be at least 3 characters' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Product name must be less than 100 characters' });
  }

  // Slug validation
  if (!data.slug.trim()) {
    errors.push({ field: 'slug', message: 'Product slug is required' });
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push({ field: 'slug', message: 'Slug can only contain lowercase letters, numbers, and hyphens' });
  } else if (data.slug.length < 3) {
    errors.push({ field: 'slug', message: 'Slug must be at least 3 characters' });
  } else if (data.slug.length > 100) {
    errors.push({ field: 'slug', message: 'Slug must be less than 100 characters' });
  }

  // SKU validation
  if (!data.sku.trim()) {
    errors.push({ field: 'sku', message: 'SKU is required' });
  } else if (data.sku.trim().length < 3) {
    errors.push({ field: 'sku', message: 'SKU must be at least 3 characters' });
  } else if (data.sku.trim().length > 50) {
    errors.push({ field: 'sku', message: 'SKU must be less than 50 characters' });
  } else if (!/^[A-Z0-9-_]+$/.test(data.sku)) {
    errors.push({ field: 'sku', message: 'SKU can only contain uppercase letters, numbers, hyphens, and underscores' });
  }

  // Description validation
  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Product description is required' });
  } else if (data.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters' });
  } else if (data.description.trim().length > 2000) {
    errors.push({ field: 'description', message: 'Description must be less than 2000 characters' });
  }

  // Price validation
  if (!data.price || data.price <= 0) {
    errors.push({ field: 'price', message: 'Price must be greater than 0' });
  } else if (data.price > 999999.99) {
    errors.push({ field: 'price', message: 'Price must be less than $999,999.99' });
  }

  // Compare price validation
  if (data.comparePrice !== null) {
    if (data.comparePrice <= 0) {
      errors.push({ field: 'comparePrice', message: 'Compare price must be greater than 0' });
    } else if (data.comparePrice > 999999.99) {
      errors.push({ field: 'comparePrice', message: 'Compare price must be less than $999,999.99' });
    } else if (data.comparePrice <= data.price) {
      errors.push({ field: 'comparePrice', message: 'Compare price must be higher than regular price' });
    }
  }

  // Category validation
  if (!data.categoryId) {
    errors.push({ field: 'categoryId', message: 'Please select a category' });
  }

  // Images validation
  const validImages = data.images.filter(img => img.trim());
  if (validImages.length === 0) {
    errors.push({ field: 'images', message: 'At least one image URL is required' });
  } else {
    // Validate each image URL
    validImages.forEach((img, index) => {
      try {
        new URL(img);
      } catch {
        errors.push({ 
          field: 'images', 
          message: `Image ${index + 1} is not a valid URL` 
        });
      }
    });
  }

  // Stock validation
  if (data.stock < 0) {
    errors.push({ field: 'stock', message: 'Stock cannot be negative' });
  } else if (data.stock > 999999) {
    errors.push({ field: 'stock', message: 'Stock must be less than 999,999' });
  }

  return errors;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const generateSlugFromName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

export const generateSKUFromName = (name: string): string => {
  const timestamp = Date.now().toString().slice(-4);
  return name
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .slice(0, 10) + '-' + timestamp;
};