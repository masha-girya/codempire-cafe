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
import { UpdatedMenuDto, MenuService } from '../menu';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';

@Controller(ROUTE.MENU)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenus(@Query('filter') filter: string[] | string, sortBy: string) {
    return this.menuService.getMenus(filter, sortBy);
  }

  @Get(ROUTE.QUERY)
  getByQuery(@Query('query') query: string) {
    if(query.length === 0) {
      return [];
    }

    return this.menuService.getByQuery(query);
  }

  @Get(ROUTE.ID)
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Get(ROUTE.RECOMMENDED)
  getRecommended(@Param('id') id: string) {
    return this.menuService.getRecommended(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addMenu(
    @Body() menuDto: UpdatedMenuDto,
    @UploadedFile() image: Express.Multer.File,
    ) {
    const bufferImage = Buffer.from(image.buffer);

    return this.menuService.addMenu(menuDto, bufferImage);
  }

  @Role(ROLE.manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(ROUTE.ID)
  @UseInterceptors(FileInterceptor('image'))
  updateMenu(
    @Param('id') id: string,
    @Body() updatedMenuDto: UpdatedMenuDto,
    @UploadedFile() image?: Express.Multer.File) {
    let bufferImage = null;

    if(image) {
      bufferImage = Buffer.from(image.buffer);
    }

    return this.menuService.updateMenu(id, updatedMenuDto, bufferImage);
  }

  @Delete(ROUTE.ID)
  removeMenu(@Param('id') id: string) {
    return this.menuService.removeMenu(id);
  }
}
