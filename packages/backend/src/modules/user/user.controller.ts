import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { UserService, CreateUserDto } from '../user';
import { ROLE } from 'utils/types';
import { ROUTE_CONSTANTS } from 'constants/constants';

@Controller(ROUTE_CONSTANTS.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Role(ROLE.manager)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(ROUTE_CONSTANTS.USER_EMAIL)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Post(ROUTE_CONSTANTS.USER_REGISTER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(ROUTE_CONSTANTS.USER_UPDATE)
  updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.updateUser(id, createUserDto);
  }
}
