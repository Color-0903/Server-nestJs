import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Permission } from '../permission';
import { User } from '../../database/entities/user.entity';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { Role } from 'src/database/entities/role.entity';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { DELETE_TYPE } from 'src/common/constants/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Allow } from '../auth/guards/allow.decorator';
import { UserReq } from 'src/common/decorators/userReq.decorator';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('')
  @ApiOkResponsePaginated(Role)
  @Allow(Permission.Administrator.Read)
  public async get(@Query() filter: SearchFilter) {
    return await this.roleService.getAll(filter);
  }

  // @Get('get-all-role-no-pagination')
  // @Allow(Permission.Authenticated)
  // public async getAllRole() {
  //   return await this.roleService.getAllRole();
  // }

  @Get(':id')
  @Allow(Permission.Administrator.Read)
  public async getById(@Param('id') id: string) {
    return await this.roleService.getById(id);
  }

  @Post('create')
  @Allow(Permission.Administrator.Create)
  public async create(@Body() payload: CreateRoleDto, @UserReq() userReq: User) {
    return await this.roleService.create(payload, userReq);
  }

  @Patch(':id')
  @Allow(Permission.Administrator.Update)
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateRoleDto,
    @UserReq() userReq: User,
  ) {
    // return await this.roleService.update(id, payload, userReq);
  }

  @Delete(':id')
  @Allow(Permission.Administrator.Delete)
  public async delete(@Param('id') id: string) {
    const dele = await this.roleService.deleteRole(id, DELETE_TYPE.HARD);
    return dele;
  }
}
