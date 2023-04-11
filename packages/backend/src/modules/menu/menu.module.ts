import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import {
  MenuEntity,
  MenuService,
  MenuController,
} from '../menu';
import { DishModule } from 'modules/dish';
import { AUTH_CONSTANTS as AUTH } from '@constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    JwtStrategyModule,
    forwardRef(() => DishModule),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
  ],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService]
})
export class MenuModule {}
