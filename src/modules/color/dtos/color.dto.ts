import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ name: 'name', type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly name: string;

  @ApiPropertyOptional({ name: 'description', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value?.toString().trim()))
  description?: string;
}

export class UpdateColorDto extends PartialType(CreateColorDto) {}
