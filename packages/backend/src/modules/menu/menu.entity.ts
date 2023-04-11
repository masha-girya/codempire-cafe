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
    nullable: true,
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
    nullable: true,
  })
  allergens: string[];

  @Column('char', {
    array: true,
    length: 255,
    nullable: true,
  })
  dishesId: string[];

  @ManyToOne(() => UserEntity, (user) => user.createdMenus)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.editedMenus)
  editedBy: UserEntity;

  @ManyToMany(() => DishEntity)
  @JoinTable()
  dishes: DishEntity[];

  @OneToMany(() => OrderMenuEntity, (orderMenus) => orderMenus.menu)
  @Exclude()
  orderMenus: OrderMenuEntity[];
}
