import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { DishEntity } from 'modules/dish';
import { UserEntity } from 'modules/user';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  dishesTitle: string[];

  @Column('char', { array: true, length: 255 })
  ingredients: string[];

  @Column('char', { array: true, length: 255 })
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
}
