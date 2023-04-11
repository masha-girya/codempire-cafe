import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenuEntity, OrderMenuService } from '../order-menu';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderMenuEntity]),
  ],
  providers: [OrderMenuService],
  exports: [OrderMenuService],
})
export class OrderMenuModule {}
