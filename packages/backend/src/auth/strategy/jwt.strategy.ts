import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IPayload } from 'utils/types/payload.type';
import { AUTH_CONSTANTS as AUTH } from 'utils/constants/constants';

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
    return {
      userId: payload.sub,
      userEmail: payload.email
    };
  }
}
