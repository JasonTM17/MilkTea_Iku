"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string | null;
}

const RECENT_KEY = "iku_recent_searches";
const MAX_RECENT = 6;

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  const prev = getRecent().filter((q) => q !== query);
  const next = [query, ...prev].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function removeRecent(query: string) {
  const next = getRecent().filter((q) => q !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Open on Cmd+K / Ctrl+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input when modal opens; load recent searches
  useEffect(() => {
    if (open) {
      setRecent(getRecent());
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Debounced search
  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q.trim())}`
        );
        const json = await res.json();
        setResults(json.data ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  useEffect(() => {
    search(query);
    setActiveIndex(-1);
  }, [query, search]);

  function close() {
    setOpen(false);
  }

  function navigate(slug: string, name: string) {
    saveRecent(name);
    close();
    router.push(`/menu/${slug}`);
  }

  function runRecentSearch(q: string) {
    setQuery(q);
  }

  function deleteRecent(q: string, e: React.MouseEvent) {
    e.stopPropagation();
    removeRecent(q);
    setRecent(getRecent());
  }

  // Keyboard navigation through results
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const total = results.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + total) % total);
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      navigate(results[activeIndex].slug, results[activeIndex].name);
    }
  }

  const showRecent = !query.trim() && recent.length > 0;
  const showResults = query.trim().length > 0;
  const noResults = showResults && !loading && results.length === 0;

  return (
    <>
      {/* Trigger button — exposed for use in Header etc. */}
      <button
        id="search-trigger"
        onClick={() => setOpen(true)}
        className="hidden"
        aria-label="Mở tìm kiếm"
      />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-[10vh] z-50 mx-auto w-full max-w-xl px-4"
              role="dialog"
              aria-modal="true"
              aria-label="Tìm kiếm sản phẩm"
            >
              <div className="rounded-2xl bg-white shadow-2xl shadow-brand-900/20 border border-brand-100 overflow-hidden">
                {/* Search input row */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-brand-50">
                  <Search className="w-5 h-5 text-brand-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Tìm kiếm trà sữa, topping..."
                    className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 text-base outline-none"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
                      aria-label="Xóa tìm kiếm"
                    >
                      <X className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center gap-0.5 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono shrink-0">
                    Esc
                  </kbd>
                </div>

                {/* Body */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Loading skeleton */}
                  {loading && (
                    <div className="px-4 py-3 space-y-2.5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 animate-pulse"
                        >
                          <div className="w-10 h-10 rounded-xl bg-brand-50 shrink-0" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3.5 bg-brand-50 rounded w-2/3" />
                            <div className="h-3 bg-brand-50 rounded w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search results */}
                  {!loading && showResults && results.length > 0 && (
                    <div className="py-2">
                      <p className="px-4 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Kết quả tìm kiếm
                      </p>
                      {results.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => navigate(item.slug, item.name)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            activeIndex === idx
                              ? "bg-brand-50"
                              : "hover:bg-brand-50/60"
                          }`}
                        >
                          {/* Image placeholder */}
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center shrink-0 text-lg">
                            🧋
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            {item.category && (
                              <p className="text-xs text-brand-400 flex items-center gap-1 mt-0.5">
                                <Tag className="w-3 h-3" />
                                {item.category}
                              </p>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-brand-600 shrink-0">
                            {formatPrice(item.price)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No results */}
                  {noResults && (
                    <div className="px-4 py-8 text-center">
                      <p className="text-gray-500 text-sm">
                        Không tìm thấy sản phẩm nào cho{" "}
                        <span className="font-medium text-gray-700">
                          &ldquo;{query}&rdquo;
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Thử tìm với từ khóa khác nhé
                      </p>
                    </div>
                  )}

                  {/* Recent searches */}
                  {showRecent && (
                    <div className="py-2">
                      <p className="px-4 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Tìm kiếm gần đây
                      </p>
                      {recent.map((q) => (
                        <button
                          key={q}
                          onClick={() => runRecentSearch(q)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50/60 transition-colors text-left group"
                        >
                          <Clock className="w-4 h-4 text-gray-300 shrink-0" />
                          <span className="flex-1 text-sm text-gray-700 truncate">
                            {q}
                          </span>
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => deleteRecent(q, e)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                deleteRecent(q, e as unknown as React.MouseEvent);
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all shrink-0"
                            aria-label={`Xóa "${q}" khỏi lịch sử`}
                          >
                            <X className="w-3 h-3 text-gray-400" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Empty state — no query, no recent */}
                  {!query.trim() && recent.length === 0 && (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-gray-400">
                        Nhập tên sản phẩm để tìm kiếm
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2.5 border-t border-brand-50 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">↑</kbd>
                    <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">↓</kbd>
                    điều hướng
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">Enter</kbd>
                    chọn
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">Esc</kbd>
                    đóng
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
