import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  @ApiOperation({
    summary:
      'List restaurants with search, pagination, sort, and cuisine filter',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'cuisine', required: false })
  @ApiQuery({ name: 'sort', required: false, example: 'rating' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('cuisine') cuisine?: string,
    @Query('sort') sort?: string,
  ) {
    return this.restaurantsService.findAll({
      page,
      limit,
      search,
      cuisine,
      sort,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant details by id' })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }
}
