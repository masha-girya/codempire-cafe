import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS as AUTH } from '@constants';
import { UserEntity, UserModule } from 'modules/user';
import { HashModule } from 'modules/hash';
import {  AuthService, AuthController } from '../auth';
import { JwtStrategyModule } from './jwt-strategy';
import { LocalStrategyModule } from './local-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
    HashModule,
    JwtStrategyModule,
    LocalStrategyModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
