import { Category, Restaurant, Offer, FoodItem } from "../types";

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Burgers", icon: "🍔", count: 42 },
  { id: "2", name: "Pizza", icon: "🍕", count: 36 },
  { id: "3", name: "Sushi", icon: "🍣", count: 18 },
  { id: "4", name: "Salads", icon: "🥗", count: 12 },
  { id: "5", name: "Desserts", icon: "🍰", count: 24 },
  { id: "6", name: "Drinks", icon: "🥤", count: 15 },
];

export const MOCK_OFFERS: Offer[] = [
  {
    id: "o1",
    code: "WELCOME10",
    discountText: "$10 OFF",
    title: "On your first order",
    description: "Use code WELCOME10 for orders above $30",
    bgGradient: "from-brand-500 to-rose-500",
  },
  {
    id: "o2",
    code: "FREEDELIVERY",
    discountText: "FREE DELIVERY",
    title: "Weekend Special",
    description: "Enjoy zero delivery fees on orders above $15",
    bgGradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "o3",
    code: "PIZZALOVE",
    discountText: "20% OFF",
    title: "Naples Special Deal",
    description: "Get 20% off on all specialty wood-fired pizzas",
    bgGradient: "from-amber-500 to-orange-600",
  },
];

// Helper mock food items to use across featured displays
export const MOCK_FOODS: Record<string, FoodItem> = {
  burger1: {
    id: "f_burger1",
    name: "Truffle Beef Masterpiece",
    description: "Flame-grilled Angus beef patty, white truffle oil, melted Swiss cheese, caramelized onions on a toasted brioche bun.",
    price: 12.99,
    image: "/delicious_burger.png",
    rating: 4.9,
    isVeg: false,
    category: "Burgers",
    isPopular: true,
  },
  pizza1: {
    id: "f_pizza1",
    name: "Naples Special Pepperoni",
    description: "Authentic double-fermented sourdough, fresh mozzarella, spicy pepperoni, San Marzano tomato sauce, fresh basil.",
    price: 14.50,
    image: "/delicious_pizza.png",
    rating: 4.9,
    isVeg: false,
    category: "Pizza",
    isPopular: true,
  },
  sushi1: {
    id: "f_sushi1",
    name: "Premium Dragon Roll",
    description: "Shrimp tempura, cucumber inside, topped with avocado, unagi (eel), sweet eel sauce, and toasted sesame seeds.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    isVeg: false,
    category: "Sushi",
    isPopular: true,
  },
  salad1: {
    id: "f_salad1",
    name: "Gourmet Avocado Quinoa Salad",
    description: "Organic quinoa, Hass avocado, cherry tomatoes, baby spinach, roasted pine nuts, with fresh lemon-herb dressing.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    isVeg: true,
    category: "Salads",
  },
  dessert1: {
    id: "f_dessert1",
    name: "Decadent Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten liquid center, served with organic Madagascar vanilla bean ice cream.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    isVeg: true,
    category: "Desserts",
    isPopular: true,
  },
  drink1: {
    id: "f_drink1",
    name: "Fresh Strawberry Basil Mojito",
    description: "Muddled fresh strawberries, basil leaves, key lime juice, organic brown sugar, and sparkling water.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    isVeg: true,
    category: "Drinks",
  }
};

export const MOCK_FEATURED_DISHES = Object.values(MOCK_FOODS).filter(food => food.isPopular);

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Truffle Burger Cafe",
    cuisines: ["Burgers", "American", "Fast Food"],
    rating: 4.8,
    ratingCount: "500+ ratings",
    deliveryTime: 20,
    deliveryFee: 0.00,
    averageCost: 25.00,
    address: "742 Evergreen Terrace, Springfield",
    image: "/delicious_burger.png",
    bannerImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80",
    menu: [
      {
        name: "Chef's Specials",
        items: [
          MOCK_FOODS.burger1,
          {
            id: "r1_m2",
            name: "Classic Cheeseburger",
            description: "Angus beef patty, cheddar cheese, pickles, lettuce, tomato, and house burger sauce on a sesame bun.",
            price: 9.99,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            isVeg: false,
            category: "Burgers",
          }
        ]
      },
      {
        name: "Sides",
        items: [
          {
            id: "r1_m3",
            name: "Truffle Parmesan Fries",
            description: "Crispy skin-on fries tossed in white truffle oil, grated Parmesan cheese, and fresh parsley.",
            price: 5.50,
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            isVeg: true,
            category: "Burgers",
          },
          {
            id: "r1_m4",
            name: "Crispy Onion Rings",
            description: "Beer-battered jumbo white onions fried till golden, served with smoky BBQ dip.",
            price: 4.50,
            image: "https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=800&q=80",
            rating: 4.4,
            isVeg: true,
            category: "Burgers",
          }
        ]
      }
    ],
    featuredDishes: ["f_burger1"]
  },
  {
    id: "r2",
    name: "Naples Stone-Oven Pizza",
    cuisines: ["Pizza", "Italian", "Pasta"],
    rating: 4.9,
    ratingCount: "1.2k+ ratings",
    deliveryTime: 25,
    deliveryFee: 1.99,
    averageCost: 30.00,
    address: "123 Little Italy Way, Metropolis",
    image: "/delicious_pizza.png",
    bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
    menu: [
      {
        name: "Specialty Pizzas",
        items: [
          MOCK_FOODS.pizza1,
          {
            id: "r2_m2",
            name: "Four Cheese White Pizza",
            description: "Mozzarella, Gorgonzola, Parmesan, and fresh ricotta cheeses, drizzled with raw wildflower honey.",
            price: 15.99,
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            isVeg: true,
            category: "Pizza",
          }
        ]
      },
      {
        name: "Desserts & Drinks",
        items: [
          MOCK_FOODS.dessert1,
          MOCK_FOODS.drink1
        ]
      }
    ],
    featuredDishes: ["f_pizza1", "f_dessert1"]
  },
  {
    id: "r3",
    name: "Sakura Premium Sushi",
    cuisines: ["Sushi", "Japanese", "Seafood"],
    rating: 4.7,
    ratingCount: "820 ratings",
    deliveryTime: 30,
    deliveryFee: 2.99,
    averageCost: 45.00,
    address: "888 Cherry Blossom Lane, Gotham",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1600&q=80",
    menu: [
      {
        name: "Signature Rolls",
        items: [
          MOCK_FOODS.sushi1,
          {
            id: "r3_m2",
            name: "Spicy Tuna Crunch Roll",
            description: "Spicy yellowfin tuna, cucumber, wrapped in sushi rice, topped with tempura crunch and spicy sriracha mayo.",
            price: 13.99,
            image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            isVeg: false,
            category: "Sushi",
          }
        ]
      },
      {
        name: "Appetizers",
        items: [
          {
            id: "r3_m3",
            name: "Steamed Edamame",
            description: "Fresh green soybeans steamed in their pods, sprinkled with flaky Maldon sea salt.",
            price: 4.99,
            image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
            rating: 4.5,
            isVeg: true,
            category: "Sushi",
          }
        ]
      }
    ],
    featuredDishes: ["f_sushi1"]
  },
  {
    id: "r4",
    name: "The Green Bowl",
    cuisines: ["Salads", "Healthy", "Vegetarian"],
    rating: 4.6,
    ratingCount: "350 ratings",
    deliveryTime: 18,
    deliveryFee: 0.99,
    averageCost: 20.00,
    address: "42 Wellness Way, Emerald City",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80",
    menu: [
      {
        name: "Bowls & Salads",
        items: [
          MOCK_FOODS.salad1,
          {
            id: "r4_m2",
            name: "Zesty Chickpea Avocado Bowl",
            description: "Spiced chickpeas, organic cherry tomatoes, shredded carrots, baby kale, quinoa, cilantro tahini dressing.",
            price: 10.99,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
            rating: 4.5,
            isVeg: true,
            category: "Salads",
          }
        ]
      }
    ],
    featuredDishes: []
  },
  {
    id: "r5",
    name: "Sugar Rush Desserts",
    cuisines: ["Desserts", "Bakery", "Ice Cream"],
    rating: 4.8,
    ratingCount: "640 ratings",
    deliveryTime: 22,
    deliveryFee: 1.49,
    averageCost: 15.00,
    address: "99 Candyland Avenue, Sweet Town",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1600&q=80",
    menu: [
      {
        name: "Fresh Pastries",
        items: [
          MOCK_FOODS.dessert1,
          {
            id: "r5_m2",
            name: "Warm Cinnamon Apple Tart",
            description: "Flaky puff pastry loaded with caramelized Gala apples, finished with a heavy vanilla glaze.",
            price: 7.50,
            image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            isVeg: true,
            category: "Desserts",
          }
        ]
      }
    ],
    featuredDishes: ["f_dessert1"]
  },
  {
    id: "r6",
    name: "Liquid Oasis Co.",
    cuisines: ["Drinks", "Beverages", "Juices"],
    rating: 4.5,
    ratingCount: "210 ratings",
    deliveryTime: 15,
    deliveryFee: 0.99,
    averageCost: 10.00,
    address: "55 Oasis Way, Desert Springs",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1600&q=80",
    menu: [
      {
        name: "Mocktails & Teas",
        items: [
          MOCK_FOODS.drink1,
          {
            id: "r6_m2",
            name: "Iced Mango Passionfruit Tea",
            description: "Premium black tea brewed with fresh sweet mango puree, passionfruit pulp, and crushed ice.",
            price: 3.99,
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
            rating: 4.6,
            isVeg: true,
            category: "Drinks",
          }
        ]
      }
    ],
    featuredDishes: []
  }
];
