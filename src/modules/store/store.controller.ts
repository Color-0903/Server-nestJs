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
import { StoreService } from './store.service';
import { FilterStoreDto } from './dtos/filter.dto';
import { StoreRepository } from './store.repository';
import { CreateStoreDto, UpdateStoreDto } from './dtos/store';
import { Store } from 'src/database/entities/store.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { User } from 'src/database/entities/user.entity';

@ApiTags('store')
@Controller('store')
@ApiBearerAuth()
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('/find')
  @ApiOkResponsePaginated(Store)
  async getAll(@Query() filter: FilterStoreDto) {
    return this.storeService.getAll(filter);
  }

  @Get('/detail/:id')
  async getById(@Param('id') id: string) {
    return StoreRepository.findOne({ where: { id }, relations: ['asset', 'assets'] }, );
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async create(@Body() dto: CreateStoreDto, @UserReq() userReq: User) {
    console.log(dto)
    return this.storeService.create(dto, userReq.id);
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async update(@Param('id') id: string, @Body() dto: UpdateStoreDto, @UserReq() userReq: User) {
    return this.storeService.update(id, dto, userReq.id);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Partner)
  async delete(@Param('id') id: string , @UserReq() userReq: User) {
    return this.storeService.delete(id, userReq.id);
  }
}
