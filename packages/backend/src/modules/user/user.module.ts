import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import { AuthModule } from 'auth';
import { HashModule } from '../../modules/hash';
import {
  UserEntity,
  UserService,
  UserController,
} from '../user';
import { AUTH_CONSTANTS as AUTH } from '@constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtStrategyModule,
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
    forwardRef(() => AuthModule),
    HashModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
