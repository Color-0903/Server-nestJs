import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { USER_TYPE } from 'src/common/constants/enum';

export class LoginDto {
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

  @ApiHideProperty()
  type: USER_TYPE;
}

export class LoginResponseDto{
    token: string;
}