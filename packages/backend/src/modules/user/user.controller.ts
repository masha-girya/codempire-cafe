import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ROUTE_CONSTANTS } from 'constants/constants';
import { UserService, CreateUserDto } from 'modules/user';


@Controller(ROUTE_CONSTANTS.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(ROUTE_CONSTANTS.USER_EMAIL)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Post(ROUTE_CONSTANTS.USER_REGISTER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
