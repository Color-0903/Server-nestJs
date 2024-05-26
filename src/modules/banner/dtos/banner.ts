import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Asset } from 'src/database/entities/asset.entity';

export class CreateBannerDto {
  @ApiPropertyOptional({ name: 'title', type: String })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Transform(({ value }) => String(value?.toString().trim()))
  readonly title: string;

  @ApiPropertyOptional({ name: 'content', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value?.toString().trim()))
  content?: string;

  @ApiPropertyOptional({ name: 'index', type: Number })
  @IsOptional()
  @Transform(({ value }) => Number(value.toString().trim()))
  readonly index: number;

  @ApiPropertyOptional({ name: 'asset', type: Asset })
  @IsOptional()
  @Type(() => Asset)
  readonly asset?: Asset;
}

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}
