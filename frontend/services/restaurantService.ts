import { MOCK_RESTAURANTS, MOCK_CATEGORIES } from "../mock";
import { Restaurant, Category } from "../types";

// Helper to simulate API network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const restaurantService = {
  /**
   * Fetch restaurants with filtering, sorting, and pagination
   */
  async getRestaurants(options?: {
    search?: string;
    cuisine?: string;
    sortBy?: string;
    page?: number;
    perPage?: number;
  }): Promise<{
    data: Restaurant[];
    total: number;
    page: number;
    perPage: number;
  }> {
    await delay(800); // Simulate API latency to show skeleton loading states

    let result = [...MOCK_RESTAURANTS];

    // Filter by search query
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.cuisines.some((c) => c.toLowerCase().includes(searchLower)),
      );
    }

    // Filter by cuisine
    if (options?.cuisine && options.cuisine !== "All") {
      result = result.filter((r) =>
        r.cuisines.some(
          (c) => c.toLowerCase() === options.cuisine?.toLowerCase(),
        ),
      );
    }

    // Apply sorting
    if (options?.sortBy) {
      switch (options.sortBy) {
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "deliveryTime":
          result.sort((a, b) => a.deliveryTime - b.deliveryTime);
          break;
        case "costLowToHigh":
          result.sort((a, b) => a.averageCost - b.averageCost);
          break;
        case "costHighToLow":
          result.sort((a, b) => b.averageCost - a.averageCost);
          break;
        default:
          break;
      }
    }

    const total = result.length;
    const perPage = options?.perPage ?? 9;
    const page = Math.max(1, options?.page ?? 1);
    const start = (page - 1) * perPage;
    const data = result.slice(start, start + perPage);

    return { data, total, page, perPage };
  },

  /**
   * Fetch a single restaurant by its ID
   */
  async getRestaurantById(id: string): Promise<Restaurant | null> {
    await delay(800);
    const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id);
    return restaurant || null;
  },

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<Category[]> {
    await delay(500);
    return MOCK_CATEGORIES;
  },
};
