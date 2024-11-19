import {
  Body,
  Controller,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import {
  CreateNotifyDto
} from './dtos/notify';
import { NotifyService } from './notify.service';

@ApiTags('notify')
@Controller('notify')
@ApiBearerAuth()
export class NotifyController {
  constructor(private notifyService: NotifyService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async create(@Body() dto: CreateNotifyDto, @UserReq() userReq: User) {
    return this.notifyService.create(dto, userReq.id);
  }
}
