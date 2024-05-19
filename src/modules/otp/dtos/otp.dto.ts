import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty
} from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({ name: 'identifier', type: String })
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;

  @ApiProperty({ name: 'type', type: String, default: "register" })
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly type: "forgot" | "register";
}
