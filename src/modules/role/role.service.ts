import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { Permission, getAllPermissionsMetadata } from '../permission';
import { PermissionDefinition } from '../permission/permission-definition';
import { Role } from '../../database/entities/role.entity';
import { User } from '../../database/entities/user.entity';
import { DELETE_TYPE } from 'src/common/constants/enum';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

@Injectable()
export class RoleService {
  constructor() {}

  async initRoles() {
    await this.ensureSuperAdminRoleExists();
    await this.ensureCustomerRoleExists();
    await this.ensureRolesHaveValidPermissions();
  }

  public async getAll(filter: SearchFilter) {
    return await RoleRepository.getAll(filter);
  }

  // public async getAllRole() {
  //   return await RoleRepository.find({
  //     where: {
  //       deletedAt: null,
  //     },
  //     order: {
  //       createdOnDate: 'DESC',
  //     },
  //   });
  // }

  public async getById(id: string) {
    const result = await RoleRepository.findOne({
      where: { id },
    });

    if (!result) throw new NotFoundException();

    return result;
  }

  public async create(payload: CreateRoleDto, userReq: User) {
    const checkRole = await RoleRepository.findOne({
      where: [
        {
          name: payload.name,
        },
        // {
        //   code: payload.code,
        // },
      ],
    });
    if (checkRole) throw new HttpException('ROLE_NAME_IS_EXIST', HttpStatus.BAD_REQUEST);

    const role = new Role({
      ...payload,
      permissions: [Permission.Authenticated.name, ...payload.permissions],
      createdByUserId: userReq.id,
      lastModifiedByUserId: userReq.id,
    });
    return RoleRepository.save(role);
  }

  public async deleteRole(id: string, type: DELETE_TYPE) {
    // const check = await RoleRepository.CheckRoleIsUsed(id);
    // if (check) throw new HttpException('Role is using!', HttpStatus.BAD_REQUEST);
    return RoleRepository.deleteRole(id, type);
  }

  public async getByRoleIds(roleIds: string[]) {
    return RoleRepository.getByRoleIds(roleIds);
  }

  private async ensureSuperAdminRoleExists() {
    const assignablePermissions = this.getAllAssignablePermissions();
    try {
      const superAdminRole = await RoleRepository.getSuperAdminRole();
      superAdminRole.permissions = assignablePermissions;
      await RoleRepository.save(superAdminRole, { reload: false });
    } catch (err) {
      await RoleRepository.insert({
        name: Permission.SuperAdmin.name,
        code: Permission.SuperAdmin.name,
        permissions: assignablePermissions,
      });
    }
  }

  private async ensureRolesHaveValidPermissions() {
    const roles = await RoleRepository.find();
    const assignablePermissions = this.getAllAssignablePermissions();
    for (const role of roles) {
      const invalidPermissions = role.permissions.filter((p) => !assignablePermissions.includes(p));
      if (invalidPermissions.length) {
        role.permissions = role.permissions.filter((p) => assignablePermissions.includes(p));
        await RoleRepository.save(role);
      }
    }
  }

  private async ensureCustomerRoleExists() {
    const customerRole = await RoleRepository.getRoleByCode(Permission.Customer.name);
    if (!customerRole) {
      await RoleRepository.insert({
        name: Permission.Customer.name,
        code: Permission.Customer.name,
        permissions: [Permission.Authenticated.name],
      });
    }
  }

  private getAllAssignablePermissions(): string[] {
    return getAllPermissionsMetadata()
      .filter((p) => p.assignable)
      .map((p) => p.name as string);
  }
  async getRoleByCode(code: string) {
    return RoleRepository.findOne({
      where: { code },
    });
  }
}
