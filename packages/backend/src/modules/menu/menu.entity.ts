import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DishEntity } from 'modules/dish';
import { UserEntity } from 'modules/user';
import { OrderMenuEntity } from 'modules/order-menu';

@Entity('menu')
export class MenuEntity {
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

  @Column('character varying', { nullable: true })
  image: string;

  @Column('character varying',{
    array: true,
  })
  ingredients: string[];

  @Column('character varying', {
    array: true,
    nullable: true,
  })
  categories: string[];

  @Column('char', {
    array: true,
    length: 255,
    default: [],
  })
  allergens: string[];

  @Column('char', {
    array: true,
    length: 255,
    nullable: true,
  })
  dishesId: string[];

  @Column('uuid', { nullable: true })
  userId: string;

  @ManyToOne(
    () => UserEntity, (user) => user.createdMenus,
    { nullable: true, onDelete: 'SET NULL' },
  )
  createdBy: UserEntity;

  @ManyToOne(
    () => UserEntity, (user) => user.editedMenus,
    { nullable: true, onDelete: 'SET NULL' },
  )
  editedBy: UserEntity;

  @ManyToMany(() => DishEntity)
  @JoinTable()
  dishes: DishEntity[];

  @OneToMany(() => OrderMenuEntity, (orderMenus) => orderMenus.menu)
  @Exclude()
  orderMenus: OrderMenuEntity[];
}
