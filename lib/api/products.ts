import { ProductFormData } from '@/lib/validations/product';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Product {
  id: string;
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
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const createProduct = async (productData: ProductFormData): Promise<ApiResponse<Product>> => {
  try {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        images: productData.images.filter(img => img.trim()),
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create product'
    };
  }
};


export const editProduct = async (productData: ProductFormData): Promise<ApiResponse<Product>> => {
  try {
    const response = await fetch(`/api/admin/products/${productData?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        images: productData.images.filter(img => img.trim()),
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error editing product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to edit product'
    };
  }
};


export const getCategories = async (): Promise<ApiResponse<Array<{ id: string; name: string }>>> => {
  try {
    const response = await fetch('/api/categories');
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch categories'
    };
  }
};