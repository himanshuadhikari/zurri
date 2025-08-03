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
        console.log("PUT", id, body);

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

        if (!images || images.length === 0) {
            return NextResponse.json(
                { success: false, error: 'At least one image is required' },
                { status: 400 }
            );
        }

        if (comparePrice !== null && comparePrice !== undefined && comparePrice <= price) {
            return NextResponse.json(
                { success: false, error: 'Compare price must be higher than regular price' },
                { status: 400 }
            );
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
                stock: parseInt(stock) || 0,
                featured: Boolean(featured),
                active: Boolean(active),
                details: details ? JSON.stringify(details) : null,
            }
        });


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