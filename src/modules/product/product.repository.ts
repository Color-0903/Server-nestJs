import dataSource from 'src/database/data-source';
import { Product } from 'src/database/entities/products.entity';
import { Brackets } from 'typeorm';
import { FilterProductDto } from './dtos/filter.dto';

export const ProductRepository = dataSource.getRepository(Product).extend({
  async getAll(filter: FilterProductDto) {
    const query = ProductRepository.createQueryBuilder(
      'product',
    ).leftJoinAndSelect('product.assets', 'assets');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`product.name like :name${index}`, {
              [`name${index}`]: `%${text.trim()}%`,
            }),
          ),
        );
      });
    }

    if (filter?.categories) {
      query.leftJoinAndSelect('product.categories', 'categories');
      if (Array.isArray(filter.categories)) {
        if (filter.categories.length > 0) {
          query.andWhere('categories.id IN (:...categories)', {
            categories: filter.categories,
          });
        }
      } else
        query.andWhere('categories.id = :categories', {
          categories: filter.categories,
        });
    }

    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
      // sort: filter?.sort,
    });
    return result;
  },
});
