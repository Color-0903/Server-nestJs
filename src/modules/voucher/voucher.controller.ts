import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { Voucher } from 'src/database/entities/voucher.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { FilterVoucherDto } from './dtos/filter.dto';
import { CreateVoucherDto, UpdateVoucherDto } from './dtos/voucher';
import { VoucherRepository } from './voucher.repository';
import { VoucherService } from './voucher.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { User } from 'src/database/entities/user.entity';

@ApiTags('voucher')
@Controller('voucher')
@ApiBearerAuth()
export class VoucherController {
  constructor(private voucherService: VoucherService) {}

  @Get('/find')
  @ApiOkResponsePaginated(Voucher)
  // @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterVoucherDto) {
    return this.voucherService.getAll(filter);
  }

  @Get('/detail:id')
  // @Allow(Permission.Authenticated)
  async getById(@Param('id') id: string) {
    return VoucherRepository.findOneBy({ id });
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async create(@Body() dto: CreateVoucherDto, @UserReq() userReq: User) {
    return this.voucherService.create(dto, userReq.id);
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async update(@Param('id') id: string, @Body() dto: UpdateVoucherDto, @UserReq() userReq: User) {
    return this.voucherService.update(id, dto, userReq.id);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async delete(@Param('id') id: string , @UserReq() userReq: User) {
    return this.voucherService.delete(id);
  }
}
