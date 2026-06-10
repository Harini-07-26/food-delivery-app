import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  className = "",
}) => {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-foreground/60 font-medium leading-none">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
