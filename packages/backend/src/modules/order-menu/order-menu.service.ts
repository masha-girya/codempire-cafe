import { Injectable } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenuEntity, CreatedOrderMenuDto } from '../order-menu';
import { CreatedMenuDto } from 'modules/menu';
import { CreatedOrderDto } from 'modules/order';
import { STATUS } from 'types';

@Injectable()
export class OrderMenuService {
  constructor(
    @InjectRepository(OrderMenuEntity)
    private orderMenuRepository: Repository<OrderMenuEntity>,
  ) {}

  async getAll() {
    return await this.orderMenuRepository.find();
  }

  async findExistingMenu(menuId: string, orderId: string) {
    const menuExistsInOrder = await this.orderMenuRepository.findOne({
      where: {
        menuId,
        orderId,
      },
    });

    return menuExistsInOrder;
  }

  async addExistingMenu(createdOrderMenuDto: CreatedOrderMenuDto) {
    createdOrderMenuDto.amount += 1;
    await this.orderMenuRepository.save(createdOrderMenuDto);

    return createdOrderMenuDto;
  }

  async addOrderMenu(createdOrderMenuDto: Partial<CreatedOrderMenuDto>) {
    const menuToAdd = new OrderMenuEntity();

    Object.assign(menuToAdd, createdOrderMenuDto);

    await this.orderMenuRepository.save(menuToAdd);

    return menuToAdd;
  }

  async createOrderMenu(
    createdMenuDto: CreatedMenuDto,
    createdOrder: CreatedOrderDto,
  ) {
    const menuExists = await this.findExistingMenu(createdMenuDto.id, createdOrder.id);

      let menuToAdd;

      if(menuExists) {
        menuToAdd = await this.addExistingMenu(menuExists);
      } else {
        menuToAdd = await this.addOrderMenu({
          menu: createdMenuDto,
          menuId: createdMenuDto.id,
          order: createdOrder,
          orderId: createdOrder.id,
          amount: 1,
        });
    }

    return menuToAdd;
  }

  async getOrderDishesStatus(menuId: string) {
    const orders = await this.orderMenuRepository.find({
      where: {
        menuId,
      },
      relations: ['order'],
    });

    const status = orders
      .filter(orderDish => orderDish.order.status !== STATUS.delivered)
      .map(order => order.order.status);

    return status;
  }

  async removeOrderDishes(id: string) {
    await this.orderMenuRepository.delete(id);
  }
}
