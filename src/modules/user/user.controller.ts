import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { FilterUserDto } from './dtos/filter.dto';
import { UserService } from './user.service';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { UpdatePasswordDto, UpdateUserDto } from './dtos/user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  @Post('edit-me')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Authenticated)
  async edit(@Body() dto: UpdateUserDto,  @UserReq() userReq: User) {
    return this.userService.update(userReq.id, dto);
  }

  @Post('edit-password')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Authenticated)
  async password(@Body() dto: UpdatePasswordDto, @UserReq() userReq: User) {
    return this.userService.changePassword(userReq.id, dto);
  }
}
