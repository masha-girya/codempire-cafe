import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatedOrderDto } from 'modules/order';
import { CreatedDishDto } from 'modules/dish';
import { OrderDishEntity, CreatedOrderDishDto } from '../order-dish';

@Injectable()
export class OrderDishService {
  constructor(
    @InjectRepository(OrderDishEntity)
    private orderDishRepository: Repository<OrderDishEntity>,
  ) {}

  async getAll() {
    return await this.orderDishRepository.find();
  }

  async findExistingDish(dishId: string, orderId: string) {
    const dishExistsInOrder = await this.orderDishRepository.findOne({
      where: {
        dishId,
        orderId,
      },
    });

    return dishExistsInOrder;
  }

  async addExistingDish(createdOrderDishDto: CreatedOrderDishDto) {
    createdOrderDishDto.amount += 1;
    await this.orderDishRepository.save(createdOrderDishDto);

    return createdOrderDishDto;
  }

  async addOrderDish(createdOrderDishDto: Partial<CreatedOrderDishDto>) {
    const dishToAdd = new OrderDishEntity();

    Object.assign(dishToAdd, createdOrderDishDto);

    await this.orderDishRepository.save(dishToAdd);

    return dishToAdd;
  }

  async createOrderDish(
    createdDishDto: CreatedDishDto,
    createdOrder: CreatedOrderDto,
  ) {
    const dishExists = await this.findExistingDish(createdDishDto.id, createdOrder.id);

    let dishToAdd;

    if(dishExists) {
      dishToAdd = await this.addExistingDish(dishExists);
    } else {
      dishToAdd = await this.addOrderDish({
        dish: createdDishDto,
        dishId: createdDishDto.id,
        order: createdOrder,
        orderId: createdOrder.id,
        amount: 1,
      });
    }

    return dishToAdd;
  }
}
