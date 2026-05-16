import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number; // 0–5, supports halves (e.g. 4.5)
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const clampedRating = Math.min(5, Math.max(0, rating));
  const starClass = sizeMap[size];

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = clampedRating >= i + 1;
    const half = !filled && clampedRating >= i + 0.5;
    return { filled, half };
  });

  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Đánh giá ${clampedRating} trên 5 sao`}
      role="img"
    >
      {stars.map(({ filled, half }, i) => (
        <span key={i} className="relative inline-flex">
          {/* Base empty star */}
          <Star
            className={cn(starClass, "text-gray-200 dark:text-gray-600")}
            fill="currentColor"
            strokeWidth={0}
          />

          {/* Filled or half overlay */}
          {(filled || half) && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: half ? "50%" : "100%" }}
            >
              <Star
                className={cn(starClass, "text-amber-400 dark:text-amber-300")}
                fill="currentColor"
                strokeWidth={0}
              />
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
