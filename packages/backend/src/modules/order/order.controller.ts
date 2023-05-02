import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { AuthenticatedRequest, STATUS, TWatchStatus } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';
import { CreatedOrderDto, OrderService } from '../order';

@Controller(ROUTE.ORDER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(
    @Request() req: AuthenticatedRequest,
    @Query('status') status: STATUS[],
    @Query('sortBy') sortBy: string,
    @Query('watchedManager') watchedManager?: TWatchStatus,
    @Query('watchedUser') watchedUser?: TWatchStatus,
  ) {
    const query = {
      status: Array.isArray(status) ? status : [status],
      sortBy,
      watchedManager,
      watchedUser,
    };

    return this.orderService.getOrders(query, req.user);
  }

  @UseGuards(JwtAuthGuard)
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
