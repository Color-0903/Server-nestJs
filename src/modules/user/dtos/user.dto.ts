import { ApiHideProperty, ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { USER_TYPE } from 'src/common/constants/enum';
import { NotMatch } from 'src/common/decorators/match.decorator';
import { Asset } from 'src/database/entities/asset.entity';

export class CreateUserDto {
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
  @IsNotEmpty()
  type: USER_TYPE;
}

export class UpdateUserDto {
  @ApiProperty({ name: 'identifier', type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly identifier: string;

  @ApiPropertyOptional({ name: 'displayName', type: String })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly displayName?: string;

  @ApiPropertyOptional({ name: 'dob', type: Date })
  @IsOptional()
  @IsDateString()
  readonly dob?: Date;

  @ApiPropertyOptional({ name: 'phone', type: String })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly phone?: string;

  @ApiPropertyOptional({ name: 'address', type: String })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly address?: string;

  @ApiPropertyOptional({ name: 'address_detail', type: String })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly address_detail?: string;

  @ApiPropertyOptional({ name: 'asset', type: Asset })
  @IsOptional()
  @Type(() => Asset)
  readonly asset?: Asset;
}

export class UpdatePasswordDto {
  @ApiProperty({ name: 'current', type: String })
  @IsString()
  @IsNotEmpty()
  @Length(8, 16)
  current: string;

  @ApiProperty({ name: 'new', type: String })
  @IsString()
  @IsNotEmpty()
  @NotMatch(UpdatePasswordDto, (dto) => dto.current)
  new: string;
}
