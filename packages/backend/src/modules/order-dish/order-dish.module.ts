import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDishEntity, OrderDishService } from '../order-dish';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDishEntity]),
  ],
  providers: [OrderDishService],
  exports: [OrderDishService],
})
export class OrderDishModule {}
