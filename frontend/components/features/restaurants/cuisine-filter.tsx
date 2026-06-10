"use client";

import React from "react";
import { MOCK_CATEGORIES } from "../../../mock";
import { useUIStore } from "../../../store/uiStore";

export const CuisineFilter: React.FC = () => {
  const { selectedCuisine, setSelectedCuisine } = useUIStore();

  return (
    <div className="w-full overflow-x-auto py-2 scrollbar-none flex-shrink-0">
      <div className="flex gap-2.5">
        <button
          onClick={() => setSelectedCuisine("All")}
          className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
            selectedCuisine === "All"
              ? "bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/20"
              : "bg-card border-border hover:border-brand-500/50 text-foreground/85"
          }`}
          type="button"
        >
          All Cuisines
        </button>
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCuisine(cat.name)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
              selectedCuisine === cat.name
                ? "bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/20"
                : "bg-card border-border hover:border-brand-500/50 text-foreground/85"
            }`}
            type="button"
          >
            <span className="text-sm">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
