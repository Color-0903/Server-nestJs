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
