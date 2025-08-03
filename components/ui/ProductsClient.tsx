'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { Search, Filter, Grid, List, ChevronDown, Star, X } from 'lucide-react';
import defaultContants from '@/constants';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  averageRating: number;
  reviewCount: number;
  category: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

interface ProductsClientProps {
  products: Product[];
  total: number;
  categories: Category[];
  currentPage: number;
  totalPages: number;
  searchParams: any;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function ProductsClient({
  products,
  total,
  categories,
  currentPage,
  totalPages,
  searchParams,
  category
}: ProductsClientProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.search || '',
    sort: searchParams.sort || 'newest',
    minPrice: searchParams.minPrice || '',
    maxPrice: searchParams.maxPrice || '',
    category: searchParams.category || ''
  });

  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value as string);
      }
    });

    const url = category 
      ? `/products/${category.slug}${params.toString() ? `?${params.toString()}` : ''}`
      : `/products${params.toString() ? `?${params.toString()}` : ''}`;
    
    router.push(url);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      sort: 'newest',
      minPrice: '',
      maxPrice: '',
      category: category?.slug || ''
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page: page.toString() };
    updateURL(newFilters);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  return (
    <div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {category ? category.name : 'All Products'}
              </h1>
              <p className="text-gray-600 mt-1">
                {total} {total === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2 hover:border-gray-400"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Categories */}
              {!category && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <Link
                      href="/products"
                      className={`block text-sm hover:text-black ${
                        !filters.category ? 'text-black font-medium' : 'text-gray-600'
                      }`}
                    >
                      All Products ({total})
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products/${cat.slug}`}
                        className={`block text-sm hover:text-black ${
                          filters.category === cat.slug ? 'text-black font-medium' : 'text-gray-600'
                        }`}
                      >
                        {cat.name} ({cat._count.products})
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      placeholder="$0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      placeholder="$1000"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Price Filters */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Quick Filters</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Under $50', min: '', max: '50' },
                    { label: '$50 - $100', min: '50', max: '100' },
                    { label: '$100 - $200', min: '100', max: '200' },
                    { label: 'Over $200', min: '200', max: '' }
                  ].map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        handleFilterChange('minPrice', range.min);
                        handleFilterChange('maxPrice', range.max);
                      }}
                      className="block w-full text-left text-sm text-gray-600 hover:text-black py-1"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow p-6 flex gap-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0] || '/placeholder-product.jpg'}
                            alt={product.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-black mb-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm mb-2">{product.category.name}</p>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.averageRating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <p className="text-xl font-bold text-gray-900">{defaultContants.RUPEE_SIGN}{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 border rounded-md ${
                            currentPage === page
                              ? 'bg-black text-white border-black'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}