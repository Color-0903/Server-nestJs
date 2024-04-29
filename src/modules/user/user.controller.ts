import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/database/entities/user.entity';
import { ApiOkResponsePaginated } from 'src/common/util/query-util';
import { Permission } from '../permission';
import { Allow } from 'src/common/decorators/allow.decorator';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-all')
  @ApiOkResponsePaginated(User)
  @Allow(Permission.Authenticated)
  async getAllDoctor(@Query() filter: SearchFilter) {
    return await this.userService.getAll(filter);
  }
}
