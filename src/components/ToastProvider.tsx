"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToastStore, type Toast, type ToastType } from "@/store/toast";

// ─── Per-type visual config ───────────────────────────────────────────────────

const config: Record<
  ToastType,
  {
    icon: React.ReactNode;
    borderColor: string;
    iconColor: string;
    progressColor: string;
    bg: string;
  }
> = {
  success: {
    icon: <CheckCircle className="w-5 h-5 shrink-0" />,
    borderColor: "border-l-green-500",
    iconColor: "text-green-500",
    progressColor: "bg-green-500",
    bg: "bg-white",
  },
  error: {
    icon: <XCircle className="w-5 h-5 shrink-0" />,
    borderColor: "border-l-red-500",
    iconColor: "text-red-500",
    progressColor: "bg-red-500",
    bg: "bg-white",
  },
  info: {
    icon: <Info className="w-5 h-5 shrink-0" />,
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500",
    progressColor: "bg-blue-500",
    bg: "bg-white",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 shrink-0" />,
    borderColor: "border-l-amber-500",
    iconColor: "text-amber-500",
    progressColor: "bg-amber-500",
    bg: "bg-white",
  },
};

// ─── Single toast item ────────────────────────────────────────────────────────

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToastStore();
  const { icon, borderColor, iconColor, progressColor, bg } = config[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={`relative flex items-start gap-3 w-80 rounded-xl shadow-lg border-l-4 px-4 pt-3 pb-4 overflow-hidden ${bg} ${borderColor}`}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <span className={`mt-0.5 ${iconColor}`}>{icon}</span>

      {/* Message */}
      <p className="flex-1 text-sm font-medium text-gray-800 leading-snug pr-1">
        {toast.message}
      </p>

      {/* Close button */}
      <button
        onClick={() => removeToast(toast.id)}
        aria-label="Đóng thông báo"
        className="mt-0.5 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[3px] ${progressColor}`}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: toast.duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

// ─── Provider (mount once in layout) ─────────────────────────────────────────

export default function ToastProvider() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div
      aria-label="Thông báo"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col-reverse gap-3 pointer-events-none"
    >
      <AnimatePresence initial={false} mode="sync">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
