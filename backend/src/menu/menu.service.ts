import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenuByRestaurant(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        categories: {
          include: {
            menuItems: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return {
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        cuisineType: restaurant.cuisineType,
        categories: restaurant.categories,
      },
    };
  }
}
