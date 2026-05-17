"use client";

import ProductSkeleton from "@/components/ProductSkeleton";

export default function MenuSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search + Sort row skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md h-12 rounded-2xl bg-cream-100 dark:bg-gray-800 animate-pulse" />
        <div className="h-12 w-36 rounded-2xl bg-cream-100 dark:bg-gray-800 animate-pulse flex-shrink-0" />
      </div>

      {/* Category pills skeleton */}
      <div className="flex gap-2 overflow-x-hidden pb-1">
        {["w-16", "w-24", "w-20", "w-28"].map((width, i) => (
          <div
            key={i}
            className={`h-10 ${width} rounded-full bg-cream-200 dark:bg-gray-700 animate-pulse flex-shrink-0`}
          />
        ))}
      </div>

      {/* Product count skeleton */}
      <div className="h-4 w-32 rounded-full bg-cream-100 dark:bg-gray-800 animate-pulse" />

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
