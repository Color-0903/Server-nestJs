import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, NotEquals } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({ type: String, name: 'name' })
  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  @Type(() => String)
  @Transform(({ value }) => String(value.toString().trim()))
  name: string;

  @ApiProperty({ name: 'permissions', type: Array<string> })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @NotEquals(null)
  permissions: string[];
}
