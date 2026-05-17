"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&auto=format,compress"];

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-100 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-brand-200/50 flex items-center justify-center mb-3">
                  <svg className="w-12 h-12 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8H7l1.5 12h7L17 8z"/><path d="M6 8h12l-.5-2H6.5L6 8z"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg>
                </div>
                <p className="text-sm text-brand-600 font-medium">{productName}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {displayImages.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
              aria-label="Ảnh tiếp"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </>
        )}

        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
          aria-label="Phóng to ảnh"
        >
          <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 dark:bg-black/50 backdrop-blur-sm px-2 py-1.5 rounded-full">
            {displayImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-white w-5"
                    : "bg-white/60 hover:bg-white/90 w-2"
                }`}
                aria-label={`Đi tới ảnh ${i + 1} của ${displayImages.length}`}
                aria-current={i === currentIndex ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === currentIndex
                  ? "border-brand-500 shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8H7l1.5 12h7L17 8z"/><path d="M6 8h12l-.5-2H6.5L6 8z"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg>
              </div>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full aspect-square rounded-3xl overflow-hidden bg-cream-100"
            >
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto rounded-full bg-brand-200/50 flex items-center justify-center mb-4">
                    <svg className="w-20 h-20 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8H7l1.5 12h7L17 8z"/><path d="M6 8h12l-.5-2H6.5L6 8z"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="10" cy="17" r="1" fill="currentColor" stroke="none"/></svg>
                  </div>
                  <p className="text-lg text-brand-600 font-medium">{productName}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
