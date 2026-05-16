"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
