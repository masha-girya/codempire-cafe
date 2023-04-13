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
    const arrayStatus = Array.isArray(status) ? status : [status];

    return this.orderService.getOrders(arrayStatus, sortBy);
  }

  @Get(ROUTE.NUMBER)
  getOrderByNumber(@Param('number') number: string) {
    return this.orderService.getOrder(number, 'number');
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() createdOderDto: CreatedOrderDto) {
    return this.orderService.addOrder(createdOderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(ROUTE.ORDER_UPDATE)
  updateOrder(
    @Param('number') number: string,
    @Body() createdOderDto: CreatedOrderDto,
  ) {
    return this.orderService.updateOrder(number, createdOderDto);
  }
}
