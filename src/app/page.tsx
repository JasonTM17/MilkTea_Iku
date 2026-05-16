import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Home() {
  const bestSellers = await prisma.product.findMany({
    where: { isBestSeller: true, isAvailable: true },
    include: { category: true },
    take: 6,
  });

  const categories = await prisma.category.findMany({
    where: { slug: { not: "topping" } },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Header />
      <CartDrawer />

      <main>
        <Hero />

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-gray-900">
                Khám phá danh mục
              </h2>
              <p className="text-gray-500 mt-2">
                Đa dạng hương vị cho mọi sở thích
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/menu?category=${cat.slug}`}
                  className="group relative rounded-2xl overflow-hidden aspect-square bg-cream-100 hover:shadow-lg transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white font-semibold text-sm md:text-base">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900">
                  Best Sellers
                </h2>
                <p className="text-gray-500 mt-2">
                  Những món được yêu thích nhất
                </p>
              </div>
              <Link
                href="/menu"
                className="text-brand-600 font-medium hover:text-brand-700 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellers.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Đặt hàng ngay hôm nay
            </h2>
            <p className="text-brand-100 text-lg mb-8">
              Giao hàng miễn phí cho đơn từ 100.000đ trong bán kính 5km
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-700 rounded-full font-semibold hover:bg-cream-100 transition-colors shadow-lg"
            >
              Đặt hàng ngay 🧋
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
