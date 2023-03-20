import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreatedDishDto, DishService } from '../dish';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE } from 'utils/types';
import { ROUTE_CONSTANTS } from 'constants/constants';

@Controller(ROUTE_CONSTANTS.DISH)
export class DishController {
  constructor(private readonly dishService: DishService) {}

  // @Role(ROLE.manager)
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllDishes() {
    return this.dishService.getAllDishes();
  }

  @Role(ROLE.manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(ROUTE_CONSTANTS.DISH_ID)
  getDishById(@Param('id') id: string) {
    return this.dishService.getDishById(id);
  }

  @Post()
  addDish(@Body() dishDto: CreatedDishDto) {
    return this.dishService.addDish(dishDto);
  }

  @Patch(ROUTE_CONSTANTS.DISH_ID)
  updateDish(@Param('id') id: string, @Body() updatedDishDto: CreatedDishDto) {
    return this.dishService.updateDish(id, updatedDishDto);
  }

  @Delete(ROUTE_CONSTANTS.DISH_ID)
  removeDish(@Param('id') id: string) {
    return this.dishService.removeDish(id);
  }
}
