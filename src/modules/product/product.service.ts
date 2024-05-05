import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterProductDto } from './dtos/filter.dto';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { ProductRepository } from './product.repository';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { SizeRepository } from '../size/size.repository';

@Injectable()
export class ProductService {
  constructor() {}

  public async getAll(filter: FilterProductDto) {}

  public async create(dto: CreateProductDto) {
    try {
      return await ProductRepository.save(dto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateProductDto) {
    try {
      const findProduct = await ProductRepository.findOneBy({ id });

      if (!findProduct) throw new NotFoundException();

      await ProductRepository.save({ ...findProduct, ...dto });
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findProduct = await ProductRepository.findOneBy({ id });
      if (!findProduct) throw new NotFoundException();

      await ProductRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
