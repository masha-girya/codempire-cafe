import {
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, CreatedOrderDto } from '../order';
import { UserService } from 'modules/user';
import { DishService } from 'modules/dish';
import { MenuService } from 'modules/menu';
import { OrderDishService } from 'modules/order-dish';
import { OrderMenuService } from 'modules/order-menu';
import { STATUS } from 'types';

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

  async getOrders(status: STATUS[], sortBy: string) {
    const arrayStatus = Array.isArray(status) ? status : [status];

    const orders = await this.orderRepository.find({
      where: {
        status: In(arrayStatus),
      },
      order: {
        date: sortBy === 'oldest' ? 'ASC' : 'DESC',
      }
    });

    const response = await Promise.all(orders.map(async(order) => {
      const [ dishesNames, menusNames ] = await Promise.all([
        await this.dishService.getDishNamesById(order.dishId),
        await this.menuService.getMenuNamesById(order.menuId),
      ]);

      order.dishId = dishesNames;
      order.menuId = menusNames;

      return order;
    }));

    return response;
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    return order;
  }

  async addOrderDish(dishId: string[], createdOrder: CreatedOrderDto) {
    const dishes = await Promise.all(
      dishId.map(id => (
        this.dishService.getDishById(id)
      ))
    );

    const dishesToAdd = [];

    for(const dish of dishes) {
      const dishToAdd = await this.orderDishService
        .createOrderDish(dish, createdOrder);
      dishesToAdd.push(dishToAdd);
    }

    return dishesToAdd;
  }

  async addOrderMenu(menuId: string[], createdOrder: CreatedOrderDto) {
    const menus = await Promise.all(
      menuId.map(id => (
        this.menuService.getMenuById(id)
      )),
    );

    const menusToAdd = [];

    for(const menu of menus) {
      const menuToAdd = await this.orderMenuService
        .createOrderMenu(menu, createdOrder);

      menusToAdd.push(menuToAdd);
    }

    return menusToAdd;
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

    const [ dishesToAdd, menusToAdd ] = await Promise.all([
      this.addOrderDish(dishId, createdOrder),
      this.addOrderMenu(menuId, createdOrder),
    ]);

    createdOrder.orderDishes = dishesToAdd;
    createdOrder.orderMenus = menusToAdd;

    await this.orderRepository.save(createdOrder);

    return createdOrder.id;
  }
}
