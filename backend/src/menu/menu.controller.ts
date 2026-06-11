import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('restaurants/:id/menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Get menu categories and items for a restaurant' })
  getMenu(@Param('id') id: string) {
    return this.menuService.getMenuByRestaurant(id);
  }
}
