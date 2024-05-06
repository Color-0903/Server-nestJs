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
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { Size } from 'src/database/entities/size.entity';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { FilterSizeDto } from './dtos/filter.dto';
import { CreateSizeDto, UpdateSizeDto } from './dtos/size';
import { SizeService } from './size.service';

@ApiTags('size')
@Controller('size')
@ApiBearerAuth()
export class SizeController {
  constructor(private categoryService: SizeService) {}

  @Get('')
  @ApiOkResponsePaginated(Size)
  // @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterSizeDto) {
    return this.categoryService.getAll(filter);
  }

  @Post('')
  @Allow(Permission.Authenticated)
  async create(@Body() dto: CreateSizeDto) {
    return this.categoryService.create(dto);
  }

  @Patch(':id')
  @Allow(Permission.Authenticated)
  async update(@Param('id') id: string, @Body() dto: UpdateSizeDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @Allow(Permission.Authenticated)
  async delete(@Param('id') id: string, @UserReq() userReq: User) {
    return this.categoryService.delete(id);
  }
}
