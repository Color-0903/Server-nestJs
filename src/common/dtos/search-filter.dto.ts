import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchFilter {
    @ApiProperty({ type: Number, name: 'page' })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    readonly page: number;
  
    @ApiProperty({ type: Number, name: 'size' })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    readonly size?: number;
  
    @ApiProperty({ type: String, name: 'sort' })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value.toString().trim()))
    readonly sort?: string;
  
    @ApiProperty({ type: String, name: 'fullTextSearch' })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value.toString().trim()))
    readonly fullTextSearch?: string;
  }

  