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

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('int')
  weight: number;

  @Column('int')
  price: number;

  @Column('char', { array: true })
  ingredients: string[];

  @Column('char', {
    array: true,
    nullable: true,
  })
  allergens: string[];

  @Column({
    type: 'enum',
    enum: SORT,
  })
  sort: SORT;

  @Column('char', { array: true })
  categories: string[];

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user.createdDishes)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.editedDishes)
  editedBy: UserEntity;
}
