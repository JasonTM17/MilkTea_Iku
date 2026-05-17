"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertBannerProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
  show: boolean;
}

const alertConfig: Record<AlertType, { icon: typeof Info; bg: string; border: string; text: string; iconColor: string }> = {
  success: {
    icon: CheckCircle2,
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    iconColor: "text-yellow-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    iconColor: "text-blue-500",
  },
};

export default function AlertBanner({ type, title, message, onClose, show }: AlertBannerProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`rounded-xl border ${config.bg} ${config.border} p-4`}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${config.text}`}>{title}</p>
              {message && (
                <p className={`text-sm mt-1 ${config.text} opacity-80`}>{message}</p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Đóng thông báo"
                className={`shrink-0 min-w-11 min-h-11 flex items-center justify-center p-1 rounded-lg hover:bg-black/5 transition-colors ${config.text}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
