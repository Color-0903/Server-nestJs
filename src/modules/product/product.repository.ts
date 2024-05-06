import dataSource from "src/database/data-source";
import { Product } from "src/database/entities/products.entity";
import { Brackets } from "typeorm";
import { FilterProductDto } from "./dtos/filter.dto";

export const ProductRepository = dataSource.getRepository(Product).extend({
    async getAll(filter: FilterProductDto) {
        const query = ProductRepository.createQueryBuilder('product');
    
        if (filter.fullTextSearch) {
          const listFullTextSearch = filter.fullTextSearch.split(/　| /);
          listFullTextSearch.forEach((text, index) => {
            query.andWhere(
              new Brackets((q) =>
                q.where(`product.firstName like :firstName${index}`, {
                  [`firstName${index}`]: `%${text.trim()}%`,
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
})