import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'modules/user/user.service';
import { CreateUserDto } from 'modules/user/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getUserByEmail(@Param() param) {
    return this.userService.getUserByEmail(param.email);
  }

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}