import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MenuClient from "./MenuClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu | MilkTea Iku",
  description: "Khám phá menu trà sữa đa dạng với hơn 20 hương vị độc đáo",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const categories = await prisma.category.findMany({
    where: { slug: { not: "topping" } },
    orderBy: { order: "asc" },
  });

  const where: Record<string, unknown> = { isAvailable: true };
  if (searchParams.category) {
    where.category = { slug: searchParams.category };
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="pt-20 min-h-screen bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Menu
            </h1>
            <p className="text-gray-500 mt-2">
              Chọn hương vị yêu thích của bạn
            </p>
          </div>

          <MenuClient
            categories={categories}
            products={products}
            activeCategory={searchParams.category || "all"}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
