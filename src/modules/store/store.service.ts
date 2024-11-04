import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { FilterStoreDto } from './dtos/filter.dto';
import { CreateStoreDto, UpdateStoreDto } from './dtos/store';
import { StoreRepository } from './store.repository';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';

@Injectable()
export class StoreService {
  constructor() {}

  public async getAll(filter: FilterStoreDto) {
    return await StoreRepository.getAll(filter);
  }

  public async create(dto: CreateStoreDto, userId: string) {
    try {
      return await StoreRepository.save({ ...dto, userId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateStoreDto, userId: string) {
    try {
      const find = await StoreRepository.findOneBy({ id, userId });
      if (!find) throw new NotFoundException();
      await StoreRepository.update(id, dto);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string, userId: string) {
    try {
      const findSize = await StoreRepository.findOneBy({ id, userId });
      if (!findSize) throw new NotFoundException();
      await StoreRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
