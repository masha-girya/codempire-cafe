import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { STATUS } from 'utils/types';
import { UserEntity } from 'modules/user';
import { DishEntity } from 'modules/dish';
import { MenuEntity } from 'modules/menu';

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

  @Generated('increment')
  number: number;

  @Column('int', {
    nullable: true,
  })
  mark: number;

  @Column()
  address: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToMany(() => DishEntity)
  @JoinTable()
  dishes: DishEntity[];

  @ManyToMany(() => MenuEntity)
  @JoinTable()
  menus: MenuEntity[];
}
