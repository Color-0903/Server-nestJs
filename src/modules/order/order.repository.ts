
import dataSource from 'src/database/data-source';
import { Order } from 'src/database/entities/order.entity';
import { Brackets } from 'typeorm';
import { FilterOrderDto } from './dtos/filter.dto';

export const OrderRepository = dataSource.getRepository(Order).extend({
  async getAll(filter: FilterOrderDto) {
    const query = OrderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.order_detail', 'order_detail');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`order.name like :name${index}`, {
              [`name${index}`]: `%${text.trim()}%`,
            }),
          ),
        );
      });
    }

    if (filter?.status) {
      if (Array.isArray(filter.status)) {
        if (filter.status.length > 0) {
          query.andWhere('order.status IN (:...status)', { status: filter.status });
        }
      } else query.andWhere('order.status = :status', { status: filter.status });
    }


    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
    });
    return result;
  },
});
