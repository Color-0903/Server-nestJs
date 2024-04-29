import { User } from 'src/database/entities/user.entity';
import { Brackets, WhereExpressionBuilder } from 'typeorm';
import { DELETE_TYPE } from '../../common/constants/enum';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import dataSource from 'src/database/data-source';

export const UserRepository = dataSource.getRepository(User).extend({
  async getAll(filter: SearchFilter) {
    const query = UserRepository.createQueryBuilder('user');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q
              .where(`user.firstName like :firstName${index}`, {
                [`firstName${index}`]: `%${text.trim()}%`,
              })
              .orWhere(`user.lastName like :lastName${index}`, {
                [`lastName${index}`]: `%${text.trim()}%`,
              })
              .orWhere(`user.email like :email${index}`, {
                [`email${index}`]: `%${text.trim()}%`,
              })
          )
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
