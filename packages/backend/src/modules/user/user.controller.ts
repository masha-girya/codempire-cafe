import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ROUTE_CONSTANTS } from 'constants/constants';
import { UserService, CreateUserDto } from '../user';
import { Role } from 'modules/decorators';
import { ROLE } from 'utils/types';
import { JwtAuthGuard, RolesGuard } from 'auth';

@Controller(ROUTE_CONSTANTS.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role(ROLE.manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Role(ROLE.manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(ROUTE_CONSTANTS.USER_EMAIL)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Post(ROUTE_CONSTANTS.USER_REGISTER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
