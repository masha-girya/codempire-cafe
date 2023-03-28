import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { UserService, CreateUserDto } from '../user';
import { ROLE } from 'utils/types';
import { ROUTE_CONSTANTS as ROUTE } from 'constants/constants';

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
  @Get(ROUTE.USER_EMAIL)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get(ROUTE.USER_ID)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post(ROUTE.USER_REGISTER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(ROUTE.USER_UPDATE)
  updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.updateUser(id, createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(ROUTE.ID)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
