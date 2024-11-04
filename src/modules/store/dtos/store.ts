import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Store } from 'src/database/entities/store.entity';

export interface OpenTime {
  am: string;
  pm: string;
}

export class _OpenTime {
  @ApiProperty({ name: 'am', type: String })
  @IsString()
  am: string;
  
  @ApiProperty({ name: 'pm', type: String })
  @IsString()
  pm: string;
}

export class CreateStoreDto extends PartialType(OmitType(Store, ['lastModifiedOnDate', 'createdOnDate', 'district', 'province', 'ward', 'user', 'voucher', 'openTime', 'userId', 'id', 'deletedAt'])) {
  @ApiProperty({ name: 'openTime', type: _OpenTime })
  @Type(() => _OpenTime)
  @ValidateNested()
  @IsOptional()
  openTime?: _OpenTime;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
