import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
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
