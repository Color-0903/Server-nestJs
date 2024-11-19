import { OmitType, PartialType } from '@nestjs/swagger';
import { Notify } from 'src/database/entities/notify.entity';

export class CreateNotifyDto extends PartialType(
  OmitType(Notify, ['lastModifiedOnDate', 'createdOnDate', 'userId', 'id', 'deletedAt']),
) {}

export class UpdateNotifyDto extends PartialType(CreateNotifyDto) {}
