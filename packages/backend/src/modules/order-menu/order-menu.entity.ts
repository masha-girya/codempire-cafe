import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { MenuEntity } from 'modules/menu';
import { OrderEntity } from 'modules/order';

@Entity()
export class OrderMenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  amount: number;

  @Column('uuid')
  menuId: string;

  @Column('uuid')
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderMenus)
  @Exclude()
  order: OrderEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.orderMenus)
  @Exclude()
  menu: MenuEntity;
}