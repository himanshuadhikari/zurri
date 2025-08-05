'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Truck, Shield, RotateCcw, Ruler, Zap, Crown, Palette, Lock, Bone, Target, Users, Shirt, Sparkles, Scissors, Waves, Package, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { useCartStore } from '@/lib/cart-store';
import { toast } from 'react-hot-toast';
import defaultContants from '@/constants';
import ProductImageGallery from '@/components/ui/ProductImageGallery';

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
  images: string[] | null;
  sku: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  slug: string;
  variants: ProductVariant[];
  details?: {
    length?: string;
    fit?: string;
    neckline?: string;
    style?: string;
    closureType?: string;
    boningType?: string;
    waistReduction?: string;
    sizingType?: string;
    fabric?: string;
    pattern?: string;
    straps?: string;
    hemline?: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }>;
}

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  console.log(product)
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [stockData, setStockData] = useState<Record<string, Record<string, { stock: number; available: boolean; sku: string | null }>>>({});
  const [colorImages, setColorImages] = useState<Record<string, string[]>>({});

  const { user } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const router = useRouter();

  // Process variants data on component mount
  useEffect(() => {
    const processedStockData: Record<string, Record<string, { stock: number; available: boolean; sku: string | null }>> = {};
    const processedColorImages: Record<string, string[]> = {};

    product.variants?.forEach(variant => {
      if (!processedStockData[variant.color]) {
        processedStockData[variant.color] = {};
      }
      
      processedStockData[variant.color][variant.size] = {
        stock: variant.stock,
        available: variant.stock > 0,
        sku: variant.sku
      };

      // Process color-specific images
      if (variant.images && variant.images.length > 0) {
        processedColorImages[variant.color] = variant.images;
      }
    });

    setStockData(processedStockData);
    setColorImages(processedColorImages);

    // Auto-select first available color and size
    if (product.colors.length > 0 && !selectedColor) {
      const firstAvailableColor = product.colors.find(color => 
        Object.values(processedStockData[color] || {}).some(variant => variant.available)
      );
      if (firstAvailableColor) {
        setSelectedColor(firstAvailableColor);
      }
    }
  }, [product.variants, product.colors, selectedColor]);

  // Auto-select first available size when color changes
  useEffect(() => {
    if (selectedColor && stockData[selectedColor] && !selectedSize) {
      const firstAvailableSize = product.sizes.find(size => 
        stockData[selectedColor][size]?.available
      );
      if (firstAvailableSize) {
        setSelectedSize(firstAvailableSize);
      }
    }
  }, [selectedColor, stockData, product.sizes, selectedSize]);

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  // Get current variant stock
  const getCurrentVariantStock = () => {
    if (!selectedColor || !selectedSize || !stockData[selectedColor]) {
      return 0;
    }
    return stockData[selectedColor][selectedSize]?.stock || 0;
  };

  const getCurrentVariantSKU = () => {
    if (!selectedColor || !selectedSize || !stockData[selectedColor]) {
      return null;
    }
    return stockData[selectedColor][selectedSize]?.sku || null;
  };

  const isCurrentVariantAvailable = () => {
    if (!selectedColor || !selectedSize || !stockData[selectedColor]) {
      return false;
    }
    return stockData[selectedColor][selectedSize]?.available || false;
  };

  // Get total stock across all variants
  const getTotalStock = () => {
    return product.variants?.reduce((total, variant) => total + variant.stock, 0);
  };

  // Get available colors (colors that have at least one size in stock)
  const getAvailableColors = () => {
    return product.colors.filter(color => 
      stockData[color] && Object.values(stockData[color]).some(variant => variant.available)
    );
  };

  // Get available sizes for selected color
  const getAvailableSizes = () => {
    if (!selectedColor || !stockData[selectedColor]) {
      return [];
    }
    return product.sizes.filter(size => stockData[selectedColor][size]?.available);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(''); // Reset size when color changes
    setQuantity(1); // Reset quantity
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      toast.error('Please select a color');
      return;
    }

    if (!isCurrentVariantAvailable()) {
      toast.error('This variant is out of stock');
      return;
    }

    const currentStock = getCurrentVariantStock();
    if (quantity > currentStock) {
      toast.error(`Only ${currentStock} items available`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
      sku: getCurrentVariantSKU()
    });

    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to continue');
      router.push('/login');
      return;
    }

    handleAddToCart();
    router.push('/checkout');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to write a review');
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          rating: reviewRating,
          comment: reviewComment
        })
      });

      if (response.ok) {
        toast.success('Review submitted successfully!');
        setShowReviewForm(false);
        setReviewComment('');
        setReviewRating(5);
        router.refresh();
      } else {
        const error = await response.json();
        console.log(error);
        toast.error('Failed to submit review');
      }
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  const currentStock = getCurrentVariantStock();
  const totalStock = getTotalStock();
  const availableColors = getAvailableColors();
  const availableSizes = getAvailableSizes();
  // console.log("product><>>>>>>>>>>>",product)
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900">Products</Link>
          <span>/</span>
          <Link href={`/products/${product.category.slug}`} className="hover:text-gray-900">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images with Color Support */}
          <ProductImageGallery
            productImages={product.images}
            selectedColor={selectedColor}
            colorImages={colorImages}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews.length} reviews)
                  </span>
                </div>
                {getCurrentVariantSKU() && (
                  <span className="text-sm text-gray-600">SKU: {getCurrentVariantSKU()}</span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{defaultContants.RUPEE_SIGN}{product.price}</p>
            </div>

            {/* Stock Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Stock Status</span>
                <span className="text-sm text-gray-600">Total: {totalStock} items</span>
              </div>
              
              {selectedColor && selectedSize ? (
                <div className="flex items-center space-x-2">
                  {isCurrentVariantAvailable() ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-700 font-medium">
                        {currentStock} available ({selectedColor} - {selectedSize})
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-700 font-medium">
                        Out of stock ({selectedColor} - {selectedSize})
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Select size and color to check availability</span>
                </div>
              )}
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color {selectedColor && `(${selectedColor})`}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isAvailable = availableColors.includes(color);
                    const isSelected = selectedColor === color;
                    
                    return (
                      <button
                        key={color}
                        onClick={() => isAvailable && handleColorChange(color)}
                        disabled={!isAvailable}
                        className={`relative px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-black bg-black text-white'
                            : isAvailable
                            ? 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title={isAvailable ? color : `${color} - Out of stock`}
                      >
                        {color}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 transform rotate-[23deg]"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Size {selectedSize && `(${selectedSize})`}
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => {
                    const isAvailable = selectedColor ? availableSizes.includes(size) : true;
                    const isSelected = selectedSize === size;
                    const variantStock = selectedColor && stockData[selectedColor] ? stockData[selectedColor][size]?.stock || 0 : 0;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && handleSizeChange(size)}
                        disabled={!isAvailable}
                        className={`relative py-2 px-3 text-sm font-medium rounded-md border transition-all ${
                          isSelected
                            ? 'border-black bg-black text-white'
                            : isAvailable
                            ? 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title={
                          selectedColor && isAvailable 
                            ? `${size} - ${variantStock} in stock`
                            : !isAvailable 
                            ? `${size} - Out of stock`
                            : size
                        }
                      >
                        {size}
                        {selectedColor && isAvailable && variantStock <= 3 && variantStock > 0 && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 transform rotate-45"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {selectedColor && (
                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Low stock (3 or less)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Out of stock</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-md hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock || currentStock === 0}
                  className="p-2 border border-gray-300 rounded-md hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  {currentStock > 0 ? (
                    <>
                      <span className="text-sm text-gray-600">
                        {currentStock} available
                      </span>
                      {currentStock <= 5 && (
                        <span className="text-xs text-orange-600 font-medium">
                          (Low stock!)
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-sm text-red-600 font-medium">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!isCurrentVariantAvailable() && selectedColor && selectedSize && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-800 font-medium">
                      This size/color combination is currently out of stock
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isCurrentVariantAvailable() || currentStock === 0}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isCurrentVariantAvailable() ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!isCurrentVariantAvailable() || currentStock === 0}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 py-3 px-6 rounded-md border transition-colors flex items-center justify-center space-x-2 ${isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
                <button className="p-3 border border-gray-300 rounded-md hover:border-gray-400">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed break-words">{product.description}</p>

            {/* Variant Stock Summary */}
            {/* {Object.keys(stockData).length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Stock by Variant</h3>
                <div className="space-y-3">
                  {Object.entries(stockData).map(([color, sizes]) => (
                    <div key={color} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">{color}</h4>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {Object.entries(sizes).map(([size, data]) => (
                          <div
                            key={size}
                            className={`flex justify-between p-2 rounded ${
                              data.available ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}
                          >
                            <span>{size}</span>
                            <span className="font-medium">{data.stock}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Product Details Section */}
            {product.details && Object.values(product.details).some(value => value) && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  {product.details.fabric && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Shirt className="w-4 h-4" />
                        Fabric
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.fabric}</div>
                    </>
                  )}

                  {product.details.fit && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Zap className="w-4 h-4" />
                        Fit
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.fit}</div>
                    </>
                  )}

                  {product.details.length && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Ruler className="w-4 h-4" />
                        Length
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.length}</div>
                    </>
                  )}

                  {product.details.neckline && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Crown className="w-4 h-4" />
                        Neckline
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.neckline}</div>
                    </>
                  )}

                  {product.details.style && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Palette className="w-4 h-4" />
                        Style
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.style}</div>
                    </>
                  )}

                  {product.details.closureType && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Lock className="w-4 h-4" />
                        Closure Type
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.closureType}</div>
                    </>
                  )}

                  {product.details.boningType && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Bone className="w-4 h-4" />
                        Boning Type
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.boningType}</div>
                    </>
                  )}

                  {product.details.waistReduction && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Target className="w-4 h-4" />
                        Waist Reduction
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.waistReduction}</div>
                    </>
                  )}

                  {product.details.sizingType && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Users className="w-4 h-4" />
                        Sizing Type
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.sizingType}</div>
                    </>
                  )}

                  {product.details.pattern && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Sparkles className="w-4 h-4" />
                        Pattern
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.pattern}</div>
                    </>
                  )}

                  {product.details.straps && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Scissors className="w-4 h-4" />
                        Straps
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.straps}</div>
                    </>
                  )}

                  {product.details.hemline && (
                    <>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Waves className="w-4 h-4" />
                        Hemline
                      </div>
                      <div className="text-gray-500 font-medium">{product.details.hemline}</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="w-5 h-5" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-5 h-5" />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews ({product.reviews.length})
            </h2>
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Write a Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`w-8 h-8 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">{review.user.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-900">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={relatedProduct.images[0] || '/placeholder-product.jpg'}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                  <p className="text-gray-600">{defaultContants.RUPEE_SIGN}{relatedProduct.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}