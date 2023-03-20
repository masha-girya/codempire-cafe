import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS as AUTH } from 'constants/constants';
import { UserEntity, UserService, HashService } from 'modules/user';
import {
  AuthService,
  AuthController,
} from '../auth';
import { JwtStrategyModule } from './jwt-strategy';
import { LocalStrategyModule } from './local-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
    JwtStrategyModule,
    LocalStrategyModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    HashService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
