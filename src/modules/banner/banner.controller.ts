import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { Banner } from 'src/database/entities/banner.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { BannerRepository } from './banner.repository';
import { BannerService } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './dtos/banner';

@ApiTags('banner')
@Controller('banner')
@ApiBearerAuth()
export class BannerController {
  constructor(private categoryService: BannerService) {}

  @Get('')
  // @ApiOkResponsePaginated(Banner)
  @Allow(Permission.Authenticated)
  async getAll() {
    return BannerRepository.find({ relations: { asset: true }, order: { index: 'ASC' } });
  }

  // @Get(':id')
  // @Allow(Permission.Authenticated)
  // async getById(@Param('id') id: string) {
  //   return BannerRepository.findOneBy({ id });
  // }

  @Post('')
  @Allow(Permission.Authenticated)
  async create(@Body() dto: CreateBannerDto) {
    return this.categoryService.create(dto);
  }

  @Patch(':id')
  @Allow(Permission.Authenticated)
  async update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.categoryService.update(id, dto);
  }

  // @Delete(':id')
  // @Allow(Permission.Authenticated)
  // async delete(@Param('id') id: string /* , @UserReq() userReq: User */) {
  //   return this.categoryService.delete(id);
  // }
}
