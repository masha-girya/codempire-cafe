import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import {
  ArrayContains,
  ArrayOverlap,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, CreatedOrderDto } from '../order';
import { UserService } from 'modules/user';
import { DishService } from 'modules/dish';
import { MenuService } from 'modules/menu';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => DishService))
    private dishService: DishService,
    @Inject(forwardRef(() => MenuService))
    private menuService: MenuService,
  ) {}

  async getOrders() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async addOrder(createdOrderDto: CreatedOrderDto) {
    const { userId, dishId, menuId } = createdOrderDto;

    const createdOrder = new OrderEntity();
    Object.assign(createdOrder, createdOrderDto);

    const user = await this.userService.getUser(userId, 'id');

    createdOrder.user = user;

    if(dishId) {
      const dishes = await Promise.all(
        dishId.map(async id => (
          await this.dishService.getDishById(id)
        )
      ));

      createdOrder.dishes = await dishes;
    }

    if(menuId) {
      const menus = await Promise.all(
        menuId.map(async id => (
          await this.menuService.getMenuById(id)
        )
      ));

      createdOrder.menus = await menus;
    }

    await this.orderRepository.save(createdOrder);

    return createdOrder;
  }
}
