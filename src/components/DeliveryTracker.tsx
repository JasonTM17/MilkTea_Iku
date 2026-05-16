"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Package, Bike, PartyPopper } from "lucide-react";

const STEPS = [
  { label: "Đã xác nhận", icon: CheckCircle2, key: "confirmed" },
  { label: "Đang pha chế", icon: Package, key: "preparing" },
  { label: "Đang giao", icon: Bike, key: "delivering" },
  { label: "Hoàn thành", icon: PartyPopper, key: "done" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const STATUS_MAP: Record<string, number> = {
  confirmed: 0,
  preparing: 1,
  delivering: 2,
  done: 3,
};

interface DeliveryTrackerProps {
  status: StepKey | string;
  estimatedTime: string;
}

export default function DeliveryTracker({
  status,
  estimatedTime,
}: DeliveryTrackerProps) {
  const activeIndex = STATUS_MAP[status] ?? 0;
  const progressPercent = (activeIndex / (STEPS.length - 1)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 max-w-lg w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg">
          Theo dõi đơn hàng
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 text-brand-500" />
          <span>{estimatedTime}</span>
        </div>
      </div>

      {/* Progress bar track */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <motion.div
          className="absolute top-5 left-5 h-1 bg-brand-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progressPercent / 100 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ width: "calc(100% - 2.5rem)" }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    isCompleted
                      ? "bg-brand-500 border-brand-500 text-white"
                      : isActive
                      ? "bg-white dark:bg-gray-800 border-brand-500 text-brand-500"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </motion.div>
                <span
                  className={`text-xs font-medium text-center max-w-[64px] leading-tight ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : isCompleted
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status message */}
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-brand-50 dark:bg-brand-900/30 rounded-xl px-4 py-3 text-sm text-brand-700 dark:text-brand-300 text-center font-medium"
      >
        {activeIndex === 0 && "Đơn hàng của bạn đã được xác nhận!"}
        {activeIndex === 1 && "Barista đang pha chế đồ uống cho bạn..."}
        {activeIndex === 2 && "Shipper đang trên đường giao đến bạn!"}
        {activeIndex === 3 && "Đơn hàng đã giao thành công. Chúc bạn ngon miệng!"}
      </motion.div>
    </div>
  );
}
