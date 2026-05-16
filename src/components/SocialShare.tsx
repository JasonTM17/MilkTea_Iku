"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link, ExternalLink, Check } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareButtons = [
    {
      label: "Facebook",
      icon: ExternalLink,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className:
        "bg-[#1877F2] text-white hover:bg-[#166FE5] dark:bg-[#1877F2] dark:hover:bg-[#166FE5]",
    },
    {
      label: "Twitter / X",
      icon: Share2,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className:
        "bg-black text-white hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {shareButtons.map(({ label, icon: Icon, href, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chia sẻ lên ${label}`}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${className}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}

      <button
        onClick={copyLink}
        aria-label="Sao chép liên kết"
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5 text-green-600 dark:text-green-400"
            >
              <Check className="h-3.5 w-3.5" />
              Đã sao chép!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Link className="h-3.5 w-3.5" />
              Sao chép link
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
