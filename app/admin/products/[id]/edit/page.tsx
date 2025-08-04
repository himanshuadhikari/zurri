

// import { Metadata } from 'next';
import CreateProductForm from '@/components/admin/CreateProductForm';
import { prisma } from '@/lib/prisma';

import { parseStringObject } from '@/app/helper/productHelper';

// export const metadata: Metadata = {
//     title: 'Edit Product - Admin | Clothify',
//     description: 'Edit a new product in the admin panel',
// };
async function getProduct(id: string) {
    try {

        const product = await prisma.product.findUnique({
            where: { id: (id) },
            include: {
                category: true,
                variants: true,
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


async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
                <p className="text-gray-600">Add a new product to your store</p>
            </div>

            <CreateProductForm product={product} />
        </div>
    );
}


export default EditProductPage;