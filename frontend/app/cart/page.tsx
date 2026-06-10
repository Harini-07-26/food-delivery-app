"use client";

import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useUserStore } from "../../store/userStore";
import { useUIStore } from "../../store/uiStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { EmptyState } from "../../components/ui/empty-state";
import { SectionHeader } from "../../components/ui/section-header";
import { ShoppingBag, Minus, Plus, Trash2, MapPin, CreditCard, ChevronRight, CheckCircle2, Ticket, Sparkles, Percent } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, deliveryFee, getTotal, clearCart } = useCartStore();
  const { user, currentAddress } = useUserStore();
  const { setLocationSelectorOpen } = useUIStore();

  const [couponCode, setCouponCode] = useState("");
  const [activeCoupon, setActiveCoupon] = useState<{ code: string; discount: number; type: "fixed" | "delivery" } | null>(null);
  const [couponError, setCouponError] = useState("");
  
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;

  // Handle coupon validation
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const upperCode = couponCode.trim().toUpperCase();
    if (upperCode === "WELCOME10") {
      if (subtotal >= 30) {
        setActiveCoupon({ code: "WELCOME10", discount: 10, type: "fixed" });
      } else {
        setCouponError("Minimum order amount for WELCOME10 is $30");
      }
    } else if (upperCode === "FREEDELIVERY") {
      if (subtotal >= 15) {
        setActiveCoupon({ code: "FREEDELIVERY", discount: deliveryFee, type: "delivery" });
      } else {
        setCouponError("Minimum order amount for FREEDELIVERY is $15");
      }
    } else {
      setCouponError("Invalid coupon code. Try WELCOME10 or FREEDELIVERY");
    }
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Bill Calculations
  const calculatedDeliveryFee = activeCoupon?.type === "delivery" ? 0 : deliveryFee;
  const discountAmount = activeCoupon?.type === "fixed" ? activeCoupon.discount : 0;
  const taxesAndFees = subtotal > 0 ? 2.50 : 0; // Fixed mock packaging/taxes
  const netTotal = Math.max(0, subtotal + calculatedDeliveryFee + taxesAndFees - discountAmount);

  // Place Order Simulation
  const handlePlaceOrder = () => {
    if (!currentAddress) {
      setLocationSelectorOpen(true);
      return;
    }
    setIsPlacingOrder(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderSuccess(true);
      clearCart();
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 bg-foreground/[0.005]">
        <div className="w-full max-w-md bg-card rounded-3xl border border-border p-8 shadow-2xl text-center flex flex-col items-center animate-scale-up">
          <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl animate-ping"></div>
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground mb-2">Order Placed Successfully!</h2>
          <p className="text-sm text-foreground/50 max-w-xs font-semibold leading-relaxed mb-8">
            Your payment was approved and the kitchen has started preparing your fresh gourmet meal. Estimated delivery is 25 minutes.
          </p>
          <div className="bg-foreground/[0.02] border border-border/80 rounded-2xl p-4.5 w-full text-left text-xs mb-8 flex flex-col gap-2.5 font-bold text-foreground/60">
            <div className="flex justify-between">
              <span>Delivery Address:</span>
              <span className="text-foreground truncate max-w-[180px]">{currentAddress?.addressLine}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="text-foreground">{paymentMethod === "card" ? "Credit Card (Mocked)" : "Cash on Delivery"}</span>
            </div>
          </div>
          <Link href="/" className="w-full">
            <Button className="w-full">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex-grow flex items-center justify-center p-6">
        <EmptyState
          title="Your checkout is empty"
          description="You haven't added any dishes to your cart yet. Visit our restaurants page to add meals."
          icon={<ShoppingBag className="w-8 h-8 text-foreground/35" />}
          action={
            <Link href="/restaurants">
              <Button>Browse Kitchens</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <SectionHeader 
        title="Checkout Details" 
        subtitle="Confirm items, select address, apply coupons and complete order"
        className="mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items, Address & Payment */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Cart Items List */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-black tracking-tight text-foreground border-b border-border pb-3.5 mb-2 leading-none flex justify-between items-center">
              <span>Review Items</span>
              <span className="text-xs text-brand-500 font-bold bg-brand-50 dark:bg-brand-950/30 px-3 py-1.5 rounded-lg">
                Ordering from: {items[0]?.restaurantName}
              </span>
            </h3>

            <div className="flex flex-col gap-3">
              {items.map((cartItem) => (
                <div key={cartItem.item.id} className="flex gap-4 p-4 rounded-2xl border border-border/80 bg-background/30 hover:border-brand-500/25 transition-all">
                  <div className="flex flex-col flex-grow min-w-0 justify-center">
                    <span className="text-xs sm:text-sm font-black text-foreground leading-snug truncate">
                      {cartItem.item.name}
                    </span>
                    <span className="text-[10px] text-foreground/50 font-bold mt-1">
                      ${cartItem.item.price.toFixed(2)} each
                    </span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center border border-border rounded-lg h-9 px-1 shrink-0 self-center bg-card">
                    <button
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      className="p-1.5 text-foreground/45 hover:text-brand-500 cursor-pointer"
                      type="button"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-black text-foreground">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      className="p-1.5 text-foreground/45 hover:text-brand-500 cursor-pointer"
                      type="button"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="flex items-center justify-end shrink-0 w-20 text-right self-center">
                    <span className="text-xs sm:text-sm font-black text-foreground">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address selector */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-black tracking-tight text-foreground border-b border-border pb-3.5 mb-2 leading-none">
              Delivery Address
            </h3>

            <div className="flex items-start justify-between gap-4 p-4.5 rounded-2xl border border-border/80 bg-background/20">
              <div className="flex gap-3">
                <MapPin className="w-5.5 h-5.5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-sm text-foreground">
                    {currentAddress ? `${currentAddress.label} Address` : "No Address Selected"}
                  </p>
                  <p className="text-xs text-foreground/50 font-semibold mt-1 leading-relaxed">
                    {currentAddress ? `${currentAddress.addressLine}, ${currentAddress.city}` : "Please choose your delivery location to checkout."}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocationSelectorOpen(true)}
              >
                Change
              </Button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-black tracking-tight text-foreground border-b border-border pb-3.5 mb-2 leading-none">
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-3.5 p-4.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-brand-500 bg-brand-50/30 dark:bg-brand-950/20"
                    : "border-border hover:border-brand-500/50"
                }`}
              >
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === "card" ? "bg-brand-500 text-white" : "bg-foreground/5 text-foreground/50 dark:bg-foreground/10"}`}>
                  <CreditCard className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="font-extrabold text-xs text-foreground leading-none">Credit / Debit Card</p>
                  <p className="text-[10px] text-foreground/45 font-bold mt-1.5 leading-none">Pay online securely</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-3.5 p-4.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-brand-500 bg-brand-50/30 dark:bg-brand-950/20"
                    : "border-border hover:border-brand-500/50"
                }`}
              >
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "bg-brand-500 text-white" : "bg-foreground/5 text-foreground/50 dark:bg-foreground/10"}`}>
                  <ShoppingBag className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="font-extrabold text-xs text-foreground leading-none">Cash on Delivery</p>
                  <p className="text-[10px] text-foreground/45 font-bold mt-1.5 leading-none">Pay at your doorstep</p>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Billing & Coupons */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          
          {/* Coupon Code Panel */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-black tracking-tight text-foreground border-b border-border pb-3.5 mb-1 leading-none flex items-center gap-2">
              <Ticket className="w-4.5 h-4.5 text-brand-500" /> Apply Coupons
            </h3>

            {!activeCoupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="WELCOME10, PIZZALOVE..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow h-11 bg-foreground/[0.03] border border-border rounded-xl px-4 text-xs font-bold focus:outline-hidden focus:border-brand-500 transition-colors uppercase"
                />
                <Button type="submit" size="sm" className="h-11 shrink-0">
                  Apply
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-2.5 text-xs font-bold">
                  <Sparkles className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="leading-none text-emerald-600 dark:text-emerald-400 uppercase">{activeCoupon.code} Applied</p>
                    <p className="text-[9px] font-semibold text-emerald-600/70 dark:text-emerald-400/70 mt-1 leading-none">
                      {activeCoupon.type === "fixed" ? `$${activeCoupon.discount} saved on bill` : "Delivery charges waived"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs font-black text-red-500 hover:text-red-600 cursor-pointer"
                  type="button"
                >
                  Remove
                </button>
              </div>
            )}
            
            {couponError && (
              <p className="text-[10px] font-bold text-red-500 leading-none">{couponError}</p>
            )}
            
            <div className="flex flex-col gap-2.5 p-3 rounded-2xl border border-border/80 text-[10px] text-foreground/50 font-bold bg-background/10">
              <div className="flex justify-between items-center">
                <span>WELCOME10 ($30 min order)</span>
                <span className="text-brand-500">Save $10</span>
              </div>
              <div className="flex justify-between items-center">
                <span>FREEDELIVERY ($15 min order)</span>
                <span className="text-brand-500">Free Delivery</span>
              </div>
            </div>
          </div>

          {/* Billing Summary Box */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4.5">
            <h3 className="text-base font-black tracking-tight text-foreground border-b border-border pb-3.5 mb-1 leading-none">
              Bill Details
            </h3>

            <div className="flex flex-col gap-3 text-xs text-foreground/70 font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground font-extrabold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-foreground font-extrabold">
                  {deliveryFee === 0 ? "FREE" : activeCoupon?.type === "delivery" ? (
                    <span className="line-through text-foreground/45 mr-1.5">${deliveryFee.toFixed(2)}</span>
                  ) : ""}
                  {calculatedDeliveryFee === 0 ? "FREE" : `$${calculatedDeliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Restaurant Fees</span>
                <span className="text-foreground font-extrabold">${taxesAndFees.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Coupon Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="h-px bg-border my-1.5"></div>
              
              <div className="flex justify-between text-sm font-black text-foreground">
                <span>Grand Total</span>
                <span className="text-brand-500 text-base font-black">${netTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              isLoading={isPlacingOrder}
              className="w-full flex items-center justify-center gap-1.5 mt-2"
            >
              Place Order (${netTotal.toFixed(2)}) <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
