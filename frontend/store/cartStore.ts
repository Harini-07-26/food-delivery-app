import { create } from "zustand";
import { CartItem, FoodItem } from "../types";

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  deliveryFee: number;
  
  // Actions
  addItem: (item: FoodItem, restaurantId: string, restaurantName: string, deliveryFee: number) => { success: boolean; conflict?: boolean };
  forceAddItem: (item: FoodItem, restaurantId: string, restaurantName: string, deliveryFee: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computations
  getSubtotal: () => number;
  getTotalItems: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurantId: null,
  restaurantName: null,
  deliveryFee: 0,

  addItem: (item, restaurantId, restaurantName, deliveryFee) => {
    const state = get();

    // Check if adding from a different restaurant
    if (state.restaurantId && state.restaurantId !== restaurantId) {
      return { success: false, conflict: true };
    }

    const existingItemIndex = state.items.findIndex((i) => i.item.id === item.id);

    if (existingItemIndex > -1) {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += 1;
      set({ items: updatedItems });
    } else {
      set({
        items: [...state.items, { item, quantity: 1, restaurantId, restaurantName }],
        restaurantId,
        restaurantName,
        deliveryFee,
      });
    }

    return { success: true };
  },

  forceAddItem: (item, restaurantId, restaurantName, deliveryFee) => {
    // Clears the cart and adds the item from the new restaurant
    set({
      items: [{ item, quantity: 1, restaurantId, restaurantName }],
      restaurantId,
      restaurantName,
      deliveryFee,
    });
  },

  removeItem: (itemId) => {
    const state = get();
    const updatedItems = state.items.filter((i) => i.item.id !== itemId);
    
    if (updatedItems.length === 0) {
      set({ items: [], restaurantId: null, restaurantName: null, deliveryFee: 0 });
    } else {
      set({ items: updatedItems });
    }
  },

  updateQuantity: (itemId, quantity) => {
    const state = get();
    if (quantity <= 0) {
      state.removeItem(itemId);
      return;
    }

    const updatedItems = state.items.map((i) =>
      i.item.id === itemId ? { ...i, quantity } : i
    );
    set({ items: updatedItems });
  },

  clearCart: () => {
    set({ items: [], restaurantId: null, restaurantName: null, deliveryFee: 0 });
  },

  getSubtotal: () => {
    return get().items.reduce((total, i) => total + i.item.price * i.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, i) => total + i.quantity, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const fee = get().deliveryFee;
    return subtotal + fee;
  },
}));
