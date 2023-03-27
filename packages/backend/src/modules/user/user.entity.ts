import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { ROLE } from 'utils/types';
import { OrderEntity } from 'modules/order';
import { MenuEntity } from 'modules/menu';
import { DishEntity } from 'modules/dish';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  surname: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column('character varying', {
    array: true,
    default: [],
  })
  address: string[];

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.user,
  })
  role: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => MenuEntity, (menu) => menu.createdBy)
  createdMenus: MenuEntity[];

  @OneToMany(() => MenuEntity, (menu) => menu.editedBy)
  editedMenus: MenuEntity[];

  @OneToMany(() => DishEntity, (dish) => dish.editedBy)
  createdDishes: DishEntity[];

  @OneToMany(() => DishEntity, (dish) => dish.editedBy)
  editedDishes: DishEntity[];
}
