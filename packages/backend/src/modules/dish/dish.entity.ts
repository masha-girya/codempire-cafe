import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { SORT } from 'utils/types';
import { UserEntity } from 'modules/user';

@Entity('dish')
export class DishEntity {
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

  @Column('char', { array: true, length: 255 })
  ingredients: string[];

  @Column('char', {
    array: true,
    length: 255,
    nullable: true,
  })
  allergens: string[];

  @Column({
    type: 'enum',
    enum: SORT,
  })
  sort: SORT;

  @Column('char', { array: true, length: 255 })
  categories: string[];

  @Column('char',{ nullable: true, length: 255 })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user.createdDishes, { nullable: true })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.editedDishes, { nullable: true })
  editedBy: UserEntity;
}
