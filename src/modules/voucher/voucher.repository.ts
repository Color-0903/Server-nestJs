import dataSource from 'src/database/data-source';
import { Voucher } from 'src/database/entities/voucher.entity';
import { Brackets } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { FilterUserVoucher, FilterVoucherDto } from './dtos/filter.dto';
import { VoucherHistory } from 'src/database/entities/voucher-history.entity';

export const VoucherRepository = dataSource.getRepository(Voucher).extend({
  async getAll(filter: FilterVoucherDto) {
    const query = VoucherRepository.createQueryBuilder('voucher');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q
              .where(`voucher.name like :name${index}`, {
                [`name${index}`]: `%${text.trim()}%`,
              })
              .orWhere(`voucher.code like :code${index}`, {
                [`code${index}`]: `%${text.trim()}%`,
              }),
          ),
        );
      });
    }

    if (filter?.userId) {
      query.andWhere('voucher.userId = :userId', { userId: filter.userId });
    }

    if (filter?.storeId) {
      query.andWhere('voucher.storeId = :storeId', { storeId: filter.storeId });
    }

    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
    });
    return result;
  },

  async userVoucher(filter: FilterUserVoucher, userId: string) {
    const voucherIds = (await VoucherRepository.find({ where: { userId }, select: ['id'] }))?.map(
      (item) => item.id,
    );
    const query = UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.asset', 'asset')
      .leftJoinAndMapMany('user.vouchers', Voucher, 'voucher', 'voucher.id IN (:...voucherIds)', {
        voucherIds,
      })
      .andWhere(
        'EXISTS (SELECT * from user_voucher uv where uv.voucherId IN (:...voucherIds) AND uv.usersId = user.id)',
        { voucherIds },
      );

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q
              .where(`user.displayName like :displayName${index}`, {
                [`displayName${index}`]: `%${text.trim()}%`,
              })
              .andWhere(`user.identifier like :identifier${index}`, {
                [`identifier${index}`]: `%${text.trim()}%`,
              }),
          ),
        );
      });
    }

    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
    });
    return result;
  },
});
export const VoucherHistoryRepository = dataSource.getRepository(VoucherHistory).extend({
  async getAll(filter: FilterUserVoucher, userId: string) {
    console.log('run vod ay');
    const query = VoucherHistoryRepository.createQueryBuilder('history').leftJoinAndSelect(
      'history.voucher',
      'voucher',
      'voucher.userId = :userId',
      { userId },
    );

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q
              .where(`voucher.name like :name${index}`, {
                [`name${index}`]: `%${text.trim()}%`,
              })
              .orWhere(`voucher.code like :code${index}`, {
                [`code${index}`]: `%${text.trim()}%`,
              }),
          ),
        );
      });
    }

    if (filter?.storeId) {
      query.andWhere('voucher.storeId = :storeId', { storeId: filter.storeId });
    }

    if (filter?.from) {
      query.andWhere('history.createdOnDate >= :from', { from: filter?.from });
    }

    if (filter?.to) {
      query.andWhere('history.createdOnDate <= :to', { to: filter?.to });
    }

    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
    });
    return result;
  },
});
