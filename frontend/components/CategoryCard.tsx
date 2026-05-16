"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  productCount: number;
  index: number;
}

const gradients = [
  "from-brand-400 to-brand-600",
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-blue-400 to-blue-600",
];

export default function CategoryCard({ name, slug, productCount, index }: CategoryCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/menu?category=${slug}`}
        className="block relative rounded-2xl overflow-hidden aspect-[4/3] group"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <div className="relative h-full flex flex-col justify-between p-5 text-white">
          <div>
            <Sparkles className="w-5 h-5 opacity-70 mb-2" />
            <h3 className="font-semibold text-lg leading-snug">{name}</h3>
            <p className="text-sm text-white/70 mt-1">{productCount} sản phẩm</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Xem menu
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
