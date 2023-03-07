import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { DishEntity } from 'modules/dish/dish.entity';
import { UserEntity } from 'modules/user/user.entity';

@Entity('menu')
export class MenuEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.createdMenus)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.editedMenus)
  editedBy: UserEntity;

  @ManyToMany(() => DishEntity)
  @JoinTable()
  dishes: DishEntity[];
}
