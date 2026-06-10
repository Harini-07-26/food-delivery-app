"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../../../services/restaurantService";
import { useCartStore } from "../../../store/cartStore";
import { useUIStore } from "../../../store/uiStore";
import { FoodCard } from "../../../components/features/menu/food-card";
import { RatingBadge } from "../../../components/ui/rating-badge";
import { LoadingSkeleton } from "../../../components/ui/loading-skeleton";
import { EmptyState } from "../../../components/ui/empty-state";
import { Button } from "../../../components/ui/button";
import {
  Clock,
  CircleDollarSign,
  MapPin,
  Bike,
  ChevronRight,
  ShoppingBag,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";

interface RestaurantDetailsProps {
  params: Promise<{ id: string }>;
}

export default function RestaurantDetails({ params }: RestaurantDetailsProps) {
  // Unwrapping Next.js 15 Route params asynchronously
  const { id } = use(params);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { items, getSubtotal, deliveryFee, getTotal, updateQuantity } =
    useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  // Fetch restaurant details using TanStack Query
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurantService.getRestaurantById(id),
  });

  // Automatically select the first category once restaurant data loads
  useEffect(() => {
    if (restaurant?.menu && restaurant.menu.length > 0) {
      setSelectedCategory(restaurant.menu[0].name);
    }
  }, [restaurant]);

  if (isLoading) {
    return (
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {/* Banner Skeleton */}
        <div className="h-60 sm:h-80 w-full bg-foreground/5 dark:bg-foreground/10 rounded-3xl animate-pulse mb-8"></div>
        {/* Info Skeleton */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="h-7 w-1/3 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
          <div className="h-4 w-1/4 rounded bg-foreground/10 dark:bg-foreground/20 animate-pulse"></div>
        </div>
        {/* Menu Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <LoadingSkeleton variant="menu-item" count={3} />
          </div>
          <div className="lg:col-span-4 h-64 bg-foreground/5 dark:bg-foreground/10 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (isError || !restaurant) {
    return (
      <div className="flex-grow flex items-center justify-center p-6">
        <EmptyState
          title="Restaurant not found"
          description="The restaurant you are looking for does not exist or has been removed from our listings."
          icon={<ShoppingBag className="w-8 h-8 text-foreground/35" />}
          action={
            <Link href="/restaurants">
              <Button>Back to Restaurants</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const subtotal = getSubtotal();
  const grandTotal = getTotal();
  const isCartEmpty = items.length === 0;

  return (
    <div className="flex-grow w-full flex flex-col pb-20 md:pb-8">
      {/* Restaurant Header Banner */}
      <section className="relative h-60 sm:h-80 w-full overflow-hidden sm:max-w-7xl sm:mx-auto sm:rounded-b-3xl shrink-0">
        <Image
          src={restaurant.bannerImage}
          alt={restaurant.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-2">
          <Link
            href="/restaurants"
            className="text-white/80 hover:text-white text-xs font-bold flex items-center gap-1 mb-2 self-start bg-black/35 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10"
          >
            ← Back to Listing
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none">
                {restaurant.name}
              </h1>
              <p className="text-xs sm:text-sm text-white/80 font-semibold mt-2 leading-none">
                {restaurant.cuisines.join(" • ")}
              </p>
            </div>

            <span className="inline-flex self-start sm:self-auto items-center gap-1.5 rounded-xl bg-white text-black px-3 py-1.5 text-xs font-black shadow-lg">
              ⭐ {restaurant.rating} ({restaurant.ratingCount})
            </span>
          </div>
        </div>
      </section>

      {/* Info Stats Bar */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-6 shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4.5 rounded-2xl border border-border bg-card shadow-xs text-xs font-bold text-foreground/50">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground shrink-0 dark:bg-foreground/10">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider leading-none">
                Delivery Speed
              </p>
              <p className="text-foreground text-sm font-black mt-1 leading-none">
                {restaurant.deliveryTime} mins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground shrink-0 dark:bg-foreground/10">
              <Bike className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider leading-none">
                Delivery Fee
              </p>
              <p className="text-foreground text-sm font-black mt-1 leading-none">
                {restaurant.deliveryFee === 0
                  ? "FREE"
                  : `$${restaurant.deliveryFee.toFixed(2)}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground shrink-0 dark:bg-foreground/10">
              <CircleDollarSign className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider leading-none">
                Cost for Two
              </p>
              <p className="text-foreground text-sm font-black mt-1 leading-none">
                ${restaurant.averageCost}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
            <div className="h-9 w-9 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground shrink-0 dark:bg-foreground/10">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <div className="truncate">
              <p className="text-[10px] uppercase font-bold tracking-wider leading-none">
                Location
              </p>
              <p className="text-foreground text-xs font-black mt-1 leading-none truncate">
                {restaurant.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Listing & Cart side view */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Menu Column (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Category selection Tabs */}
            <div className="sticky top-16 z-10 w-full overflow-x-auto bg-background/95 backdrop-blur-xs py-3 border-b border-border scrollbar-none flex gap-2">
              {restaurant.menu.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === category.name
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-card border border-border text-foreground/70 hover:border-brand-500/50"
                  }`}
                  type="button"
                >
                  {category.name} ({category.items.length})
                </button>
              ))}
            </div>

            {/* Menu Items grouped inside selection */}
            {restaurant.menu.map((category) => {
              if (selectedCategory && selectedCategory !== category.name)
                return null;

              return (
                <div
                  key={category.name}
                  className="flex flex-col gap-4 animate-slide-up-fade"
                >
                  <h2 className="text-lg font-black tracking-tight text-foreground border-l-4 border-brand-500 pl-2.5 leading-none">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {category.items.map((food) => (
                      <FoodCard
                        key={food.id}
                        item={food}
                        restaurantId={restaurant.id}
                        restaurantName={restaurant.name}
                        deliveryFee={restaurant.deliveryFee}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Summary Cart Column (Right) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-3.5 border-b border-border">
                <ShoppingBag className="w-5 h-5 text-brand-500 shrink-0" />
                <h3 className="text-base font-black tracking-tight text-foreground leading-none">
                  Checkout Summary
                </h3>
              </div>

              {isCartEmpty ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <div className="h-11 w-11 bg-foreground/5 dark:bg-foreground/10 rounded-xl flex items-center justify-center text-foreground/35 mb-3">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">
                    Your cart is empty
                  </h4>
                  <p className="text-[10px] text-foreground/45 max-w-[160px] font-semibold leading-relaxed">
                    Add signature dishes from the menu to start order checkout.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-foreground/45 uppercase tracking-wider">
                    <span>Order items ({items.length})</span>
                    <span className="text-brand-500 font-extrabold">
                      {restaurant.name}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
                    {items.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-bold text-foreground truncate">
                            {cartItem.item.name}
                          </span>
                          <span className="text-[10px] text-foreground/50 font-semibold mt-0.5">
                            ${cartItem.item.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center border border-border rounded-lg h-7 px-1 bg-card shrink-0">
                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItem.item.id,
                                cartItem.quantity - 1,
                              )
                            }
                            className="p-0.5 text-foreground/40 hover:text-brand-500 cursor-pointer"
                            type="button"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1.5 font-black text-foreground text-[11px]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItem.item.id,
                                cartItem.quantity + 1,
                              )
                            }
                            className="p-0.5 text-foreground/40 hover:text-brand-500 cursor-pointer"
                            type="button"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-extrabold w-12 text-right shrink-0">
                          $
                          {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 flex flex-col gap-2.5 text-xs text-foreground/75 font-semibold">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>
                        {deliveryFee === 0
                          ? "FREE"
                          : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-px bg-border my-1"></div>
                    <div className="flex justify-between text-sm font-black text-foreground">
                      <span>Grand Total</span>
                      <span className="text-brand-500">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link href="/cart" className="w-full mt-1.5">
                    <Button className="w-full flex items-center justify-center gap-1.5">
                      Proceed to Checkout <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
