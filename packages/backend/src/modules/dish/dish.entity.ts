import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SORT } from 'types';
import { UserEntity } from 'modules/user';
import { OrderDishEntity } from 'modules/order-dish/order-dish.entity';

@Entity('dish')
export class DishEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column('character varying')
  title: string;

  @Column('character varying')
  description: string;

  @Column('int')
  weight: number;

  @Column('int')
  price: number;

  @Column('character varying', {
    array: true,
    default: [],
  })
  ingredients: string[];

  @Column('character varying', {
    array: true,
    default: [],
  })
  allergens: string[];

  @Column({
    type: 'enum',
    enum: SORT,
  })
  sort: SORT;

  @Column('character varying', {
    array: true,
  })
  categories: string[];

  @Column('character varying', { nullable: true })
  image: string;

  @Column('uuid', { nullable: true })
  userId: string;

  @ManyToOne(
    () => UserEntity, (user) => user.createdDishes,
    { onDelete: 'SET NULL'},
  )
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.editedDishes)
  editedBy: UserEntity;

  @OneToMany(() => OrderDishEntity, (orderDish) => orderDish.dish)
  @Exclude()
  orderDishes: OrderDishEntity[];
}
