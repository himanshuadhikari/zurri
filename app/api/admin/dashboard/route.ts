import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromCookie, getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromCookie(request);
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

    // Get dashboard statistics
    const [totalProducts, totalUsers, totalOrders, recentOrders, topProducts] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { firstName: true, lastName: true, email: true }
          }
        }
      }),
      prisma.product.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: true
        }
      })
    ]);

    // Calculate total revenue
    const orders = await prisma.order.findMany({
      select: { total: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);

    // Format top products with order count
    const formattedTopProducts = topProducts.map(product => ({
      ...product,
      orderCount: product.orderItems.length,
      images: JSON.parse(product.images),
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors)
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue,
        recentOrders,
        topProducts: formattedTopProducts
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}