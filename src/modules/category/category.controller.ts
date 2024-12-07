import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { ApiOkResponsePaginated } from 'src/common/utils/query-util';
import { Category } from 'src/database/entities/category.entity';
import { User } from 'src/database/entities/user.entity';
import { Allow } from '../auth/guards/allow.decorator';
import { Permission } from '../permission';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { FilterCategoryDto } from './dtos/filter.dto';
import { CategoryRepository } from './category.repository';

@ApiTags('category')
@Controller('category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  @ApiOkResponsePaginated(Category)
  // @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterCategoryDto) {
    return this.categoryService.getAll(filter);
  }

  @Get(':id')
  // @Allow(Permission.Authenticated)
  async getById(@Param('id') id: string) {
    return CategoryRepository.findOneBy({ id });
  }

  @Post('')
  @Allow(Permission.Authenticated)
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Patch(':id')
  @Allow(Permission.Authenticated)
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @Allow(Permission.Authenticated)
  async delete(@Param('id') id: string /* , @UserReq() userReq: User */) {
    return this.categoryService.delete(id);
  }
}
