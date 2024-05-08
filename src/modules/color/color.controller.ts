import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { ColorService } from './color.service';
import { Color } from 'src/database/entities/color.entity';
import { FilterColorDto } from './dtos/filter.dto';
import { CreateColorDto, UpdateColorDto } from './dtos/color.dto';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { ColorRepository } from './color.repository';

@ApiTags('color')
@Controller('color')
@ApiBearerAuth()
export class ColorController {
  constructor(private colorService: ColorService) {}

  @Get('')
  @ApiOkResponsePaginated(Color)
  // @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterColorDto) {
    return this.colorService.getAll(filter);
  }

  @Get(':id')
  // @Allow(Permission.Authenticated)
  async getById(@Param('id') id: string) {
    return ColorRepository.findOneBy({ id });
  }


  @Post('')
  @Allow(Permission.Authenticated)
  async create(@Body() dto: CreateColorDto) {
    return this.colorService.create(dto);
  }

  @Patch(':id')
  @Allow(Permission.Authenticated)
  async update(@Param('id') id: string, @Body() dto: UpdateColorDto) {
    return this.colorService.update(id, dto);
  }

  @Delete(':id')
  @Allow(Permission.Authenticated)
  async delete(@Param('id') id: string/* , @UserReq() userReq: User */) {
    return this.colorService.delete(id);
  }
}
