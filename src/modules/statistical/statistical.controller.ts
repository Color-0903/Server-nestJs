import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatisticalService } from './statistical.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Permission } from '../permission';
import { Allow } from '../auth/guards/allow.decorator';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { User } from 'src/database/entities/user.entity';

@ApiTags('statistical')
@Controller('statistical')
@ApiBearerAuth()
export class StatisticalController {
  constructor(private statisticalService: StatisticalService) {}

  @Get('partner')
  // @UseGuards(JwtAuthGuard)
  // @Allow(Permission.Partner)
  async partner(/* @UserReq() userReq: User */) {
    return this.statisticalService.partner('userReq.id');
  }
}
