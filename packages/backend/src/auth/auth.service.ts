import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserService,
  HashService,
  CreateUserDto as UserDto,
} from 'modules/user';
import { IPayload } from 'utils/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid = await this.hashService
      .comparePassword(password, user.password);

    if (user && isPasswordValid) {
      return user;
    }

    return null;
  }

  async login(user: UserDto) {
    const { email, id: sub } = user;
    const payload: Omit<IPayload, 'iat'> = {
      email,
      sub
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
