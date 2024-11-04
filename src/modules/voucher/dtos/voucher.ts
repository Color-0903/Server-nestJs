import { OmitType, PartialType } from '@nestjs/swagger';
import { Voucher } from 'src/database/entities/voucher.entity';

export class CreateVoucherDto extends PartialType(OmitType(Voucher, ['lastModifiedOnDate', 'createdOnDate', 'user', 'userId', 'id', 'deletedAt', 'store', 'code'])) {
}

export class UpdateVoucherDto extends PartialType(OmitType(CreateVoucherDto, ['storeId'])) {}
