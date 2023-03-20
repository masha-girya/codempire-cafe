import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IPayload } from 'utils/types';
import { AUTH_CONSTANTS as AUTH } from 'constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH.JWT_SECRET,
    });
  }

  async validate(payload: Omit<IPayload, 'iat'>) {
    const { email, role, sub: id } = payload;

    return {
      id,
      email,
      role,
    };
  }
}
