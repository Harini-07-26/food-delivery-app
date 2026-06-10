import React from "react";

interface LoadingSkeletonProps {
  variant?: "card" | "menu-item" | "text" | "circle";
  className?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "text",
  className = "",
  count = 1,
}) => {
  const getStyles = () => {
    switch (variant) {
      case "card":
        return "flex flex-col rounded-3xl border border-border bg-card p-4 shadow-xs w-full";
      case "menu-item":
        return "flex items-start justify-between gap-4 p-4 rounded-2xl border border-border w-full bg-card";
      case "circle":
        return "rounded-full bg-foreground/5 dark:bg-foreground/10 animate-pulse shrink-0";
      case "text":
      default:
        return "h-4 rounded bg-foreground/5 dark:bg-foreground/10 animate-pulse";
    }
  };

  const renderSkeleton = (key: number) => {
    if (variant === "card") {
      return (
        <div key={key} className={`${getStyles()} ${className}`}>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-foreground/5 dark:bg-foreground/10 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full animate-shimmer"></div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-2/3 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
              <div className="h-5 w-10 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
            </div>
            <div className="h-3.5 w-1/2 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
            <div className="mt-2.5 pt-3 border-t border-border flex items-center justify-between">
              <div className="h-4 w-16 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
              <div className="h-4 w-20 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      );
    }

    if (variant === "menu-item") {
      return (
        <div key={key} className={`${getStyles()} ${className}`}>
          <div className="flex flex-col gap-2.5 flex-1">
            <div className="h-5 w-1/3 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
            <div className="h-3.5 w-3/4 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
            <div className="h-4 w-16 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
          </div>
          <div className="h-20 w-20 rounded-xl bg-foreground/5 dark:bg-foreground/10 animate-pulse shrink-0"></div>
        </div>
      );
    }

    return (
      <div
        key={key}
        className={`${getStyles()} ${className}`}
      />
    );
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => renderSkeleton(idx))}
    </>
  );
};
