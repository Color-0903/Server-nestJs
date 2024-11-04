import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { FilterVoucherDto } from './dtos/filter.dto';
import {
  CreateVoucherDto,
  UpdateVoucherDto
} from './dtos/voucher';
import { VoucherRepository } from './voucher.repository';
import { StoreRepository } from '../store/store.repository';
import { GenerateCode, GenerateNumber } from 'src/common/utils/function-util';

@Injectable()
export class VoucherService {
  constructor() {}

  public async getAll(filter: FilterVoucherDto) {
    return await VoucherRepository.getAll(filter);
  }

  public async create(dto: CreateVoucherDto, userId: string) {
    try {

      const code = await `${GenerateNumber(4)}-${GenerateCode(4)}`;
      
      const [store, voucher] = await Promise.all([
        StoreRepository.findOne({ where: { userId, id: dto.storeId } }),
        VoucherRepository.findOne({ where: { code } }),
      ]);
      if(!store) throw new UnauthorizedException();

      if(voucher) throw new ConflictException();

      return await VoucherRepository.save({...dto, userId, code});
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateVoucherDto, userId: string) {
    try {
      const find = await VoucherRepository.findOneBy({ id, userId });

      if (!!find && find.id != id) throw new ConflictException();

      await VoucherRepository.update(id, dto);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async delete(id: string) {
    try {
      const findSize = await VoucherRepository.findOneBy({ id });
      if (!findSize) throw new NotFoundException();

      await VoucherRepository.delete(id);
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
