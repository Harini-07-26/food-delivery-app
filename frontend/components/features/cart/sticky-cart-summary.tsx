"use client";

import React from "react";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { useCartStore } from "../../../store/cartStore";
import { useUIStore } from "../../../store/uiStore";

export const StickyCartSummary: React.FC = () => {
  const { items, getTotalItems, getSubtotal } = useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-background/90 backdrop-blur-md border-t border-border md:hidden animate-slide-up">
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="w-full flex items-center justify-between bg-brand-500 hover:bg-brand-600 text-white rounded-2xl px-5 py-3.5 shadow-lg shadow-brand-500/20 active:scale-[0.98] transition-all cursor-pointer"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 shrink-0">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider leading-none">
              {totalItems} {totalItems === 1 ? "Item" : "Items"} added
            </p>
            <p className="text-sm font-black mt-0.5">
              ${subtotal.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 font-black text-xs uppercase tracking-widest">
          <span>View Cart</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
