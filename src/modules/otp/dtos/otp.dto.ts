import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty
} from 'class-validator';
import { OTP_TYPE } from 'src/common/constants/enum';

export class CreateOtpDto {
  @ApiProperty({ name: 'identifier', type: String })
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;

  @ApiProperty({ name: 'type', enum: OTP_TYPE })
  @IsEnum(OTP_TYPE)
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly type: OTP_TYPE;
}
