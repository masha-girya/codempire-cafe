import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatedDishDto, DishService } from '../dish';
import { Role, RolesGuard } from 'auth/roles-strategy';
import { JwtAuthGuard } from 'auth/jwt-strategy';
import { ROLE, SORT } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from '@constants';
import { CreatedOrderDto, OrderService } from '../order';

@Controller(ROUTE.ORDER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  addOrder(@Body() createdOderDto: CreatedOrderDto) {
    return this.orderService.addOrder(createdOderDto);
  }
}
