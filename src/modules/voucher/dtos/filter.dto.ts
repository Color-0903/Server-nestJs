import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';
import * as moment from 'moment';

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

export class FilterUserVoucher extends SearchFilter { 
  @ApiPropertyOptional({ name: 'storeId', type: String })
  @IsOptional()
  @Transform(({ value }) => value?.toString())
  storeId?: string;

  @ApiPropertyOptional({ name: 'from', type: Date })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
  from?: Date;

  @ApiPropertyOptional({ name: 'to', type: Date })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
  to?: Date;
}
