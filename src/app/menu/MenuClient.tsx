"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  image: string | null;
  isNew: boolean;
  isBestSeller: boolean;
  categoryId: string;
  category: { name: string };
}

interface MenuClientProps {
  categories: Category[];
  products: Product[];
  activeCategory: string;
}

export default function MenuClient({
  categories,
  products,
  activeCategory: initialCategory,
}: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" ||
      categories.find((c) => c.slug === activeCategory)?.id === p.categoryId;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm món..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-brand-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-brand-50 border"
          }`}
        >
          Tất cả
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.slug
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-brand-50 border"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            Không tìm thấy sản phẩm nào
          </p>
        </div>
      )}
    </>
  );
}
