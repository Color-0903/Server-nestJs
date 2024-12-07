import { UserService } from './user.service';
import { UserController } from './user.controller';

import { Module, forwardRef } from '@nestjs/common';
import { PasswordCipher } from '../../common/utils/password-cipher';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule],
  controllers: [UserController],
  providers: [UserService, PasswordCipher],
  exports: [UserService],
})
export class UserModule {}
