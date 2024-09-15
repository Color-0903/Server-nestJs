import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterUserDto extends LoginDto {
  @ApiProperty({ name: 'code', type: String })
  @IsNotEmpty()
  @Length(6, 6)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly code: string;
}
