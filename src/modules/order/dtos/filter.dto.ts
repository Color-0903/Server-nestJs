import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

export class FilterOrderDto extends SearchFilter {
  @ApiPropertyOptional({ type: Array(String) || String, name: 'status' })
  @IsOptional()
  readonly status?: string[] | string;
}
