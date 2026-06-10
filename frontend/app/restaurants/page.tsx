"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../../services/restaurantService";
import { useUIStore } from "../../store/uiStore";
import { RestaurantCard } from "../../components/features/restaurants/restaurant-card";
import { CuisineFilter } from "../../components/features/restaurants/cuisine-filter";
import { SearchInput } from "../../components/ui/search-input";
import { LoadingSkeleton } from "../../components/ui/loading-skeleton";
import { EmptyState } from "../../components/ui/empty-state";
import { SectionHeader } from "../../components/ui/section-header";
import {
  ArrowUpDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RestaurantListing() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCuisine,
    setSelectedCuisine,
    sortBy,
    setSortBy,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    resetFilters,
  } = useUIStore();

  const { data, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: [
      "restaurants",
      searchQuery,
      selectedCuisine,
      sortBy,
      currentPage,
      itemsPerPage,
    ],
    queryFn: () =>
      restaurantService.getRestaurants({
        search: searchQuery,
        cuisine: selectedCuisine,
        sortBy,
        page: currentPage,
        perPage: itemsPerPage,
      }),
    keepPreviousData: true,
  });

  const restaurants = data?.data ?? [];
  const totalRestaurants = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalRestaurants / itemsPerPage));

  const goToPage = (page: number) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  };

  const activeFilterLabel = searchQuery
    ? `"${searchQuery}"`
    : selectedCuisine !== "All"
      ? selectedCuisine
      : "your search";

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-6 mb-8">
        <SectionHeader
          title="Browse All Kitchens"
          subtitle="Discover fresh meals from springfield's highest-rated dining spots"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-8">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </div>

          <div className="lg:col-span-4 grid gap-3">
            <div className="flex items-center gap-2.5 w-full">
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
                <option value="costLowToHigh">
                  Sort by: Cost (Low to High)
                </option>
                <option value="costHighToLow">
                  Sort by: Cost (High to Low)
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-y border-border/80 py-2">
          <CuisineFilter />
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingSkeleton variant="card" count={6} />
          </div>
        ) : isError ? (
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
          <EmptyState
            title="No kitchens found"
            description={`We couldn't find any restaurants matching ${activeFilterLabel}. Adjust your keyword search or clear active filters.`}
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
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 text-xs text-foreground/45 font-bold uppercase tracking-wider">
              <span>
                Showing {restaurants.length} of {totalRestaurants} kitchens
              </span>
              {isFetching && (
                <span className="text-brand-500 animate-pulse">
                  Syncing lists...
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up-fade">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-bold text-foreground/50">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-card transition-all disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`min-w-[2.5rem] rounded-lg border px-3 py-2 text-center transition-all ${
                        pageNumber === currentPage
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-border bg-card text-foreground/70 hover:border-brand-500"
                      }`}
                      type="button"
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= pageCount}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-card transition-all disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-foreground/70">
                Page {currentPage} of {pageCount}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
