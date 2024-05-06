import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchFilter {
    @ApiProperty({ type: Number, name: 'page' })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page: number;
  
    @ApiPropertyOptional({ type: Number, name: 'size' })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    size?: number;
  
    @ApiPropertyOptional({ type: String, name: 'sort' })
    @IsOptional()
    @Transform(({ value }) => String(value.toString().trim()))
    sort?: string;
  
    @ApiPropertyOptional({ type: String, name: 'fullTextSearch' })
    @IsOptional()
    @Transform(({ value }) => String(value.toString().trim()))
    fullTextSearch?: string;
  }

  