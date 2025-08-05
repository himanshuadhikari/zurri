'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductImageGalleryProps {
  productImages: string[]; // Default product images
  selectedColor: string | null;
  colorImages: Record<string, string[]>; // Color-specific images
  productName: string;
}

export default function ProductImageGallery({
  productImages,
  selectedColor,
  colorImages,
  productName
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Get images to display based on selected color
  const getCurrentImages = () => {
    if (selectedColor && colorImages[selectedColor] && colorImages[selectedColor].length > 0) {
      return colorImages[selectedColor];
    }
    return productImages;
  };

  const currentImages = getCurrentImages();

  // Reset to first image when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsZoomed(false);
  }, [selectedColor]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };
  if (!currentImages || currentImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
          <Image
            src={currentImages[currentImageIndex]}
            alt={`${productName} ${selectedColor ? `in ${selectedColor}` : ''} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
            priority={currentImageIndex === 0}
            onClick={handleImageClick}
          />
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" />
          </div>
          
          {/* Navigation Arrows */}
          {currentImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {currentImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {currentImages.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {currentImages.length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {currentImages?.map?.((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  index === currentImageIndex
                    ? 'border-black shadow-lg'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Color Indicator */}
        {selectedColor && (
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-current mr-2 opacity-60"></div>
              Showing: {selectedColor}
            </span>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={currentImages[currentImageIndex]}
              alt={`${productName} ${selectedColor ? `in ${selectedColor}` : ''} - Zoomed`}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Navigation in zoom mode */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            {/* Image counter in zoom */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {currentImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}