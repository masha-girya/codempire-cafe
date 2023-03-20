import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import { RolesGuard } from '../roles-strategy';

@Module({
  imports: [JwtStrategyModule, PassportModule],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class RolesModule {}