import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: params.slug,
        active: true
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: { firstName: true, lastName: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const formattedProduct = {
      ...product,
      images: JSON.parse(product.images),
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors)
    };

    return NextResponse.json({
      success: true,
      data: formattedProduct
    });

  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}