import { create } from "zustand";

interface UIState {
  isCartDrawerOpen: boolean;
  isLocationSelectorOpen: boolean;
  searchQuery: string;
  selectedCuisine: string;
  sortBy: string;

  // Actions
  setCartDrawerOpen: (isOpen: boolean) => void;
  toggleCartDrawer: () => void;
  setLocationSelectorOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCuisine: (cuisine: string) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartDrawerOpen: false,
  isLocationSelectorOpen: false,
  searchQuery: "",
  selectedCuisine: "All",
  sortBy: "relevance",

  setCartDrawerOpen: (isOpen) => set({ isCartDrawerOpen: isOpen }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  setLocationSelectorOpen: (isOpen) => set({ isLocationSelectorOpen: isOpen }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine }),
  setSortBy: (sort) => set({ sortBy: sort }),
  
  resetFilters: () => set({
    searchQuery: "",
    selectedCuisine: "All",
    sortBy: "relevance",
  }),
}));
