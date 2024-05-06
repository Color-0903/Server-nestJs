import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { SizeRepository } from './size.repository';
import { FilterSizeDto } from './dtos/filter.dto';
import { CreateSizeDto, UpdateSizeDto } from './dtos/size';

@Injectable()
export class SizeService {
  constructor() {}

  public async getAll(filter: FilterSizeDto) {
    return await SizeRepository.getAll(filter);
  }

  public async create(dto: CreateSizeDto) {
    try {
      const findSize = await SizeRepository.findOneBy({ name: dto.name });
      if (!!findSize) throw new ConflictException();

      return await SizeRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateSizeDto) {
    try {
      const findSize = await SizeRepository.findOneBy({ name: dto?.name });

      if (!!findSize && findSize.id != id) throw new ConflictException();

      await SizeRepository.update(id, dto);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findSize = await SizeRepository.findOneBy({ id });
      if (!findSize) throw new NotFoundException();

      await SizeRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
