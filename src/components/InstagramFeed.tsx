"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const posts = [
  { id: 1, color: "from-brand-300 to-brand-500" },
  { id: 2, color: "from-pink-300 to-pink-500" },
  { id: 3, color: "from-purple-300 to-purple-500" },
  { id: 4, color: "from-green-300 to-green-500" },
  { id: 5, color: "from-yellow-300 to-yellow-500" },
  { id: 6, color: "from-blue-300 to-blue-500" },
];

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-5 h-5 text-brand-600" />
            <span className="text-sm font-medium text-brand-600">@milkteaiku</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Theo dõi chúng tôi
          </h2>
          <p className="text-gray-500 mt-2">
            Cập nhật hình ảnh mới nhất từ Iku
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/milkteaiku"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-xl overflow-hidden relative group"
            >
              <div className={`w-full h-full bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                <span className="text-3xl">🧋</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
