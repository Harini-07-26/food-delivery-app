import { create } from "zustand";
import { User, UserAddress } from "../types";

interface UserState {
  user: User | null;
  currentAddress: UserAddress | null;
  addresses: UserAddress[];
  isAuthenticated: boolean;

  // Actions
  setCurrentAddress: (address: UserAddress) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  updateProfile: (profile: Partial<User>) => void;
  logout: () => void;
}

const DEFAULT_ADDRESSES: UserAddress[] = [
  {
    id: "addr1",
    label: "Home",
    addressLine: "742 Evergreen Terrace, Springfield",
    city: "Springfield",
  },
  {
    id: "addr2",
    label: "Work",
    addressLine: "100 Power Plant Rd, Sect 7G",
    city: "Springfield",
  },
];

const DEFAULT_USER: User = {
  id: "usr_99",
  name: "Homer Simpson",
  email: "homer@springfieldnuclear.com",
  phone: "+1 (555) 019-2834",
  currentAddress: DEFAULT_ADDRESSES[0],
  addresses: DEFAULT_ADDRESSES,
};

export const useUserStore = create<UserState>((set) => ({
  user: DEFAULT_USER,
  currentAddress: DEFAULT_ADDRESSES[0],
  addresses: DEFAULT_ADDRESSES,
  isAuthenticated: true,

  setCurrentAddress: (address) => {
    set((state) => {
      if (state.user) {
        return {
          currentAddress: address,
          user: { ...state.user, currentAddress: address },
        };
      }
      return { currentAddress: address };
    });
  },

  addAddress: (newAddressData) => {
    set((state) => {
      const newAddress: UserAddress = {
        ...newAddressData,
        id: `addr_${Date.now()}`,
      };
      const updatedAddresses = [...state.addresses, newAddress];
      
      if (state.user) {
        return {
          addresses: updatedAddresses,
          user: { ...state.user, addresses: updatedAddresses },
        };
      }
      return { addresses: updatedAddresses };
    });
  },

  updateProfile: (profileData) => {
    set((state) => {
      if (state.user) {
        return {
          user: { ...state.user, ...profileData },
        };
      }
      return {};
    });
  },

  logout: () => {
    set({ user: null, currentAddress: null, addresses: [], isAuthenticated: false });
  },
}));
