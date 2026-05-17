import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPass) return false;

  if (authHeader.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString();
    const [user, pass] = decoded.split(":");
    return user === adminUser && pass === adminPass;
  }

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const expectedToken = process.env.ADMIN_API_TOKEN;
    return !!expectedToken && token === expectedToken;
  }

  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin"' } }
    );
  }

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
