import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Asset } from 'src/database/entities/asset.entity';

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class UpdateFor {
  @ApiPropertyOptional({ type: String, name: 'id' })
  id: string;

  @ApiPropertyOptional({ type: String, name: 'table' })
  table: string;

  @ApiPropertyOptional({ type: Asset, name: 'asset' })
  asset?: Asset;

  @ApiPropertyOptional({ type: Array(Asset), name: 'assets' })
  assets?: Asset[];
}

export class DeleteFileDto {
  @ApiPropertyOptional({ type: String, name: 'id', })
  @IsNotEmpty()
  id: string;
  
  @ApiPropertyOptional({ type: String, name: 'oldSource' })
  @IsOptional()
  oldSource?: string;

  @ApiPropertyOptional({ type: UpdateFor, name: 'updateFor' })
  @IsNotEmpty()
  @Type(() => UpdateFor)
  updateFor: UpdateFor;
}
