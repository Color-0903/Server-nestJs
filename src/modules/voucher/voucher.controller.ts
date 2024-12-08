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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { RemoveFieldResponse } from 'src/common/utils/remove-field-response';
import { User } from 'src/database/entities/user.entity';
import { VoucherHistory } from 'src/database/entities/voucher-history.entity';
import { Voucher } from 'src/database/entities/voucher.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { FilterUserVoucher, FilterVoucherDto } from './dtos/filter.dto';
import {
  ActivateVoucherDto,
  CreateVoucherDto,
  RecallVoucherDto,
  UpdateVoucherDto,
} from './dtos/voucher';
import { VoucherRepository } from './voucher.repository';
import { VoucherService } from './voucher.service';

@ApiTags('voucher')
@Controller('voucher')
@ApiBearerAuth()
export class VoucherController {
  constructor(private voucherService: VoucherService) {}

  @Get('/find')
  @ApiOkResponsePaginated(Voucher)
  @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterVoucherDto) {
    return this.voucherService.getAll(filter);
  }

  @Get('/user-voucher')
  @Allow(Permission.Partner)
  @UseInterceptors(
    new RemoveFieldResponse(['type', 'isActive', 'verified', 'dob', 'address', 'address_detail']),
  )
  @ApiOkResponsePaginated(Voucher)
  async userVoucher(@Query() filter: FilterUserVoucher, @UserReq() userReq: User) {
    return this.voucherService.userVoucher(filter, userReq.id);
  }

  @Get('/detail/:id')
  @Allow(Permission.Authenticated)
  async getById(@Param('id') id: string) {
    return VoucherRepository.findOneBy({ id });
  }

  @Get('/histories')
  @Allow(Permission.Partner)
  @ApiOkResponsePaginated(VoucherHistory)
  async histories(@Query() filter: FilterUserVoucher, @UserReq() userReq: User) {
    return this.voucherService.histories(filter, userReq.id);
  }

  @Post('/activate')
  @Allow(Permission.Partner)
  async activate(@Body() dto: ActivateVoucherDto, @UserReq() userReq: User) {
    return this.voucherService.active(dto.code, userReq.id);
  }

  @Post('/recall')
  @Allow(Permission.Partner)
  async recall(@Body() dto: RecallVoucherDto, @UserReq() userReq: User) {
    return this.voucherService.recall(dto, userReq.id);
  }

  @Post('/pick-voucher/:id')
  @Allow(Permission.Authenticated)
  async pickVoucer(@Param('id') id: string, @UserReq() userReq: User) {
    return this.voucherService.pickVoucher(id, userReq.id);
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
  async delete(@Param('id') id: string, @UserReq() userReq: User) {
    return this.voucherService.delete(id);
  }
}
