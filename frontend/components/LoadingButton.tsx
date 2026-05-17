"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  disabled?: boolean;
}

const variants = {
  primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-sm",
  secondary: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export default function LoadingButton({
  loading,
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: LoadingButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
