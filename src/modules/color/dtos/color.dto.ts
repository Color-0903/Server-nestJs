import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ name: 'name', type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly name: string;

  @ApiProperty({ name: 'description', type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly description: string;
}

export class UpdateColorDto extends PartialType(CreateColorDto) {}
