"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  image: string | null;
  isNew: boolean;
  isBestSeller: boolean;
  category?: { name: string };
}

interface FeaturedSectionProps {
  products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  if (products.length === 0) return null;

  const featured = products[0];
  const rest = products.slice(1, 4);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Mới ra mắt
          </span>
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Sản phẩm mới
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href={`/menu/${featured.slug}`} className="group block">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-cream-200 aspect-[4/3]">
                <Image
                  src={featured.image || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600"}
                  alt={featured.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-3">
                    {featured.category?.name}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {featured.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {featured.description}
                  </p>
                  <span className="text-xl font-bold text-white">
                    {formatPrice(featured.basePrice)}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side cards */}
          <div className="space-y-4">
            {rest.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/menu/${product.slug}`} className="group block">
                  <div className="flex gap-4 bg-cream-50 rounded-2xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=200"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-brand-600 font-medium">
                        {product.category?.name}
                      </span>
                      <h4 className="font-semibold text-gray-900 mt-0.5 group-hover:text-brand-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {product.description}
                      </p>
                      <span className="text-brand-600 font-bold mt-2 inline-block">
                        {formatPrice(product.basePrice)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
