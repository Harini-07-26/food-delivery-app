import { create } from "zustand";

interface UIState {
  isCartDrawerOpen: boolean;
  isLocationSelectorOpen: boolean;
  searchQuery: string;
  selectedCuisine: string;
  sortBy: string;
  currentPage: number;
  itemsPerPage: number;

  // Actions
  setCartDrawerOpen: (isOpen: boolean) => void;
  toggleCartDrawer: () => void;
  setLocationSelectorOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCuisine: (cuisine: string) => void;
  setSortBy: (sort: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (perPage: number) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartDrawerOpen: false,
  isLocationSelectorOpen: false,
  searchQuery: "",
  selectedCuisine: "All",
  sortBy: "relevance",
  currentPage: 1,
  itemsPerPage: 9,

  setCartDrawerOpen: (isOpen) => set({ isCartDrawerOpen: isOpen }),
  toggleCartDrawer: () =>
    set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  setLocationSelectorOpen: (isOpen) => set({ isLocationSelectorOpen: isOpen }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSelectedCuisine: (cuisine) =>
    set({ selectedCuisine: cuisine, currentPage: 1 }),
  setSortBy: (sort) => set({ sortBy: sort, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (perPage) => set({ itemsPerPage: perPage }),

  resetFilters: () =>
    set({
      searchQuery: "",
      selectedCuisine: "All",
      sortBy: "relevance",
      currentPage: 1,
    }),
}));
