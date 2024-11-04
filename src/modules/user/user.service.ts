import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RESPONSE_MESSAGER, USER_TYPE } from 'src/common/constants/enum';
import { PasswordCipher } from '../../common/utils/password-cipher';
import { Permission } from '../permission';
import { RoleRepository } from '../role/role.repository';
import { RoleService } from '../role/role.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dtos/user.dto';
import { FilterUserDto } from './dtos/filter.dto';
import { UserRepository } from './user.repository';
import { OtpRepository } from '../otp/otp.repository';

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

      await Promise.all([
        UserRepository.save({
          ...payload,
          passwordHash: passwordHash,
          roles: [role],
        }),
        OtpRepository.update(
          { identifier: payload.identifier, used: false },
          {
            used: true,
          },
        )])

      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async update(id: string, dto: UpdateUserDto) {
    try {
      await UserRepository.save({ id, ...dto });
      return {
        result: RESPONSE_MESSAGER.SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async changePassword(id: string, dto: UpdatePasswordDto) {
    const user = await UserRepository.findOne({
      where: { id },
      select: ['passwordHash'],
    });
    if (!user) throw new NotFoundException();

    const passMatch = await this.passwordCipher.check(
      dto.current,
      user.passwordHash,
    );

    if (!passMatch) throw new BadRequestException('CURRENT_PASS_NOT_CORRECT');

    const passwordHash = await this.passwordCipher.hash(dto.new);
    await UserRepository.update(id, { passwordHash });

    return {
      result: RESPONSE_MESSAGER.SUCCESS,
    };
  }

  public async getAll(filter: FilterUserDto) {
    return await UserRepository.getAll(filter);
  }

  public async delete(id: string) {
    return UserRepository.softDelete(id);
  }

  public async updateIsActive(id: string, status: boolean) {
    return UserRepository.update({ id: id }, { isActive: status });
  }
}
