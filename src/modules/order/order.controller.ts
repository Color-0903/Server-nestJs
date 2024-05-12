import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { FilterOrderDto } from './dtos/filter.dto';
import { CreateOrderDto, UpdateOrderDto } from './dtos/order.dto';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
@ApiBearerAuth()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('')
  @ApiOkResponsePaginated(Order)
  // @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterOrderDto) {
    return this.orderService.getAll(filter);
  }
  @Get(':id')
  // @Allow(Permission.Authenticated)
  async getById(@Param('id') id: string) {
    return OrderRepository.findOne({
      where: { id },
      relations:{
        order_detail: true,
         user: true
      }
    });
  }
  @Post('')
  @Allow(Permission.Authenticated)
  async create(@Body() dto: CreateOrderDto, @UserReq() userR: User) {
    return this.orderService.create({ ...dto, userId: userR?.id });
  }

  @Patch(':id')
  @Allow(Permission.Authenticated)
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto, @UserReq() userR: User) {
    return this.orderService.update(id, { ...dto, userId: userR?.id });
  }

  @Delete(':id')
  @Allow(Permission.Authenticated)
  async delete(@Param('id') id: string, @UserReq() userReq: User) {
    return this.orderService.delete(id);
  }
}
