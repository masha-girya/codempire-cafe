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
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatedMenuDto, MenuService } from '../menu';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE } from 'utils/types';
import { ROUTE_CONSTANTS } from 'constants/constants';

@Controller(ROUTE_CONSTANTS.MENU)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Role(ROLE.manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(ROUTE_CONSTANTS.MENU_ID)
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

  @Patch(ROUTE_CONSTANTS.MENU_ID)
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

  @Delete(ROUTE_CONSTANTS.MENU_ID)
  removeMenu(@Param('id') id: string) {
    return this.menuService.removeMenu(id);
  }
}
