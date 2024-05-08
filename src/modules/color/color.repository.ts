import dataSource from 'src/database/data-source';
import { Color } from 'src/database/entities/color.entity';
import { Brackets } from 'typeorm';
import { FilterColorDto } from './dtos/filter.dto';

export const ColorRepository = dataSource.getRepository(Color).extend({
  async getAll(filter: FilterColorDto) {
    const query = ColorRepository.createQueryBuilder('color');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`color.name like :name${index}`, {
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
