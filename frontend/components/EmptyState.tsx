"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      {icon && (
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-cream-100 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-sm mx-auto mb-6">{description}</p>
      )}
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
        >
          {action.label}
        </a>
      )}
    </motion.div>
  );
}
