export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  isVeg: boolean;
  category: string;
  tags?: string[];
  isPopular?: boolean;
}

export interface MenuCategory {
  name: string;
  items: FoodItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  ratingCount: string;
  deliveryTime: number; // in minutes
  deliveryFee: number; // in USD or cents
  averageCost: number; // for two, e.g. 15
  address: string;
  image: string;
  bannerImage: string;
  menu: MenuCategory[];
  featuredDishes?: string[]; // IDs of popular items
}

export interface Offer {
  id: string;
  code: string;
  discountText: string;
  title: string;
  description: string;
  bgGradient: string;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface UserAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  addressLine: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentAddress: UserAddress;
  addresses: UserAddress[];
}
