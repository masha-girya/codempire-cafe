import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import {
  OrderController,
  OrderEntity,
  OrderService,
} from '../order';
import { UserModule } from 'modules/user';
import { JwtStrategyModule } from 'auth/jwt-strategy';
import { HashModule } from 'modules/hash';
import { DishModule } from 'modules/dish';
import { MenuModule } from 'modules/menu';
import { OrderDishModule } from 'modules/order-dish';
import { OrderMenuModule } from 'modules/order-menu';
import { AUTH_CONSTANTS as AUTH } from '@constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    JwtModule.register({
      secret: AUTH.JWT_SECRET,
      signOptions: { expiresIn: '120d' },
    }),
    JwtStrategyModule,
    HashModule,
    forwardRef(() => OrderDishModule),
    forwardRef(() => OrderMenuModule),
    forwardRef(() => UserModule),
    forwardRef(() => DishModule),
    forwardRef(() => MenuModule),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
