import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-border bg-card shadow-xs ${className}`}>
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-foreground/40 mb-4 dark:bg-foreground/10">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-black tracking-tight text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-foreground/50 max-w-xs font-semibold mb-6">
        {description}
      </p>
      {action && action}
    </div>
  );
};
