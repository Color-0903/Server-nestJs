import { Injectable } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';

@Injectable()
export class InitializerService {
  constructor(
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  async onModuleInit() {
    await this.roleService.initRoles();
    await this.userService.initUser();
  }
}
