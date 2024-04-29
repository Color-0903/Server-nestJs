import { Role } from 'src/database/entities/role.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Permission } from '../permission';
import { NotFoundException } from '@nestjs/common';
import { DELETE_TYPE } from 'src/common/constants/enum';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import dataSource from 'src/database/data-source';

export const RoleRepository = dataSource.getRepository(Role).extend({
  async getAll(filter: SearchFilter) {
    const query = RoleRepository.createQueryBuilder('role');

    if (filter.fullTextSearch) {
      const listFullTextSearch = filter.fullTextSearch.split(/　| /);
      listFullTextSearch.forEach((text, index) => {
        query.andWhere(
          new Brackets((q) =>
            q
              .where(`role.name like :name${index}`, {
                [`name${index}`]: `%${text.trim()}%`,
              })
              .orWhere(`role.code like :code${index}`, {
                [`code${index}`]: `%${text.trim()}%`,
              }),
          ),
        );
      });
    }
    query.andWhere('role.isHidden IS FALSE');

    const result = await query.toPaginationResponse({
      size: filter.size,
      page: filter.page,
    });
    return result;
  },
  async getRoleByCode(code: string) {
    return RoleRepository.findOne({
      where: { code },
    });
  },
  async getSuperAdminRole() {
    return RoleRepository.getRoleByCode(Permission.SuperAdmin.name);
  },

  async getByRoleIds(roleIds: string[]) {
    try {
      const roles = await RoleRepository.createQueryBuilder('role')
        .where('role.id IN (:...ids)', { ids: roleIds })
        .getMany();
      if (!roles) throw new NotFoundException();
      return roles;
    } catch (error) {
      throw new NotFoundException();
    }
  },
  async deleteRole(id: string, type: DELETE_TYPE) {
    return type === DELETE_TYPE.HARD
      ? await RoleRepository.delete(id)
      : await RoleRepository.update(id, { deletedAt: new Date() });
  },
});
