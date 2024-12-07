import { ApiHideProperty, ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ORDER_STATUS } from 'src/common/constants/enum';
export class OrderDetail {
  @ApiPropertyOptional({ name: 'size', type: String })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly size?: string;

  @ApiPropertyOptional({ name: 'quantity', type: Number })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly quantity?: number;

  @ApiPropertyOptional({ name: 'price', type: Number })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly price?: number;

  @ApiPropertyOptional({ name: 'color', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly color?: string;

  @ApiPropertyOptional({ name: 'asset', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly asset?: string;
}
export class CreateOrderDto {
  @ApiPropertyOptional({ name: 'phone', type: String })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  @Transform(({ value }) => String(value.toString().trim()))
  readonly phone?: string;

  @ApiPropertyOptional({ name: 'address', type: String })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly address?: string;

  @ApiPropertyOptional({ name: 'name', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly name?: string;

  @ApiPropertyOptional({ name: 'note', type: String })
  @IsOptional()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly note?: string;

  @ApiProperty({
    name: 'status',
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  })
  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  @Transform(({ value }) => String(value.toString().trim()))
  readonly status: string;

  @ApiProperty({ name: 'total', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value.toString().trim()))
  readonly total: number;

  @ApiHideProperty()
  userId?: string;

  @ApiProperty({ name: 'order_detail', type: Array(OrderDetail) })
  @IsNotEmpty()
  @IsArray()
  @Type(() => OrderDetail)
  order_detail: OrderDetail[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
