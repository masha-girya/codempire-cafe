import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../menu';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
})
export class MenuModule {}
