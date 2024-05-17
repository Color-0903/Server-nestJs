import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

export class FilterProductDto extends SearchFilter {
  @ApiPropertyOptional({ name: 'categories', type: String || Array(String) })
  @IsOptional()
  readonly categories?: string | string[];
}
