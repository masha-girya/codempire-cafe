import {
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import {
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, CreatedOrderDto } from '../order';
import { UserService } from 'modules/user';
import { DishService } from 'modules/dish';
import { MenuService } from 'modules/menu';
import { OrderDishService } from 'modules/order-dish';
import { OrderMenuService } from 'modules/order-menu';

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
    @Inject(forwardRef(() => OrderDishService))
    private orderDishService: OrderDishService,
    @Inject(forwardRef(() => OrderMenuService))
    private orderMenuService: OrderMenuService,
  ) {}

  async getOrders() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async getOrderById(id: string) {
    const orders = await this.orderRepository.findOneBy({ id });
    return orders;
  }

  async addOrderDish(dishId: string[], createdOrder: CreatedOrderDto) {
    const dishes = await Promise.all(
      dishId.map(id => (
        this.dishService.getDishById(id)
      ))
    );

    for(const dish of dishes) {
      const dishToAdd = await this.orderDishService
        .createOrderDish(dish, createdOrder);

      createdOrder.orderDishes.push(dishToAdd);
    }
  }

  async addOrderMenu(menuId: string[], createdOrder: CreatedOrderDto) {
    const menus = await Promise.all(
      menuId.map(id => (
        this.menuService.getMenuById(id)
      )),
    );

    for(const menu of menus) {
      const menuToAdd = await this.orderMenuService
        .createOrderMenu(menu, createdOrder);

      createdOrder.orderMenus.push(menuToAdd);
    }
  }

  async addOrder(createdOrderDto: CreatedOrderDto) {
    const { userId, dishId, menuId } = createdOrderDto;

    const createdOrder = new OrderEntity();
    Object.assign(createdOrder, createdOrderDto);

    const user = await this.userService.getUser(userId, 'id');

    createdOrder.user = user;
    createdOrder.orderDishes = [];
    createdOrder.orderMenus = [];

    await this.orderRepository.save(createdOrder);

    await this.addOrderDish(dishId, createdOrder);
    await this.addOrderMenu(menuId, createdOrder);

    await this.orderRepository.save(createdOrder);

    return createdOrder.id;
  }
}
