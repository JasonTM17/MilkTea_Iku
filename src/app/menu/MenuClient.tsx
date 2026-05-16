"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Search, X, ArrowUpDown } from "lucide-react";

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
  category: { name: string; slug: string };
}

interface MenuClientProps {
  categories: Category[];
  products: Product[];
  activeCategory: string;
}

type SortOption = "newest" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Mới nhất",
  "price-asc": "Giá tăng dần",
  "price-desc": "Giá giảm dần",
};

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-brand-100 animate-pulse">
      <div className="aspect-square bg-cream-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-cream-200 rounded-full w-3/4" />
        <div className="h-3 bg-cream-100 rounded-full w-full" />
        <div className="h-3 bg-cream-100 rounded-full w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-brand-100 rounded-full w-20" />
          <div className="h-3 bg-cream-100 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

// ── Empty state illustration ───────────────────────────────────────────────────
function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      {/* Boba cup SVG */}
      <svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6 opacity-60"
      >
        {/* Cup body */}
        <path
          d="M25 40 L30 120 Q30 130 40 130 L80 130 Q90 130 90 120 L95 40 Z"
          fill="#FDE8D0"
          stroke="#E8A87C"
          strokeWidth="2"
        />
        {/* Cup top rim */}
        <rect x="20" y="32" width="80" height="12" rx="6" fill="#F5C49A" stroke="#E8A87C" strokeWidth="2" />
        {/* Liquid */}
        <path
          d="M28 70 L32 120 Q32 126 40 126 L80 126 Q88 126 88 120 L92 70 Z"
          fill="#C2783C"
          opacity="0.35"
        />
        {/* Bubbles */}
        <circle cx="48" cy="108" r="7" fill="#7C3D12" opacity="0.55" />
        <circle cx="62" cy="115" r="6" fill="#7C3D12" opacity="0.55" />
        <circle cx="74" cy="107" r="7" fill="#7C3D12" opacity="0.55" />
        <circle cx="55" cy="120" r="5" fill="#7C3D12" opacity="0.45" />
        <circle cx="70" cy="120" r="5" fill="#7C3D12" opacity="0.45" />
        {/* Straw */}
        <rect x="56" y="4" width="8" height="60" rx="4" fill="#F97316" opacity="0.7" />
        {/* Straw stripes */}
        <rect x="56" y="10" width="8" height="6" rx="0" fill="#EA580C" opacity="0.5" />
        <rect x="56" y="24" width="8" height="6" rx="0" fill="#EA580C" opacity="0.5" />
        <rect x="56" y="38" width="8" height="6" rx="0" fill="#EA580C" opacity="0.5" />
        {/* Stars */}
        <circle cx="18" cy="60" r="3" fill="#FCD34D" opacity="0.6" />
        <circle cx="102" cy="55" r="2.5" fill="#FCD34D" opacity="0.5" />
        <circle cx="14" cy="90" r="2" fill="#FCD34D" opacity="0.4" />
        <circle cx="106" cy="85" r="3" fill="#FCD34D" opacity="0.5" />
      </svg>

      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Không tìm thấy sản phẩm
      </h3>
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
        {query
          ? `Không có kết quả nào cho "${query}". Thử tìm kiếm với từ khóa khác nhé!`
          : "Danh mục này chưa có sản phẩm. Hãy khám phá các danh mục khác!"}
      </p>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MenuClient({
  categories,
  products,
  activeCategory: initialCategory,
}: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);

  // Brief skeleton on mount for a polished feel
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const allCategories = [{ id: "all", name: "Tất cả", slug: "all" }, ...categories];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" ||
        categories.find((c) => c.slug === activeCategory)?.id === p.categoryId;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.basePrice - a.basePrice);
    }

    return result;
  }, [products, categories, activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* ── Search + Sort row ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm món yêu thích..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-cream-200 bg-white/80 backdrop-blur-sm text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-400 transition-all shadow-sm"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 hover:bg-brand-100 flex items-center justify-center transition-colors"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sort */}
        <div className="relative flex-shrink-0">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none pl-10 pr-8 py-3 rounded-2xl border border-cream-200 bg-white/80 backdrop-blur-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-400 transition-all shadow-sm cursor-pointer"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#C2783C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Category pills ── */}
      <LayoutGroup id="category-pills">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 bg-white border border-cream-200 hover:border-brand-300 hover:text-brand-700 shadow-sm"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-brand-600 shadow-md shadow-brand-200"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* ── Product count ── */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.p
            key={filteredProducts.length}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-gray-500"
          >
            Hiển thị{" "}
            <span className="font-semibold text-brand-600">
              {filteredProducts.length}
            </span>{" "}
            sản phẩm
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Grid / Skeleton / Empty ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <EmptyState key="empty-state" query={searchQuery} />
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -8 }}
                  transition={{
                    duration: 0.3,
                    delay: index < 9 ? index * 0.04 : 0,
                    ease: "easeOut",
                  }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
