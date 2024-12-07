import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { STORE_TYPE } from 'src/common/constants/enum';
import { Store } from 'src/database/entities/store.entity';

export interface OpenTime {
  am: string;
  pm: string;
}

export class OpenTimeDto {
  @ApiPropertyOptional({ name: 'am', type: String })
  @IsString()
  @Transform(({ value }) => value?.toString())
  am?: string;

  @ApiPropertyOptional({ name: 'pm', type: String })
  @IsString()
  @Transform(({ value }) => value?.toString())
  pm?: string;
}

export class CreateStoreDto extends PartialType(
  OmitType(Store, [
    'lastModifiedOnDate',
    'createdOnDate',
    'district',
    'province',
    'ward',
    'user',
    'voucher',
    'openTime',
    'userId',
    'id',
    'deletedAt',
    'assetId',
  ]),
) {
  @ApiProperty({ name: 'openTime', type: OpenTimeDto })
  @Type(() => OpenTimeDto)
  @ValidateNested()
  @IsOptional()
  openTime?: OpenTimeDto;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
