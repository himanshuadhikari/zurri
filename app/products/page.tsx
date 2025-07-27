import { Suspense } from 'react';
import ProductsClient from '@/components/ui/ProductsClient';
import { prisma } from '@/lib/prisma';
import { parseStringObject } from '../helper/productHelper';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

async function getProducts(searchParams: any) {
  const {
    category,
    search,
    sort = 'newest',
    minPrice,
    maxPrice,
    page = '1',
    limit = '12'
  } = searchParams;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const where: any = {
    active: true
  };

  // Category filter
  if (category) {
    where.category = {
      slug: category
    };
  }

  // Search filter
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  // Price filter
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  // Sort options
  let orderBy: any = { createdAt: 'desc' };
  switch (sort) {
    case 'price-low':
      orderBy = { price: 'asc' };
      break;
    case 'price-high':
      orderBy = { price: 'desc' };
      break;
    case 'name':
      orderBy = { name: 'asc' };
      break;
    case 'newest':
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }

  try {
    const [products, total, categories] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          reviews: {
            select: {
              rating: true
            }
          }
        },
        orderBy,
        skip,
        take: parseInt(limit)
      }),
      prisma.product.count({ where }),
      prisma.category.findMany({
        include: {
          _count: {
            select: {
              products: {
                where: { active: true }
              }
            }
          }
        }
      })
    ]);

    const productsWithRatings = products.map(product => ({
      ... parseStringObject(product),
      sizes: product.sizes as string[],
      colors: product.colors as string[],
      images: product.images as string[],
      averageRating: product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
        : 0,
      reviewCount: product.reviews.length
    }));

    return {
      products: productsWithRatings,
      total,
      categories,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      total: 0,
      categories: [],
      currentPage: 1,
      totalPages: 0
    };
  }
}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  const data = await getProducts(searchParams);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ProductsClient {...data} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ searchParams }: { searchParams: any }) {
  const { category, search } = searchParams;
  
  let title = 'Products - Clothify';
  let description = 'Browse our collection of premium fashion items';

  if (category) {
    const categoryData = await prisma.category.findUnique({
      where: { slug: category }
    });
    if (categoryData) {
      title = `${categoryData.name} - Clothify`;
      description = `Shop ${categoryData.name.toLowerCase()} fashion at Clothify`;
    }
  }

  if (search) {
    title = `Search: ${search} - Clothify`;
    description = `Search results for "${search}" at Clothify`;
  }

  return {
    title,
    description
  };
}