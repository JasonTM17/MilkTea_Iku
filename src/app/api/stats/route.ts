import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const [
      totalProducts,
      totalOrders,
      revenueResult,
      ordersToday,
      popularProducts,
    ] = await Promise.all([
      prisma.product.count({ where: { isAvailable: true } }),

      prisma.order.count(),

      prisma.order.aggregate({ _sum: { total: true } }),

      prisma.order.count({
        where: { createdAt: { gte: todayStart, lt: todayEnd } },
      }),

      prisma.product.findMany({
        take: 5,
        where: { isAvailable: true },
        orderBy: { orderItems: { _count: "desc" } },
        include: {
          category: true,
          _count: { select: { orderItems: true } },
        },
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue: revenueResult._sum.total ?? 0,
      ordersToday,
      popularProducts,
    });
  } catch (error) {
    console.error("[GET /api/stats]", error);
    return NextResponse.json(
      { error: "Không thể tải thống kê" },
      { status: 500 }
    );
  }
}
