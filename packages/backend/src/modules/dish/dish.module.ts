import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from 'modules/dish/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity])],
})
export class DishModule {}
