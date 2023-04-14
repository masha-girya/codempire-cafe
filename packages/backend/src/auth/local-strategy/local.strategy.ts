import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'auth';
import { CreateUserDto as UserDto } from 'modules/user';
import { ERROR_CONSTANTS as ERROR } from '@constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string
  ): Promise<UserDto> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(ERROR.LOGIN);
    }

    return user;
  }
}
