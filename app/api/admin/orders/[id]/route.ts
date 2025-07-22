import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, getUserFromToken } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true }
        },
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order status updated successfully'
    });

  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}