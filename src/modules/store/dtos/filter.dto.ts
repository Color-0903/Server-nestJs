import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

export class FilterStoreDto extends SearchFilter {
    @ApiPropertyOptional({ name: 'userId', type: String })
    @IsString()
    @Transform(({ value }) => value?.toString())
    userId: string;
}
