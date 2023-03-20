import { UserModule } from '@modules/user';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import { LocalStrategy } from '../local-strategy';
import { AuthService } from 'auth';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    forwardRef(() => JwtStrategyModule),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, LocalStrategy],
})
export class LocalStrategyModule {}