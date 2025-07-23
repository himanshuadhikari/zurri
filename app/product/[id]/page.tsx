
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/ui/ProductDetailClient';
import { Product } from '@/types';



export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

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
            where: { slug: (id) },
            include: {
                category: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
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

        parseStringObject(product)
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

function parseStringObject(product: Product) {
    product.images = JSON.parse(product.images || "[]");
    product.sizes = JSON.parse(product.sizes || "[]");
    product.colors = JSON.parse(product.colors || "[]");

}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId,
                id: { not: currentProductId },
                active: true
            },
            take: 4,
            include: {
                category: true
            }
        });



        return products.map(product => {
            parseStringObject(product);

            return {
                ...product,
                sizes: product.sizes as string[],
                colors: product.colors as string[],
                images: product.images as string[]
            }
        });
    } catch (error) {
        console.error('Error fetching related products:', error);
        return [];
    }
}



// export async function generateMetadata({ params }: { params: { id: string } }) {
//     const product = await getProduct(params.id);

//     if (!product) {
//         return {
//             title: 'Product Not Found'
//         };
//     }

//     return {
//         title: `${product.name} - Clothify`,
//         description: product.description,
//         openGraph: {
//             title: product.name,
//             description: product.description,
//             images: product.images.length > 0 ? [product.images[0]] : []
//         }
//     };
// }