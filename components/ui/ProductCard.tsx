"use client";
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
    
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[currentImageIndex] || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.comparePrice && product.comparePrice > product.price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              SALE
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                <EyeIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.comparePrice}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            >
              Add to Cart
            </button>
          </div>

          {/* Size Options Preview */}
          {product.sizes.length > 0 && (
            <div className="mt-3 flex items-center space-x-1">
              <span className="text-xs text-gray-500">Sizes:</span>
              {product.sizes.slice(0, 4).map((size) => (
                <span key={size} className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs text-gray-500">+{product.sizes.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}