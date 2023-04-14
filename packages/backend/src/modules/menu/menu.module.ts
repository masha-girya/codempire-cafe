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
import { OrderMenuModule } from 'modules/order-menu';
import { OrderModule } from 'modules/order';
import { AUTH_CONSTANTS as AUTH } from '@constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    JwtStrategyModule,
    forwardRef(() => DishModule),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: AUTH.JWT_EXPIRES },
    }),
    forwardRef(() => OrderMenuModule),
    forwardRef(() => OrderModule),
  ],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService]
})
export class MenuModule {}
