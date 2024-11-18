import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

export class FilterVoucherDto extends SearchFilter {
  @ApiPropertyOptional({ name: 'userId', type: String })
  @IsOptional()
  @Transform(({ value }) => value?.toString())
  userId: string;

  @ApiPropertyOptional({ name: 'storeId', type: String })
  @IsOptional()
  @Transform(({ value }) => value?.toString())
  storeId: string;
}
