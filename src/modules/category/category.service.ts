import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { FilterCategoryDto } from './dtos/filter.dto';

@Injectable()
export class CategoryService {
  constructor() {}

  public async getAll(filter: FilterCategoryDto) {
    return await CategoryRepository.getAll(filter);
  }

  public async create(dto: CreateCategoryDto) {
    try {
      const findCategory = await CategoryRepository.findOneBy({ name: dto.name });
      if (!!findCategory) throw new ConflictException();

      return await CategoryRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateCategoryDto) {
    try {
      const findCategory = await CategoryRepository.findOneBy({ name: dto?.name });

      if (!!findCategory && findCategory.id != id) throw new ConflictException();

      await CategoryRepository.update(id, dto);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findCategory = await CategoryRepository.findOneBy({ id });
      if (!findCategory) throw new NotFoundException();

      await CategoryRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
