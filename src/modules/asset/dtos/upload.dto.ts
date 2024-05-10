import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Asset } from 'src/database/entities/asset.entity';

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class UpdateFor {
  @ApiPropertyOptional({ type: 'string', name: 'id' })
  id: string;

  @ApiPropertyOptional({ type: 'string', name: 'table' })
  table: string;

  @ApiPropertyOptional({ type: Asset, name: 'asset' })
  asset?: Asset;

  @ApiPropertyOptional({ type: Array(Asset), name: 'assets' })
  assets?: Asset[];
}

export class DeleteFileDto {
  @ApiPropertyOptional({ type: 'string', name: 'id' })
  id: string;
  
  @ApiPropertyOptional({ type: 'string', name: 'oldSource' })
  oldSource?: string;

  @ApiPropertyOptional({ type: UpdateFor, name: 'updateFor' })
  @Type(() => UpdateFor)
  updateFor: UpdateFor;
}
