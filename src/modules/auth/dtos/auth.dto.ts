import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GoogleAuthDto {
  @ApiPropertyOptional({ name: 'type', type: String })
  @IsOptional()
  type: string;
}
