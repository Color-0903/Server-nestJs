import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class FilterCadastralDto {
  @ApiPropertyOptional({ name: 'provinceId', type: String })
  @IsString()
  @IsOptional()
  @Length(36, 36)
  @Transform(({ value }) => String(value?.toString().trim()))
  provinceId?: string;

  @ApiPropertyOptional({ name: 'districtId', type: String })
  @IsString()
  @IsOptional()
  @Length(36, 36)
  @Transform(({ value }) => String(value?.toString().trim()))
  districtId?: string;
}
