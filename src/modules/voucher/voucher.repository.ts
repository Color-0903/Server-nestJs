import dataSource from 'src/database/data-source';
import { Voucher } from 'src/database/entities/voucher.entity';
import { Brackets } from 'typeorm';
import { FilterVoucherDto } from './dtos/filter.dto';

export const VoucherRepository = dataSource.getRepository(Voucher).extend({
  async getAll(filter: FilterVoucherDto) {
    const query = VoucherRepository.createQueryBuilder('voucher');

      if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`voucher.name like :name${index}`, {
              [`name${index}`]: `%${text.trim()}%`,
            })
            .orWhere(`voucher.code like :code${index}`, {
              [`code${index}`]: `%${text.trim()}%`,
            })
          ),
        );
      });
    }
    
    if(filter?.userId) {
      query.andWhere('voucher.userId = :userId', { userId: filter.userId });
    }

    if(filter?.storeId) {
      query.andWhere('voucher.storeId = :storeId', { storeId: filter.storeId });
    }

    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
    });
    return result;
  },
});
