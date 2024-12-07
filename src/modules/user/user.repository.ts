import dataSource from 'src/database/data-source';
import { User } from 'src/database/entities/user.entity';
import { Brackets } from 'typeorm';
import { DELETE_TYPE, USER_TYPE } from '../../common/constants/enum';
import { FilterUserDto } from './dtos/filter.dto';

export const UserRepository = dataSource.getRepository(User).extend({
  async getAll(filter: FilterUserDto) {
    const query = UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.asset', 'asset')
      .where('user.type = :type', { type: USER_TYPE.USER });

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets(
            (q) =>
              q.where(`user.identifier like :identifier${index}`, {
                [`identifier${index}`]: `%${text.trim()}%`,
              }),
            // .orWhere(`user.lastName like :lastName${index}`, {
            //   [`lastName${index}`]: `%${text.trim()}%`,
            // })
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

  async getVoucher(filter: FilterUserDto, userId: string) {
    const query = UserRepository.createQueryBuilder('user')
      .select(['user.id', 'user.createdOnDate'])
      .leftJoinAndSelect('user.vouchers', 'vouchers')
      .andWhere('user.id = :userId', { userId });

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q.where(`user.identifier like :identifier${index}`, {
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
  async getUserById(userId: string) {
    return UserRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'authenticationMethods'],
    });
  },

  async deleteUser(id: string, type: DELETE_TYPE) {
    return type === DELETE_TYPE.HARD
      ? await UserRepository.delete(id)
      : await UserRepository.update(id, { deletedAt: new Date() });
  },
});
