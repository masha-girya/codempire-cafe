import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { STATUS, TWatchStatus } from 'types';
import { UserEntity } from 'modules/user';
import { OrderDishEntity } from 'modules/order-dish';
import { OrderMenuEntity } from 'modules/order-menu';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp with time zone',
    default: new Date(),
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.created,
  })
  status: string;

  @Column({
    nullable: true,
  })
  comment: string;

  @Column()
  @Generated()
  number: number;

  @Column('int', { nullable: true })
  totalPrice: number;

  @Column('character varying', { nullable: true })
  paymentHash: string;

  @Column('int', { nullable: true })
  mark: number;

  @Column('character varying', { default: 'unwatched' })
  watchedManager: TWatchStatus;

  @Column('character varying', { default: 'watched' })
  watchedUser: TWatchStatus;

  @Column('character varying')
  address: string;

  @Column('uuid')
  userId: string;

  @Column('character varying', {
    nullable: true,
    default: [],
    array: true,
  })
  dishId: string[];

  @Column('character varying', {
    nullable: true,
    default: [],
    array: true,
  })
  menuId: string[];

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderDishEntity, (orderDishes) => orderDishes.order, { cascade: true })
  @Exclude()
  orderDishes: OrderDishEntity[];

  @OneToMany(() => OrderMenuEntity, (orderMenus) => orderMenus.order, { cascade: true })
  @Exclude()
  orderMenus: OrderMenuEntity[];
}
