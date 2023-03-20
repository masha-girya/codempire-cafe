import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreatedDishDto, DishService } from '../dish';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE } from 'utils/types';
import { ROUTE_CONSTANTS } from 'constants/constants';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('image'))
  addDish(@Body() dishDto: CreatedDishDto, @UploadedFile() image: Express.Multer.File) {
    const bufferImage = Buffer.from(image.buffer);

    return this.dishService.addDish(dishDto, bufferImage);
  }

  @Patch(ROUTE_CONSTANTS.DISH_ID)
  @UseInterceptors(FileInterceptor('image'))
  updateDish(
    @Param('id') id: string,
    @Body() updatedDishDto: CreatedDishDto,
    @UploadedFile() image?: Express.Multer.File) {
    let bufferImage = null;

    if(image) {
      bufferImage = Buffer.from(image.buffer);
    }

    return this.dishService.updateDish(id, updatedDishDto, bufferImage);
  }

  @Delete(ROUTE_CONSTANTS.DISH_ID)
  removeDish(@Param('id') id: string) {
    return this.dishService.removeDish(id);
  }
}
