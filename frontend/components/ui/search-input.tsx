import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Search for restaurants, cuisines or dishes...",
  className = "",
  ...props
}) => {
  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        icon={<Search className="w-5 h-5 text-foreground/45" />}
        className={`${value ? "pr-10" : ""} ${className}`}
        {...props}
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            if (onClear) onClear();
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer"
          type="button"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
