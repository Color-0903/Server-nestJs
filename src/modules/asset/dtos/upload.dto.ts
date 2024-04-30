import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
