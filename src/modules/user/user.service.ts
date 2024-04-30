import { BadRequestException, Injectable } from '@nestjs/common';
import { RESPONSE_MESSAGER, USER_TYPE } from 'src/common/constants/enum';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import { PasswordCipher } from '../../common/utils/password-cipher';
import { Permission } from '../permission';
import { RoleRepository } from '../role/role.repository';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dtos/create.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private passwordCipher: PasswordCipher,
    private roleService: RoleService,
  ) {}

  public async initUser() {
    const user = await UserRepository.findOneBy({
      identifier: process.env.INITIAL_ADMIN_IDENTIFIER,
      type: USER_TYPE.ADMIN,
    });
    if (!user) {
      let AdminRole = await RoleRepository.findOneBy({
        name: Permission.SuperAdmin.name,
      });
      if (!AdminRole) {
        AdminRole = await RoleRepository.save({
          name: Permission.SuperAdmin.name,
        });
      }
      const passwordHash = await this.passwordCipher.hash(
        process.env.INITIAL_ADMIN_PASSWORD,
      );

      console.log(AdminRole)
      await UserRepository.save({
        identifier: process.env.INITIAL_ADMIN_IDENTIFIER,
        passwordHash: passwordHash,
        type: USER_TYPE.ADMIN,
        isActive: true,
        verified: true,
        roles: [AdminRole],
      });
    }
  }

  public async create(payload: CreateUserDto, roleCode: string) {
    try {
      const passwordHash = await this.passwordCipher.hash(payload.password);
      const role = await this.roleService.getRoleByName(roleCode);

      await UserRepository.save({
        ...payload,
        passwordHash: passwordHash,
        roles: [role],
      });

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getAll(filter: SearchFilter) {
    return await UserRepository.getAll(filter);
  }

  public async delete(id: string) {
    return UserRepository.softDelete(id);
  }

  public async updateIsActive(id: string, status: boolean) {
    return UserRepository.update({ id: id }, { isActive: status });
  }
}
