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
import { ROLE, STATUS } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';
import { CreatedOrderDto, OrderService } from '../order';

@Controller(ROUTE.ORDER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(
    @Query('status') status: STATUS[],
    @Query('sortBy') sortBy: string,
  ) {
    return this.orderService.getOrders(status, sortBy);
  }

  @Get(ROUTE.ID)
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() createdOderDto: CreatedOrderDto) {
    return this.orderService.addOrder(createdOderDto);
  }
}
