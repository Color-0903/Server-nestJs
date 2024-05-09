import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/database/entities/category.entity';
import { Color } from 'src/database/entities/color.entity';
import { Size } from 'src/database/entities/size.entity';

export class CreateProductDto {
  @ApiProperty({ name: 'name', type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly name: string;

  @ApiProperty({ name: 'description', type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly description: string;

  @ApiProperty({ name: 'status', type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => Boolean(value))
  readonly status: boolean;

  @ApiProperty({ name: 'price_in', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value.toString().trim()))
  readonly price_in: number;

  @ApiProperty({ name: 'price_out', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value.toString().trim()))
  readonly price_out: number;

  @ApiProperty({ name: 'sale_off', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @Transform(({ value }) => Number(value.toString().trim()))
  readonly sale_off: number;

  @ApiProperty({ name: 'isHidden', type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => Boolean(value))
  readonly isHidden: boolean;

  @ApiProperty({ name: 'sizes', type: Array(Size) })
  @IsArray()
  @Type(() => Size)
  readonly sizes: Size[];

  @ApiProperty({ name: 'categories', type: Array(Category) })
  @IsArray()
  @Type(() => Category)
  readonly categories: Category[];

  @ApiProperty({ name: 'colors', type: Array(Color) })
  @IsArray()
  @Type(() => Color)
  readonly colors: Color[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
