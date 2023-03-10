import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS as AUTH } from 'constants/constants';
import { UserEntity, UserService, HashService } from 'modules/user';
import {
  AuthService,
  LocalStrategy,
  AuthController,
  JwtStrategy,
} from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    HashService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
