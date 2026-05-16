"use client";

export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-brand-100 animate-pulse">
      {/* Image area */}
      <div className="relative aspect-square bg-cream-200">
        {/* Badge placeholder */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <div className="h-5 w-16 rounded-full bg-cream-300" />
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-0 pt-3 space-y-2">
        <div className="h-4 bg-cream-200 rounded-full w-3/4" />
        <div className="h-3 bg-cream-100 rounded-full w-full" />
        <div className="h-3 bg-cream-100 rounded-full w-2/3" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="h-5 bg-brand-100 rounded-full w-20" />
        <div className="h-3 bg-cream-100 rounded-full w-16" />
      </div>
    </div>
  );
}
