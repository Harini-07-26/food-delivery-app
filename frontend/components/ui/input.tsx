import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, label, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 text-foreground/40 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-11 bg-card border border-border rounded-xl text-sm transition-all focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 ${
              icon ? "pl-10" : "px-4"
            } ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs font-semibold text-red-500 mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
