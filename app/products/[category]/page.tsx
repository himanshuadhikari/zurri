import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductsClient from '@/components/ProductsClient';

async function getCategoryProducts(categorySlug: string, searchParams: any) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug }
  });

  if (!category) {
    return null;
  }

  const {
    search,
    sort = 'newest',
    minPrice,
    maxPrice,
    page = '1',
    limit = '12'
  } = searchParams;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const where: any = {
    isActive: true,
    categoryId: category.id
  };

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
                where: { isActive: true }
              }
            }
          }
        }
      })
    ]);

    const productsWithRatings = products.map(product => ({
      ...product,
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
      totalPages: Math.ceil(total / parseInt(limit)),
      category
    };
  } catch (error) {
    console.error('Error fetching category products:', error);
    return null;
  }
}

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: { category: string };
  searchParams: any;
}) {
  const data = await getCategoryProducts(params.category, searchParams);
  
  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsClient {...data} searchParams={{ ...searchParams, category: params.category }} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.category }
  });
  
  if (!category) {
    return {
      title: 'Category Not Found'
    };
  }

  return {
    title: `${category.name} - Clothify`,
    description: `Shop ${category.name.toLowerCase()} fashion at Clothify. Premium quality clothing and accessories.`,
    openGraph: {
      title: `${category.name} Collection - Clothify`,
      description: `Discover our ${category.name.toLowerCase()} collection`
    }
  };
}