"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Star, Zap } from "lucide-react";

const TIERS = [
  { name: "Silver", minPoints: 0, maxPoints: 500, color: "#94a3b8", icon: Star },
  { name: "Gold", minPoints: 500, maxPoints: 1500, color: "#f59e0b", icon: Crown },
  { name: "Diamond", minPoints: 1500, maxPoints: 3000, color: "#6366f1", icon: Zap },
];

interface RewardsPointsProps {
  currentPoints?: number;
}

function useCountUp(target: number, duration = 1200, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

export default function RewardsPoints({ currentPoints = 820 }: RewardsPointsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const animatedPoints = useCountUp(currentPoints, 1400, inView);

  const currentTier =
    TIERS.slice()
      .reverse()
      .find((t) => currentPoints >= t.minPoints) ?? TIERS[0];

  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const progressMin = currentTier.minPoints;
  const progressMax = nextTier ? nextTier.minPoints : currentTier.maxPoints;
  const progressPercent = Math.min(
    ((currentPoints - progressMin) / (progressMax - progressMin)) * 100,
    100
  );

  // SVG circle params
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 max-w-sm w-full"
    >
      <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-6">
        Điểm thưởng của bạn
      </h3>

      {/* Circular progress */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
            {/* Track */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke={currentTier.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
              {animatedPoints.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">điểm</span>
          </div>
        </div>

        {/* Tier badge */}
        <div
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: currentTier.color }}
        >
          <currentTier.icon className="w-3.5 h-3.5" />
          {currentTier.name}
        </div>
      </div>

      {/* Progress to next tier */}
      {nextTier && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>{currentPoints.toLocaleString()} điểm</span>
            <span>{nextTier.minPoints.toLocaleString()} điểm</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: currentTier.color }}
              initial={{ width: 0 }}
              animate={{ width: inView ? `${progressPercent}%` : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 text-center">
            Còn{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {(nextTier.minPoints - currentPoints).toLocaleString()}
            </span>{" "}
            điểm để lên hạng{" "}
            <span className="font-semibold" style={{ color: nextTier.color }}>
              {nextTier.name}
            </span>
          </p>
        </div>
      )}

      {/* Tier list */}
      <div className="grid grid-cols-3 gap-2">
        {TIERS.map((tier) => {
          const TierIcon = tier.icon;
          const isActive = tier.name === currentTier.name;
          return (
            <div
              key={tier.name}
              className={`rounded-xl p-2.5 text-center transition-colors ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "opacity-50"
              }`}
            >
              <TierIcon
                className="w-5 h-5 mx-auto mb-1"
                style={{ color: tier.color }}
              />
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {tier.name}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                {tier.minPoints.toLocaleString()}+
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
