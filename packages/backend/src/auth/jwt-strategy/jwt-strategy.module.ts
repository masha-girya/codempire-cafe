import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt-strategy';
import { AUTH_CONSTANTS as AUTH } from 'constants/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtStrategy, JwtService],
})
export class JwtStrategyModule {}