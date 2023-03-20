import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import { AuthService } from 'auth';
import {
  UserEntity,
  HashService,
  UserService,
  UserController,
} from '../user';
import { AUTH_CONSTANTS as AUTH } from 'constants/constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtStrategyModule,
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
  ],
  providers: [
    UserService,
    HashService,
    AuthService,
  ],
  controllers: [UserController],
  exports: [UserService, HashService],
})
export class UserModule {}
