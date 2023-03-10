import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
})
export class OrderModule {}
