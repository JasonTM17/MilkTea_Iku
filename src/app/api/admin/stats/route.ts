import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorized, UNAUTHORIZED_HEADERS } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: UNAUTHORIZED_HEADERS }
    );
  }

  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const [
      totalProducts,
      totalOrders,
      todayOrders,
      totalRevenue,
      recentOrders,
      popularProducts,
    ] = await Promise.all([
      prisma.product.count({ where: { isAvailable: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          customerName: true,
          total: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.orderItem.groupBy({
        by: ["productId"],
        _count: { productId: true },
        orderBy: { _count: { productId: "desc" } },
        take: 5,
      }),
    ]);

    const popularProductDetails = await prisma.product.findMany({
      where: { id: { in: popularProducts.map((p) => p.productId) } },
      select: { id: true, name: true, slug: true, basePrice: true },
    });

    const popularWithCount = popularProducts.map((p) => ({
      ...popularProductDetails.find((pd) => pd.id === p.productId),
      orderCount: p._count.productId,
    }));

    return NextResponse.json({
      overview: {
        totalProducts,
        totalOrders,
        todayOrders,
        totalRevenue: totalRevenue._sum.total || 0,
      },
      recentOrders,
      popularProducts: popularWithCount,
    });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
