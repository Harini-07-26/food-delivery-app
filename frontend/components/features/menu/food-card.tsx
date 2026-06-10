"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FoodItem } from "../../../types";
import { useCartStore } from "../../../store/cartStore";
import { Plus, Minus, Star, AlertTriangle } from "lucide-react";
import { Button } from "../../ui/button";

interface FoodCardProps {
  item: FoodItem;
  restaurantId: string;
  restaurantName: string;
  deliveryFee: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  restaurantId,
  restaurantName,
  deliveryFee,
}) => {
  const { items, addItem, updateQuantity, forceAddItem } = useCartStore();
  const [showConflictModal, setShowConflictModal] = useState(false);

  const cartItem = items.find((i) => i.item.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    const result = addItem(item, restaurantId, restaurantName, deliveryFee);
    if (!result.success && result.conflict) {
      setShowConflictModal(true);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, quantity - 1);
  };

  const handleConfirmConflict = () => {
    forceAddItem(item, restaurantId, restaurantName, deliveryFee);
    setShowConflictModal(false);
  };

  return (
    <>
      <div className="flex items-start justify-between gap-6 p-4 rounded-2xl border border-border bg-card shadow-xs hover:border-brand-500/20 transition-all duration-300">
        {/* Left Side: Info */}
        <div className="flex flex-col flex-grow min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            {/* Veg / Non-Veg Indicator */}
            <span
              className={`inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border text-[8px] font-bold ${
                item.isVeg
                  ? "border-emerald-500 text-emerald-600 bg-emerald-50/50"
                  : "border-rose-500 text-rose-600 bg-rose-50/50"
              }`}
              title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            >
              {item.isVeg ? "V" : "N"}
            </span>
            {item.isPopular && (
              <span className="inline-flex items-center gap-0.5 rounded-md bg-brand-50 px-2 py-0.5 text-[9px] font-black text-brand-600 dark:bg-brand-950/30 dark:text-brand-400">
                <Star className="w-2.5 h-2.5 fill-current" /> Bestseller
              </span>
            )}
          </div>
          <h3 className="text-sm sm:text-base font-black tracking-tight text-foreground leading-snug truncate">
            {item.name}
          </h3>
          <p className="text-sm font-extrabold text-foreground/75 mt-0.5">
            ${item.price.toFixed(2)}
          </p>
          <p className="text-xs text-foreground/50 font-semibold mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
            {item.description}
          </p>
        </div>

        {/* Right Side: Image and controls */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl bg-foreground/5">
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                // fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-cover"
                height={'100'}
        width={'100'}
              />
            )}
          </div>
          <div className="absolute -bottom-3 flex h-8 items-center bg-card border border-border rounded-lg shadow-sm w-20 justify-between overflow-hidden">
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="w-full h-full text-xs font-black text-brand-500 hover:bg-brand-50 dark:hover:bg-foreground/5 transition-colors uppercase cursor-pointer"
                type="button"
              >
                Add
              </button>
            ) : (
              <>
                <button
                  onClick={handleDecrement}
                  className="flex items-center justify-center w-7 h-full text-foreground/50 hover:text-brand-500 hover:bg-foreground/5 transition-colors cursor-pointer"
                  type="button"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-black text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="flex items-center justify-center w-7 h-full text-foreground/50 hover:text-brand-500 hover:bg-foreground/5 transition-colors cursor-pointer"
                  type="button"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Conflict Modal Dialog */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-card rounded-3xl border border-border p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-black tracking-tight text-foreground">Replace Cart Items?</h3>
            </div>
            <p className="text-xs sm:text-sm text-foreground/60 font-semibold leading-relaxed mb-6">
              Your cart contains items from another restaurant. Would you like to discard those and start a new order from <span className="font-extrabold text-foreground">{restaurantName}</span>?
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowConflictModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmConflict}
                className="flex-1"
              >
                Clear & Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
