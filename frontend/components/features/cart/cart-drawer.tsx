"use client";

import React from "react";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "../../../store/cartStore";
import { useUIStore } from "../../../store/uiStore";
import { Button } from "../../ui/button";
import { EmptyState } from "../../ui/empty-state";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, updateQuantity, getSubtotal, deliveryFee, getTotal, clearCart } = useCartStore();

  if (!isCartDrawerOpen) return null;

  const subtotal = getSubtotal();
  const total = getTotal();
  const isEmpty = items.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Drawer Panel */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-md bg-card border-l border-border shadow-2xl animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-500" />
            <h3 className="text-base font-black tracking-tight text-foreground">Your Order</h3>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 rounded-lg border border-border hover:bg-foreground/5 text-foreground/50 transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEmpty ? (
            <EmptyState
              title="Your cart is empty"
              description="Add delicious items from your favorite restaurants to start a new order."
              icon={<ShoppingBag className="w-8 h-8 text-foreground/35" />}
              action={
                <Button
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full"
                >
                  Browse Food Menu
                </Button>
              }
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-border mb-1">
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Item details</span>
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              {items.map((cartItem) => (
                <div key={cartItem.item.id} className="flex gap-4 p-3 rounded-2xl border border-border bg-card shadow-xs">
                  <div className="flex flex-col flex-grow min-w-0 justify-center">
                    <span className="text-xs font-bold text-foreground leading-snug truncate">
                      {cartItem.item.name}
                    </span>
                    <span className="text-xs text-foreground/50 font-semibold mt-0.5">
                      ${cartItem.item.price.toFixed(2)} each
                    </span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center border border-border rounded-lg h-8 px-1 shrink-0 self-center">
                    <button
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      className="p-1 text-foreground/40 hover:text-brand-500 cursor-pointer"
                      type="button"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-black text-foreground">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      className="p-1 text-foreground/40 hover:text-brand-500 cursor-pointer"
                      type="button"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="flex items-center justify-end shrink-0 w-16 text-right self-center">
                    <span className="text-xs font-black text-foreground">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {!isEmpty && (
          <div className="border-t border-border bg-foreground/[0.01] p-6 shrink-0 flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-xs font-semibold text-foreground/75">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="h-px bg-border my-1.5"></div>
              <div className="flex justify-between text-sm font-black text-foreground">
                <span>Total Amount</span>
                <span className="text-brand-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/cart" onClick={() => setCartDrawerOpen(false)} className="w-full">
              <Button className="w-full flex items-center justify-center gap-2">
                Checkout Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
