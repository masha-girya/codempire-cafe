import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'modules/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
})
export class OrderModule {}
