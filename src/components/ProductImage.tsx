"use client";

import { useState } from "react";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  category?: string;
}

const categoryGradients: Record<string, string> = {
  "tra-sua": "from-amber-100 to-orange-200",
  "tra-trai-cay": "from-pink-100 to-rose-200",
  "dac-biet": "from-purple-100 to-violet-200",
  "sua-tuoi": "from-blue-100 to-sky-200",
  "tra-xanh": "from-green-100 to-emerald-200",
  default: "from-brand-100 to-cream-200",
};

export default function ProductImage({ src, alt, className = "", category }: ProductImageProps) {
  const [error, setError] = useState(false);
  const gradient = categoryGradients[category || "default"] || categoryGradients.default;

  if (!src || error) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <svg className="w-12 h-12 text-current opacity-30" viewBox="0 0 64 64" fill="none">
          <path d="M20 16h24l-3 40H23L20 16z" fill="currentColor" opacity="0.4" />
          <path d="M20 16h24l-3 40H23L20 16z" stroke="currentColor" strokeWidth="2" />
          <path d="M18 12h28a2 2 0 012 2v2H16v-2a2 2 0 012-2z" fill="currentColor" opacity="0.3" />
          <path d="M32 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="44" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="34" cy="38" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="30" cy="50" r="2.5" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
