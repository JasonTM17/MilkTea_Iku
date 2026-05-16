import { prisma } from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin | MilkTea Iku",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [productCount, orderCount, totalRevenue, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.findMany({
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const stats = {
    products: productCount,
    orders: orderCount,
    revenue: totalRevenue._sum.total || 0,
  };

  const serializedOrders = recentOrders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    items: o.items.map((item) => ({
      ...item,
      product: { name: item.product.name },
    })),
  }));

  return <AdminDashboard stats={stats} recentOrders={serializedOrders} />;
}
