import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { UserService, CreateUserDto } from '../user';
import { IPassword, ROLE } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(ROUTE.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Role(ROLE.manager)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(ROUTE.ID)
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id, 'id');
  }

  @Post(ROUTE.USER_REGISTER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(ROUTE.USER_UPDATE)
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    let bufferAvatar = null;

    if(avatar) {
      bufferAvatar = Buffer.from(avatar.buffer);
    }

    return this.userService.updateUser(id, createUserDto, bufferAvatar);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(ROUTE.USER_CHANGE_PASS)
  changePassword(
    @Param('id') id: string,
    @Body() passwords: IPassword,
  ) {
    return this.userService.changePassword(id, passwords);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(ROUTE.ID)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
