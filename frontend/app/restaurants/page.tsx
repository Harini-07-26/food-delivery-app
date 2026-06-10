"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../../services/restaurantService";
import { useUIStore } from "../../store/uiStore";
import { RestaurantCard } from "../../components/features/restaurants/restaurant-card";
import { CuisineFilter } from "../../components/features/restaurants/cuisine-filter";
import { SearchInput } from "../../components/ui/search-input";
import { LoadingSkeleton } from "../../components/ui/loading-skeleton";
import { EmptyState } from "../../components/ui/empty-state";
import { SectionHeader } from "../../components/ui/section-header";
import { SlidersHorizontal, ArrowUpDown, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

export default function RestaurantListing() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCuisine, 
    setSelectedCuisine,
    sortBy, 
    setSortBy,
    resetFilters
  } = useUIStore();

  // Query restaurants based on active search, cuisine and sorting state
  const { 
    data: restaurants = [], 
    isLoading, 
    isFetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ["restaurants", searchQuery, selectedCuisine, sortBy],
    queryFn: () => restaurantService.getRestaurants({ 
      search: searchQuery, 
      cuisine: selectedCuisine, 
      sortBy 
    }),
  });

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 sm:px-6">
      
      {/* Top Filter and Search Control Area */}
      <div className="flex flex-col gap-6 mb-8">
        <SectionHeader 
          title="Browse All Kitchens" 
          subtitle="Discover fresh meals from springfield's highest-rated dining spots"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Search Bar Input */}
          <div className="lg:col-span-8">
            <SearchInput 
              value={searchQuery} 
              onChange={setSearchQuery} 
              onClear={() => setSearchQuery("")} 
            />
          </div>

          {/* Sort Menu Select */}
          <div className="lg:col-span-4 flex items-center gap-2.5 w-full">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground/45">
              <ArrowUpDown className="w-5 h-5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 bg-card border border-border rounded-xl px-4 text-xs font-bold focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors cursor-pointer"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="rating">Sort by: Highest Rated</option>
              <option value="deliveryTime">Sort by: Fastest Delivery</option>
              <option value="costLowToHigh">Sort by: Cost (Low to High)</option>
              <option value="costHighToLow">Sort by: Cost (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Scrollable Cuisine Filter Row */}
        <div className="border-y border-border/80 py-2">
          <CuisineFilter />
        </div>
      </div>

      {/* Main Grid View */}
      <div>
        {isLoading ? (
          /* Loading Skeletons Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingSkeleton variant="card" count={6} />
          </div>
        ) : isError ? (
          /* Error State */
          <EmptyState
            title="Failed to load restaurants"
            description="We ran into a connection glitch while retrieving restaurant details. Please try refreshing."
            icon={<RefreshCw className="w-8 h-8 text-red-500" />}
            action={
              <button 
                onClick={() => refetch()}
                className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 shadow-sm active:scale-95 transition-all cursor-pointer text-xs"
              >
                Retry Request
              </button>
            }
          />
        ) : restaurants.length === 0 ? (
          /* Empty Search/Filter State */
          <EmptyState
            title="No kitchens found"
            description={`We couldn't find any restaurants matching "${searchQuery || selectedCuisine}". Adjust your keyword search or clear active filters.`}
            action={
              <button 
                onClick={resetFilters}
                className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 shadow-sm active:scale-95 transition-all cursor-pointer text-xs"
              >
                Clear Filters
              </button>
            }
          />
        ) : (
          /* Active Results Display Grid */
          <>
            <div className="flex justify-between items-center mb-5 text-xs text-foreground/45 font-bold uppercase tracking-wider">
              <span>Showing {restaurants.length} kitchens</span>
              {isFetching && <span className="text-brand-500 animate-pulse">Syncing lists...</span>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up-fade">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            {/* Pagination Placeholder UI */}
            <div className="mt-12 pt-6 border-t border-border flex items-center justify-between gap-4 text-xs font-bold text-foreground/50">
              <button disabled className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-card opacity-50 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span>Page 1 of 1</span>
              <button disabled className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-card opacity-50 cursor-not-allowed">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
