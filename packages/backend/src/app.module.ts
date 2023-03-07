import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { UserModule } from 'modules/user/user.module';
import { OrderModule } from 'modules/order/order.module';
import { DishModule } from 'modules/dish/dish.module';
import { MenuModule } from 'modules/menu/menu.module';
import { OrderEntity } from 'modules/order/order.entity';
import { DishEntity } from 'modules/dish/dish.entity';
import { MenuEntity } from 'modules/menu/menu.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, OrderEntity, DishEntity, MenuEntity],
      synchronize: true,
    }),
    UserModule,
    OrderModule,
    DishModule,
    MenuModule,
  ],
})
export class AppModule {}
