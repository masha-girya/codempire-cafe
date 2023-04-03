import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from 'modules/hash';
import { UserEntity, UserModule } from 'modules/user';
import { OrderModule, OrderEntity } from 'modules/order';
import { DishModule, DishEntity } from 'modules/dish';
import { MenuModule, MenuEntity } from 'modules/menu';
import { DB_CONSTANTS as DB } from '@constants';
import { AuthModule } from 'auth';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB.HOST,
      username: DB.USERNAME,
      password: DB.PASSWORD,
      database: DB.NAME,
      entities: [UserEntity, OrderEntity, DishEntity, MenuEntity],
      synchronize: true,
    }),
    HashModule,
    AuthModule,
    UserModule,
    DishModule,
    OrderModule,
    MenuModule,
  ],
})
export class AppModule {}
