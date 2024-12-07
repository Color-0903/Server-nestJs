import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as moment from 'moment';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';
import { GenerateCode, GenerateNumber, GenerateUrlCode } from 'src/common/utils/function-util';
import dataSource from 'src/database/data-source';
import { In } from 'typeorm';
import { StoreRepository } from '../store/store.repository';
import { FilterUserVoucher, FilterVoucherDto } from './dtos/filter.dto';
import { CreateVoucherDto, RecallVoucherDto, UpdateVoucherDto } from './dtos/voucher';
import { VoucherHistoryRepository, VoucherRepository } from './voucher.repository';
// import { GenerateQrCode } from 'src/common/services/qrCode';

@Injectable()
export class VoucherService {
  constructor() {}

  public async getAll(filter: FilterVoucherDto) {
    return await VoucherRepository.getAll(filter);
  }

  public async create(dto: CreateVoucherDto, userId: string) {
    try {
      const code = await `${GenerateNumber(4)}-${GenerateCode(4)}`;
      const qrCode = GenerateUrlCode(code);

      const [store, voucher] = await Promise.all([
        StoreRepository.findOne({ where: { userId, id: dto.storeId } }),
        VoucherRepository.findOne({ where: { code } }),
      ]);
      if (!store) throw new UnauthorizedException();

      if (voucher) throw new ConflictException();

      return await VoucherRepository.save({ ...dto, userId, code, qrCode });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async userVoucher(filter: FilterUserVoucher, userId: string) {
    try {
      return VoucherRepository.userVoucher(filter, userId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async pickVoucher(id: string, userId: string) {
    const [findVoucher, findUserVoucher] = await Promise.all([
      VoucherRepository.findBy({ id }),
      dataSource
        .createQueryBuilder()
        .select('*')
        .from('user_voucher', 'ur')
        .where('ur.usersId = :userId AND ur.voucherId = :voucherId', {
          userId,
          voucherId: id,
        })
        .getOne(),
    ]);

    if (!findVoucher) throw new NotFoundException();

    if (findUserVoucher) throw new BadRequestException('VOUCHER_PICKED');

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('user_voucher')
        .values({ usersId: userId, voucherId: id })
        .execute();

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async recall(dto: RecallVoucherDto, userId: string) {
    try {
      const voucherIds = (await VoucherRepository.find({ where: { userId }, select: ['id'] }))?.map(
        (item) => item.id,
      );
      if (voucherIds?.length) {
        await dataSource
          .createQueryBuilder()
          .delete()
          .from('user_voucher')
          .where({ usersId: dto.userId, voucherId: In(voucherIds) })
          .execute();
      }
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async active(code: string, userId: string) {
    const findVoucher = await VoucherRepository.findOne({ where: { code } });
    if (!findVoucher) throw new NotFoundException();
    if (findVoucher?.userId != userId) throw new UnauthorizedException();

    if (findVoucher?.quantity < 1) throw new BadRequestException('VOUCHER_LIMITED');

    if (findVoucher?.quantity < 1) throw new BadRequestException('VOUCHER_LIMITED');

    if (findVoucher.expired && moment().isAfter(moment(findVoucher.expired)))
      throw new BadRequestException('VOUCHER_EXPIRED');

    if (findVoucher.releaseAt && moment().isBefore(moment(findVoucher.releaseAt)))
      throw new BadRequestException('VOUCHER_NOT_USE_YET');
    try {
      await Promise.all([
        VoucherRepository.update(findVoucher.id, {
          quantity: +(+findVoucher?.quantity - 1),
          used: +(+findVoucher.used + 1),
        }),
        VoucherHistoryRepository.save({ voucherId: findVoucher.id }),
      ]);

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
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

  public async histories(filter: FilterUserVoucher, userId: string) {
    try {
      return VoucherHistoryRepository.getAll(filter, userId);
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
