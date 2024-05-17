import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({ name: 'identifier', type: String })
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;
}
