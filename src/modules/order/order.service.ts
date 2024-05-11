import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { FilterOrderDto } from './dtos/filter.dto';
import { CreateOrderDto, UpdateOrderDto } from './dtos/order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor() {}

  public async getAll(filter: FilterOrderDto) {
    return await OrderRepository.getAll(filter);
  }

  public async create(dto: CreateOrderDto) {
    try {
     
      console.log(dto);
      return await OrderRepository.save(dto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateOrderDto) {
    try {
      const findOrder = await OrderRepository.findOneBy({ id });

      if (!findOrder) throw new NotFoundException();

      await OrderRepository.save({ ...findOrder, ...dto });
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findOrder = await OrderRepository.findOneBy({ id });
      if (!findOrder) throw new NotFoundException();

      await OrderRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
