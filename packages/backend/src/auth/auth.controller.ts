import {
  Controller,
  Request,
  UseGuards,
  Post,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-strategy';
import { JwtAuthGuard } from './jwt-strategy';
import { AuthService } from '../auth';
import { AuthenticatedRequest } from 'types';
import { ROUTE_CONSTANTS } from '@constants';


@Controller(ROUTE_CONSTANTS.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(ROUTE_CONSTANTS.AUTH_LOGIN)
  async login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(ROUTE_CONSTANTS.AUTH_PROFILE)
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
