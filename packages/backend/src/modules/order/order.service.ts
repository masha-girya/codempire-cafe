import {
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { ArrayContains, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, CreatedOrderDto } from '../order';
import { CreateUserDto, UserService } from 'modules/user';
import { DishService } from 'modules/dish';
import { MenuService } from 'modules/menu';
import { OrderDishService } from 'modules/order-dish';
import { OrderMenuService } from 'modules/order-menu';
import { ROLE, STATUS, TOrderKey } from 'types';

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

  async getOrders(status: STATUS[], sortBy: string, user: CreateUserDto) {
    const isUser = user.role === ROLE.manager 
      ? { status: In(status) }
      : { status: In(status), userId: user.id };

    const orders = await this.orderRepository.find({
      where: {
        ...isUser,
      },
      order: {
        date: sortBy === 'oldest' ? 'ASC' : 'DESC',
      }
    });

    const response = await Promise.all(orders.map(async(order) => {
      const [ dishesNames, menusNames ] = await Promise.all([
        this.dishService.getDishNamesById(order.dishId),
        this.menuService.getMenuNamesById(order.menuId),
      ]);

      order.dishId = dishesNames;
      order.menuId = menusNames;

      return order;
    }));

    return response;
  }

  async getOrder(key: string, keyName: string) {
    switch(keyName) {
      case 'id':
      default:
        return await this.orderRepository.findOneBy({ id: key });

      case 'number': {
        const order = await this.orderRepository.findOneBy({ number: Number(key) });
        const user: CreateUserDto = await this.userService.getUser(order.userId, 'id');

        const { name, surname, phone } = user;
        const { id, address, date, status, mark } = order;

        return {
          number: key,
          id,
          name,
          surname,
          address,
          phone,
          date,
          status,
          mark,
        };
      }
    }
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

  async updateOrder(
    number: string,
    createdOrderDto: CreatedOrderDto,
  ) {
    const order = await this.orderRepository.findOneBy({ number: Number(number) });

    Object.assign(order, createdOrderDto);

    await this.orderRepository.save(order);

    return order;
  }

  async removeOrderProduct(key: string, keyName: TOrderKey) {
    const orderKey = keyName === 'menuId' ? 'menuId' : 'dishId';

    const ordersWithKey = await this.orderRepository.find({
      where: {
        [orderKey]: ArrayContains([key]),
      }
    });

    for(const order of ordersWithKey) {
      await this.orderRepository.delete(order.id);
    }
  }
}
