import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PasswordCipher } from '../../common/util/password-cipher';
import { RoleService } from '../role/role.service';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import { CreateUserDto } from './dtos/create.dto';
import { RESPONSE_MESSAGER } from 'src/common/constants/enum';

@Injectable()
export class UserService {
  constructor(
    private passwordCipher: PasswordCipher,
    private roleService: RoleService,
  ) {}

  public async create(payload: CreateUserDto, roleCode: string) {
    try {
      const passwordHash = await this.passwordCipher.hash(payload.password);
      const role = await this.roleService.getRoleByCode(roleCode);

      await UserRepository.save({ ...payload, passwordHash: passwordHash, roles: [role] });

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
