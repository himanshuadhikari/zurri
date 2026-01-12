// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId, variantId, quantity = 1 } = await request.json();
    // Validate input
    if (!userId || !variantId || quantity < 1) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid parameters' },
        { status: 400 }
      );
    }

    // Ensure variant exists
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      select: {
        id: true,
        productId: true,
        size: true,
        color: true,
        stock: true,
        price: true,
      },
    });

    if (!variant) {
      return NextResponse.json(
        { success: false, error: 'Variant not found' },
        { status: 404 }
      );
    }

    if (quantity > variant.stock) {
      return NextResponse.json(
        { success: false, error: `Only ${variant.stock} item(s) in stock` },
        { status: 400 }
      );
    }

    // Find or create cart
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    // Find existing cart item
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId: cart.id,
          variantId,
        },
      },
    });

    if (existingItem) {
      // Update quantity, but don't exceed stock
      const newQuantity = Math.min(existingItem.quantity + quantity, variant.stock);
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    // Return updated cart with variant details
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            variant: true, // includes price, size, color
          },
        },
      },
    });

    return NextResponse.json({ success: true, cart: updatedCart });

  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
