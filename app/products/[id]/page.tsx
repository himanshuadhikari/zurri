import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/Portal/ProductDetailClient';


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);
    console.log("ProductDetailPage", params)
    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product.categoryId, product.id);

    return (
        <div className="min-h-screen bg-gray-50">
            <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </div>
    );
}


async function getProduct(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            sizes: product.sizes as string[],
            colors: product.colors as string[],
            images: product.images as string[]
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

async function getRelatedProducts(categoryId: number, currentProductId: number) {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId,
                id: { not: currentProductId },
                isActive: true
            },
            take: 4,
            include: {
                category: true
            }
        });

        return products.map(product => ({
            ...product,
            sizes: product.sizes as string[],
            colors: product.colors as string[],
            images: product.images as string[]
        }));
    } catch (error) {
        console.error('Error fetching related products:', error);
        return [];
    }
}



export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        return {
            title: 'Product Not Found'
        };
    }

    return {
        title: `${product.name} - Clothify`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.images.length > 0 ? [product.images[0]] : []
        }
    };
}