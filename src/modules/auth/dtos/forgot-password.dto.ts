import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgotDto {
  @ApiProperty({ name: 'identifier', type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;

  @ApiProperty({ name: 'password', type: String })
  @IsString()
  @IsNotEmpty()
  @Length(8, 16)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly password: string;

  @ApiProperty({ name: 'code', type: String })
  @IsNotEmpty()
  @Length(6, 6)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly code: string;
}
