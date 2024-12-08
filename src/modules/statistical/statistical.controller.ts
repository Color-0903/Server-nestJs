import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatisticalService } from './statistical.service';

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
