import dataSource from 'src/database/data-source';
import { Category } from 'src/database/entities/category.entity';
import { Brackets } from 'typeorm';
import { FilterCategoryDto } from './dtos/filter.dto';

export const CategoryRepository = dataSource.getRepository(Category).extend({
  async getAll(filter: FilterCategoryDto) {
    const query = CategoryRepository.createQueryBuilder('cate');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`cate.name like :name${index}`, {
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
