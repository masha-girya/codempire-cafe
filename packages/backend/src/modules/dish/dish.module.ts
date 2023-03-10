import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from '../dish';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity])],
})
export class DishModule {}
