// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id'); // assume userId is sent in header

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
        }

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: true, // optional: include product details
                            },
                        },
                    },
                },
            },
        });

        if (!cart) {
            return NextResponse.json({ success: false, message: "not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, cart: cart || null });
    } catch (error) {
        console.error('Fetch cart error:', error);
        return NextResponse.json({ success: false, error: 'Intern   al server error' }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest) {
    try {
        const { userId, variantId, quantity } = await request.json();

        if (!userId || !variantId) {
            return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
        }

        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            return NextResponse.json({ success: false, error: 'Cart not found' }, { status: 404 });
        }
        
        const item = await prisma.cartItem.findUnique({
            where: { cartId_variantId: { cartId: cart.id, variantId } },
        });

        if (!item) {
            return NextResponse.json({ success: false, error: 'Item not in cart' }, { status: 404 });
        }

        if (quantity <= 0) {
            // remove item
            await prisma.cartItem.delete({ where: { id: item.id } });
        } else {
            // ensure quantity <= stock
            const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
            const newQuantity = Math.min(quantity, variant?.stock || quantity);
            console.log("newQuantity>>>>>", newQuantity, quantity, variant)
            await prisma.cartItem.update({
                where: { id: item.id },
                data: { quantity: newQuantity },
            });
        }

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: { include: { variant: { include: { product: true } } } },
            },
        });

        return NextResponse.json({ success: true, cart: updatedCart });
    } catch (error) {
        console.error('Update cart error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
        }

        const cart = await prisma.cart.findUnique({ where: { userId } });

        if (!cart) {
            return NextResponse.json({ success: true, cart: null }); // already empty
        }

        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: { include: { variant: { include: { product: true } } } } },
        });

        return NextResponse.json({ success: true, cart: updatedCart });
    } catch (error) {
        console.error('Clear cart error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
