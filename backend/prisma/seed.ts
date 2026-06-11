import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({} as any);

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@foodapp.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@foodapp.com',
      password: '$2a$10$QJgkTQ55e3wxVbWx/KYGyO7LuEdkGq41kH2MCCZl5k/fdDGpJeA8W',
      role: 'ADMIN',
    },
  });

  const restaurants = [
    {
      name: 'Urban Curry House',
      description: 'Bold Indian flavours with modern plating.',
      image: 'https://example.com/restaurant-1.jpg',
      cuisineType: 'Indian',
      rating: 4.8,
      deliveryTime: 35,
      categories: {
        create: [
          {
            name: 'Starters',
            menuItems: {
              create: [
                {
                  name: 'Paneer Tikka',
                  description: 'Smoky cottage cheese with spices.',
                  price: 8.5,
                  image: 'https://example.com/menu-1.jpg',
                },
                {
                  name: 'Vegetable Samosa',
                  description: 'Crispy pastry packed with potatoes.',
                  price: 4.5,
                },
              ],
            },
          },
          {
            name: 'Mains',
            menuItems: {
              create: [
                {
                  name: 'Butter Chicken',
                  description: 'Creamy tomato curry with tender chicken.',
                  price: 12.5,
                },
                {
                  name: 'Chana Masala',
                  description: 'Spiced chickpeas simmered in sauce.',
                  price: 10.25,
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'Pizza Palace',
      description: 'Wood-fired pizza with fresh toppings.',
      image: 'https://example.com/restaurant-2.jpg',
      cuisineType: 'Italian',
      rating: 4.6,
      deliveryTime: 30,
      categories: {
        create: [
          {
            name: 'Pizza',
            menuItems: {
              create: [
                {
                  name: 'Margherita',
                  description: 'Tomato, mozzarella, basil.',
                  price: 11.0,
                },
                {
                  name: 'Pepperoni',
                  description: 'Pepperoni, cheese, tomato sauce.',
                  price: 13.5,
                },
              ],
            },
          },
          {
            name: 'Sides',
            menuItems: {
              create: [
                {
                  name: 'Garlic Bread',
                  description: 'Toasted bread with garlic butter.',
                  price: 5.0,
                },
              ],
            },
          },
        ],
      },
    },
  ];

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: {
        name: restaurant.name,
        description: restaurant.description,
        image: restaurant.image,
        cuisineType: restaurant.cuisineType,
        rating: restaurant.rating,
        deliveryTime: restaurant.deliveryTime,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
