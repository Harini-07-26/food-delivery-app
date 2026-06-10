"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUIStore } from "../store/uiStore";
import { useCartStore } from "../store/cartStore";
import { MOCK_CATEGORIES, MOCK_OFFERS, MOCK_FEATURED_DISHES, MOCK_RESTAURANTS } from "../mock";
import { SectionHeader } from "../components/ui/section-header";
import { RestaurantCard } from "../components/features/restaurants/restaurant-card";
import { FoodCard } from "../components/features/menu/food-card";
import { Search, MapPin, Smartphone, Star, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { searchQuery, setSearchQuery, setSelectedCuisine } = useUIStore();
  const [localSearch, setLocalSearch] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    router.push("/restaurants");
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCuisine(catName);
    router.push("/restaurants");
  };

  return (
    <div className="flex-1 w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <span className="inline-flex self-center lg:self-start items-center gap-1.5 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
              ⚡ Hot, Fresh & Instant Delivery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Gourmet food, <br />
              delivered to your <span className="text-brand-500 relative">doorstep.</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Order signature dishes from top-rated restaurants, prepared fresh by culinary masters and delivered to you under 30 minutes.
            </p>

            {/* Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto lg:mx-0 p-2.5 rounded-2xl border border-border bg-card shadow-premium mt-3">
              <div className="flex flex-1 items-center gap-2.5 px-3.5 py-1">
                <Search className="w-5 h-5 text-foreground/35 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Enter dish, restaurant or cuisine..." 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-hidden font-medium"
                />
              </div>
              <Button type="submit" className="h-11 px-8 rounded-xl shrink-0">
                Find Food
              </Button>
            </form>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-brand-200/40 blur-3xl dark:bg-brand-900/10 rounded-full h-80 w-80 -z-10 animate-pulse"></div>
            <div className="relative rounded-3xl border border-border bg-card p-4 shadow-2xl max-w-sm hover:shadow-premium-hover transition-all duration-500 animate-float">
              <div className="relative aspect-square overflow-hidden rounded-2xl w-full">
                <Image 
                  src="/delicious_burger.png" 
                  alt="Truffle Angus Burger" 
                  // fill 
                  className="object-cover"
                  priority
                  height={'100'}
        width={'100'}
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Gourmet Masterpiece</span>
                  <h3 className="text-base font-black text-card-foreground mt-0.5">Truffle Beef Angus</h3>
                </div>
                <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-black text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  ★ 4.9
                </span>
              </div>
              <div className="mt-3.5 pt-3.5 border-t border-border flex items-center justify-between text-xs text-foreground/55 font-bold">
                <span>🚴 Delivery: FREE</span>
                <span className="text-brand-500 font-black text-sm">$12.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader 
            title="Deals & Offers" 
            subtitle="Exclusive discounts and coupon codes for your cravings" 
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_OFFERS.map((offer) => (
              <div 
                key={offer.id}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${offer.bgGradient} p-6 text-white shadow-md hover:scale-[1.01] transition-transform duration-300`}
              >
                <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
                <span className="inline-block rounded-xl bg-white/15 px-3 py-1.5 text-xs font-black tracking-wider border border-white/10 uppercase mb-4">
                  {offer.code}
                </span>
                <h3 className="text-2xl font-black leading-tight">{offer.discountText}</h3>
                <p className="text-sm font-extrabold mt-1">{offer.title}</p>
                <p className="text-xs text-white/80 font-medium mt-1 leading-relaxed">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="py-12 border-t border-border bg-foreground/[0.005]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader 
            title="Explore Cuisines" 
            subtitle="Order what you love from our top culinary categories" 
          />
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MOCK_CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border border-border bg-card shadow-xs hover:border-brand-500/50 hover:shadow-md hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                type="button"
              >
                <span className="text-4xl filter drop-shadow-sm">{cat.icon}</span>
                <span className="text-sm font-black text-foreground mt-3 leading-none">{cat.name}</span>
                <span className="text-[10px] text-foreground/45 font-bold mt-1.5">{cat.count} options</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader 
            title="Top Restaurants Near You" 
            subtitle="Delivering fresh meals from premium local kitchens" 
            action={
              <Link href="/restaurants">
                <Button variant="ghost" className="text-xs">
                  See All Restaurants
                </Button>
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_RESTAURANTS.slice(0, 3).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-12 border-t border-border bg-foreground/[0.005]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader 
            title="Signature Bestsellers" 
            subtitle="The highest-rated dishes ordered by local foodies today" 
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_FEATURED_DISHES.map((dish) => {
              // Retrieve matching restaurant contexts
              const restaurant = MOCK_RESTAURANTS.find(r => r.featuredDishes?.includes(dish.id)) || MOCK_RESTAURANTS[0];
              return (
                <FoodCard 
                  key={dish.id} 
                  item={dish} 
                  restaurantId={restaurant.id} 
                  restaurantName={restaurant.name} 
                  deliveryFee={restaurant.deliveryFee} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 md:p-12 shadow-xl dark:bg-neutral-950 border border-neutral-800">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left">
                <span className="inline-flex self-center lg:self-start items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-black tracking-wider uppercase border border-white/5">
                  <Smartphone className="w-3.5 h-3.5 text-brand-500" /> GourmetDash App
                </span>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  Track your food order <br />
                  in real-time.
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                  Download the GourmetDash mobile application to access live driver tracking, custom allergy warnings, quick reordering, and app-exclusive coupons.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-3">
                  <a href="#" className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all text-left">
                    <span className="text-2xl">🍏</span>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold leading-none uppercase">Download on the</p>
                      <p className="text-xs font-black mt-1">App Store</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all text-left">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold leading-none uppercase">Get it on</p>
                      <p className="text-xs font-black mt-1">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Mock App Mockup Visual */}
              <div className="lg:col-span-5 flex justify-center relative select-none">
                <div className="relative h-[320px] w-[200px] border-4 border-neutral-700 bg-black rounded-3xl shadow-2xl overflow-hidden shrink-0 flex flex-col justify-between p-3.5">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[8px] font-bold text-neutral-400 px-1">
                    <span>9:41</span>
                    <span className="flex items-center gap-1">🔋 100%</span>
                  </div>
                  {/* Mock Screen Map */}
                  <div className="flex-grow rounded-2xl bg-neutral-900 border border-neutral-800 my-2.5 p-3 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-black text-brand-500 uppercase">On its way</p>
                      <p className="text-xs font-black text-white mt-1">Estimated: 12 mins</p>
                      <div className="h-1 w-full bg-neutral-800 rounded-full mt-2.5 overflow-hidden">
                        <div className="h-full bg-brand-500 w-2/3"></div>
                      </div>
                    </div>
                    {/* Simulated Map pin */}
                    <div className="flex-grow flex items-center justify-center relative">
                      <div className="absolute h-16 w-16 bg-brand-500/10 border border-brand-500/20 rounded-full animate-ping"></div>
                      <MapPin className="w-8 h-8 text-brand-500 animate-bounce" />
                    </div>
                    <div className="bg-neutral-800 rounded-xl p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-[8px] text-white">DS</div>
                        <div>
                          <p className="text-[9px] font-extrabold text-white leading-none">Dan S.</p>
                          <p className="text-[7px] text-neutral-400 font-bold mt-0.5 leading-none">Your Rider</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-brand-500">📞 Call</span>
                    </div>
                  </div>
                  {/* Home Indicator */}
                  <div className="h-1 w-16 bg-neutral-600 rounded-full mx-auto shrink-0 mt-1"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
