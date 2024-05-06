import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { FilterUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-all')
  @ApiOkResponsePaginated(User)
  @Allow(Permission.Authenticated)
  async getAllDoctor(@Query() filter: FilterUserDto) {
    return await this.userService.getAll(filter);
  }
}
