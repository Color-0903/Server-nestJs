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
import { FilterProductDto } from './dtos/filter.dto';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { UserReq } from 'src/common/decorators/userReq.decorator';
import { ProductService } from './product.service';
import { Product } from 'src/database/entities/products.entity';
import { ProductRepository } from './product.repository';

@ApiTags('product')
@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  @ApiOkResponsePaginated(Product)
  // @Allow(Permission.Authenticated)
  async getAll(@Query() filter: FilterProductDto) {
    return this.productService.getAll(filter);
  }
  @Get(':id')
  // @Allow(Permission.Authenticated)
  async getById(@Param('id') id: string) {
    return ProductRepository.findOne({
      where: { id },
      relations: {
        assets: true,
        categories: true,
        colors: true,
        sizes: true,
      },
    });
  }
  @Post('')
  @Allow(Permission.Authenticated)
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Patch(':id')
  @Allow(Permission.Authenticated)
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @Allow(Permission.Authenticated)
  async delete(@Param('id') id: string, @UserReq() userReq: User) {
    return this.productService.delete(id);
  }
}
