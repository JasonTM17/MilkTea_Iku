"use client";

import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";

type OrderStatus = "pending" | "confirmed" | "preparing" | "delivering" | "delivered" | "cancelled";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Package; color: string; bg: string }> = {
  pending: { label: "Chờ xác nhận", icon: Clock, color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  confirmed: { label: "Đã xác nhận", icon: CheckCircle2, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  preparing: { label: "Đang pha chế", icon: Package, color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  delivering: { label: "Đang giao", icon: Truck, color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  delivered: { label: "Đã giao", icon: CheckCircle2, color: "text-green-700", bg: "bg-green-50 border-green-200" },
  cancelled: { label: "Đã hủy", icon: XCircle, color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

export default function OrderStatusBadge({ status, size = "md" }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const padding = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 ${padding} ${textSize} font-medium rounded-full border ${config.bg} ${config.color}`}
    >
      <Icon className={iconSize} />
      {config.label}
    </motion.span>
  );
}
