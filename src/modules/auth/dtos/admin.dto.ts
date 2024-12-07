import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ name: 'identifier', type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;

  @ApiProperty({ name: 'password', type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly password: string;

  @ApiProperty({ name: 'code', type: String })
  @IsNotEmpty()
  @Length(6, 6)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly code: string;
}
