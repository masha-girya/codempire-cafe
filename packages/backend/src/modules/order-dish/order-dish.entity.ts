import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DishEntity } from 'modules/dish';
import { OrderEntity } from 'modules/order';

@Entity()
export class OrderDishEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  amount: number;

  @Column('uuid')
  dishId: string;

  @Column('uuid')
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderDishes)
  @Exclude()
  order: OrderEntity;

  @ManyToOne(() => DishEntity, (dish) => dish.orderDishes)
  @Exclude()
  dish: DishEntity;
}