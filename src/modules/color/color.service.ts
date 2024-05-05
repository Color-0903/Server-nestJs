import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterColorDto } from './dtos/filter.dto';
import { CreateColorDto, UpdateColorDto } from './dtos/color.dto';
import { ColorRepository } from './color.repository';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';

@Injectable()
export class ColorService {
  constructor() {}

  public async getAll(filter: FilterColorDto) {}

  public async create(dto: CreateColorDto) {
    try {
      const findColor = await ColorRepository.findOneBy({ name: dto.name });
      if (!!findColor) throw new ConflictException();

      return await ColorRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateColorDto) {
    try {
      const findColor = await ColorRepository.findOneBy({ name: dto?.name });

      if (!!findColor && findColor.id != id)
        throw new ConflictException();

      await ColorRepository.update(id, dto);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findColor = await ColorRepository.findOneBy({ id });
      if (!findColor) throw new NotFoundException();

      await ColorRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
