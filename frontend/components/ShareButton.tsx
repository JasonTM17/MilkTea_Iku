"use client";

import { motion } from "framer-motion";
import { Share2, Facebook, MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: "Zalo",
      icon: MessageCircle,
      action: () => window.open(`https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: copied ? "Đã copy!" : "Copy link",
      icon: copied ? Check : Link2,
      action: copyLink,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Chia sẻ"
        aria-expanded={showMenu}
        className="flex items-center gap-1.5 px-3 py-2 min-h-11 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-300 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Chia sẻ</span>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg p-2 min-w-[160px]"
          >
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  if (option.name !== "Copy link" && option.name !== "Đã copy!") setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <option.icon className="w-4 h-4" />
                {option.name}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
