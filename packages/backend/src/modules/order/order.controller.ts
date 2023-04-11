import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';
import { CreatedOrderDto, OrderService } from '../order';

@Controller(ROUTE.ORDER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get(ROUTE.ID)
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  addOrder(@Body() createdOderDto: CreatedOrderDto) {
    return this.orderService.addOrder(createdOderDto);
  }
}
