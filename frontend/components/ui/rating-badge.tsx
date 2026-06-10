import React from "react";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  showCount?: boolean;
  countText?: string;
  size?: "sm" | "md";
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  showCount = false,
  countText = "",
  size = "sm",
}) => {
  const getColors = (val: number) => {
    if (val >= 4.7) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/20";
    }
    if (val >= 4.2) {
      return "bg-star-50 text-star-700 border-star-100 dark:bg-star-950/30 dark:text-star-400 dark:border-star-900/20";
    }
    return "bg-foreground/5 text-foreground/60 border-border dark:bg-foreground/10";
  };
  
  const textSizes = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";
  const iconSizes = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-flex items-center gap-1 font-bold rounded-lg border ${textSizes} ${getColors(rating)}`}>
        <Star className={`${iconSizes} fill-current`} />
        {rating.toFixed(1)}
      </span>
      {showCount && countText && (
        <span className="text-xs text-foreground/50 font-medium">({countText})</span>
      )}
    </div>
  );
};
