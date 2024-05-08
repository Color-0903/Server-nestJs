import dataSource from 'src/database/data-source';
import { Size } from 'src/database/entities/size.entity';
import { Brackets } from 'typeorm';
import { FilterSizeDto } from './dtos/filter.dto';

export const SizeRepository = dataSource.getRepository(Size).extend({
  async getAll(filter: FilterSizeDto) {
    const query = SizeRepository.createQueryBuilder('size');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`size.name like :name${index}`, {
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
