import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import {
  DishEntity,
  DishService,
  DishController,
} from '../dish';
import { OrderDishModule } from 'modules/order-dish';
import { MenuModule } from 'modules/menu';
import { OrderModule } from 'modules/order';
import { UserModule } from 'modules/user';
import { AUTH_CONSTANTS as AUTH } from '@constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([DishEntity]),
    JwtStrategyModule,
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: AUTH.JWT_EXPIRES },
    }),
    forwardRef(() => OrderDishModule),
    forwardRef(() => OrderModule),
    forwardRef(() => MenuModule),
    forwardRef(() => UserModule),
  ],
  providers: [
    DishService,
  ],
  controllers: [DishController],
  exports: [DishService],
})
export class DishModule {}
