import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from 'modules/menu/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
})
export class MenuModule {}
