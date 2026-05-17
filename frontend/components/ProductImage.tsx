"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  category?: string;
  sizes?: string;
}

const categoryGradients: Record<string, string> = {
  "tra-sua": "from-amber-100 to-orange-200 dark:from-amber-950/40 dark:to-orange-900/40",
  "tra-trai-cay": "from-pink-100 to-rose-200 dark:from-pink-950/40 dark:to-rose-900/40",
  "dac-biet": "from-purple-100 to-violet-200 dark:from-purple-950/40 dark:to-violet-900/40",
  "sua-tuoi": "from-blue-100 to-sky-200 dark:from-blue-950/40 dark:to-sky-900/40",
  "tra-xanh": "from-green-100 to-emerald-200 dark:from-green-950/40 dark:to-emerald-900/40",
  default: "from-brand-100 to-cream-200 dark:from-brand-900/40 dark:to-brand-800/30",
};

export default function ProductImage({ src, alt, className = "", category, sizes }: ProductImageProps) {
  const [error, setError] = useState(false);
  const gradient = categoryGradients[category || "default"] || categoryGradients.default;

  if (!src || error) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <svg className="w-12 h-12 text-brand-600 dark:text-brand-300 opacity-40" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M20 16h24l-3 40H23L20 16z" fill="currentColor" opacity="0.4" />
          <path d="M20 16h24l-3 40H23L20 16z" stroke="currentColor" strokeWidth="2" />
          <path d="M18 12h28a2 2 0 012 2v2H16v-2a2 2 0 012-2z" fill="currentColor" opacity="0.3" />
          <path d="M32 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="44" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="34" cy="38" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="30" cy="50" r="2.5" fill="currentColor" opacity="0.5" />
        </svg>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 50vw, 33vw"}
        className="object-cover"
        onError={() => setError(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
