import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class FilterOtpDto  {
  @ApiProperty({ name: 'identifier', type: String })
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;

  @ApiProperty({ name: 'code', type: String })
  @IsNotEmpty()
  @Length(6, 6)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly code: string;
}
