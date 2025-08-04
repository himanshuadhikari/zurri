import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// / PUT /api/admin/products/[id] - Update product
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        const {
            name,
            slug,
            description,
            price,
            comparePrice,
            sku,
            categoryId,
            images,
            sizes,
            colors,
            stock,
            featured,
            active,
            details
        } = body;

        // Validate required fields
        if (!name || !slug || !sku || !description || !price || !categoryId) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (price <= 0) {
            return NextResponse.json(
                { success: false, error: 'Price must be greater than 0' },
                { status: 400 }
            );
        }

        // if (!images || images.length === 0) {
        //     return NextResponse.json(
        //         { success: false, error: 'At least one image is required' },
        //         { status: 400 }
        //     );
        // }

        if (comparePrice !== null && comparePrice !== undefined && comparePrice <= price) {
            return NextResponse.json(
                { success: false, error: 'Compare price must be higher than regular price' },
                { status: 400 }
            );
        }

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: id }
        });

        if (!existingProduct) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Check if slug is being changed and if new slug already exists
        if (slug && slug !== existingProduct.slug) {
            const existingSlug = await prisma.product.findUnique({
                where: { slug: slug }
            });
            if (existingSlug) {
                return NextResponse.json(
                    { error: `A product with slug "${slug}" already exists. Please use a different slug.` },
                    { status: 400 }
                );
            }
        }

        // Check if SKU is being changed and if new SKU already exists
        if (body.sku && body.sku !== existingProduct.sku) {
            const existingSKU = await prisma.product.findUnique({
                where: { sku: body.sku }
            });
            if (existingSKU) {
                return NextResponse.json(
                    { error: `A product with SKU "${body.sku}" already exists. Please use a different SKU.` },
                    { status: 400 }
                );
            }
        }


        const response = await prisma.product.update({
            where: { id: id },
            data: {
                name,
                slug,
                description,
                price: parseFloat(price),
                comparePrice: comparePrice ? parseFloat(comparePrice) : null,
                sku,
                categoryId,
                images: JSON.stringify(images),
                sizes: JSON.stringify(sizes || []),
                colors: JSON.stringify(colors || []),
                // stock: parseInt(stock) || 0,
                featured: Boolean(featured),
                active: Boolean(active),
                details: details ? JSON.stringify(details) : null,
            },
            include: {
                variants: true,
                category: true
            }
        });

        // Handle variants update
        if (body.variants && Array.isArray(body.variants)) {
            // Delete existing variants
            await prisma.productVariant.deleteMany({
                where: { productId: response.id }
            });

            // Create new variants
            for (const variant of body.variants) {
                await prisma.productVariant.create({
                    data: {
                        productId: response.id,
                        size: variant.size,
                        color: variant.color,
                        stock: parseInt(variant.stock) || 0,
                        images: variant.images?.length > 0 ? JSON.stringify(variant.images) : null,
                        sku: variant.sku || null
                    }
                });
            }
        }

        // Fetch the complete updated product with variants
        const productWithVariants = await prisma.product.findUnique({
            where: { id: response.id },
            include: {
                variants: true,
                category: true
            }
        });

        return NextResponse.json(productWithVariants);


        console.log(response)
        return NextResponse.json({
            success: true,
            data: response
        }, { status: 200 });



    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update product' },
            { status: 500 }
        );
    }
}