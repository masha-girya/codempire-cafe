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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatedDishDto, DishService } from '../dish';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE, SORT } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';

@Controller(ROUTE.DISH)
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  getDishes(
    @Query('filter') filter: string[] | string,
    @Query('sortBy') sortBy: string,
  ) {
    return this.dishService.getDishes(filter, sortBy);
  }

  @Get(ROUTE.CATEGORIES)
  getCategories() {
    return this.dishService.getCategories();
  }

  @Get(ROUTE.ID)
  getDishById(@Param('id') id: string) {
    return this.dishService.getDishById(id);
  }

  @Get(ROUTE.RECOMMENDED)
  getRecommended(@Param('id') id: string) {
    return this.dishService.getRecommended(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addDish(@Body() dishDto: CreatedDishDto, @UploadedFile() image: Express.Multer.File) {
    const bufferImage = Buffer.from(image.buffer);

    return this.dishService.addDish(dishDto, bufferImage);
  }

  @Patch(ROUTE.ID)
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

  @Delete(ROUTE.ID)
  removeDish(@Param('id') id: string) {
    return this.dishService.removeDish(id);
  }
}
