import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS as AUTH } from 'constants/constants';
import {
  UserEntity,
  HashService,
  UserService,
  UserController,
} from '../user';
import {
  AuthService,
  JwtStrategy,
  LocalStrategy,
} from 'auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
  ],
  providers: [
    UserService,
    HashService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
  ],
  controllers: [UserController]
})
export class UserModule {}
