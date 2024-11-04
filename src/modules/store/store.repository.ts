import dataSource from 'src/database/data-source';
import { Store } from 'src/database/entities/store.entity';
import { Brackets } from 'typeorm';
import { FilterStoreDto } from './dtos/filter.dto';

export const StoreRepository = dataSource.getRepository(Store).extend({
  async getAll(filter: FilterStoreDto) {
    const query = StoreRepository.createQueryBuilder('store');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`store.name like :name${index}`, {
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
