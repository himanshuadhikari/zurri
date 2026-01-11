export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  profileImage?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  active: boolean;
  category: Category;
  // categoryId: String;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  createdAt: string;
  orderItems: OrderItem[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  search?: string;
  sort?: 'name' | 'price-asc' | 'price-desc' | 'newest';
}