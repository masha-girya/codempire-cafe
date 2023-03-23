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
import { CreatedMenuDto, MenuService } from '../menu';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE } from 'utils/types';
import { ROUTE_CONSTANTS as ROUTE } from 'constants/constants';

@Controller(ROUTE.MENU)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenus(@Query('filter') filter: string[] | string, sortBy: string) {
    return this.menuService.getMenus(filter, sortBy);
  }

  @Get(ROUTE.MENU_ID)
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addMenu(
    @Body() menuDto: CreatedMenuDto,
    @UploadedFile() image: Express.Multer.File,
    ) {
    const bufferImage = Buffer.from(image.buffer);

    return this.menuService.addMenu(menuDto, bufferImage);
  }

  @Patch(ROUTE.MENU_ID)
  @UseInterceptors(FileInterceptor('image'))
  updateMenu(
    @Param('id') id: string,
    @Body() updatedMenuDto: CreatedMenuDto,
    @UploadedFile() image?: Express.Multer.File) {
    let bufferImage = null;

    if(image) {
      bufferImage = Buffer.from(image.buffer);
    }

    return this.menuService.updateMenu(id, updatedMenuDto, bufferImage);
  }

  @Delete(ROUTE.MENU_ID)
  removeMenu(@Param('id') id: string) {
    return this.menuService.removeMenu(id);
  }
}
