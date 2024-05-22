import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Asset } from 'src/database/entities/asset.entity';

export class CreateBannerDto {
  @ApiProperty({ name: 'title', type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly title: string;

  @ApiPropertyOptional({ name: 'content', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value?.toString().trim()))
  content?: string;

  @ApiPropertyOptional({ name: 'asset', type: Asset })
  @IsOptional()
  @Type(() => Asset)
  readonly asset?: Asset;
}

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}
