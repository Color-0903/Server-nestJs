import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OTP_TYPE, USER_TYPE } from 'src/common/constants/enum';

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

  @ApiProperty({ name: 'userType', enum: USER_TYPE, default: USER_TYPE.USER })
  @IsEnum(USER_TYPE)
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly userType: USER_TYPE;
}
