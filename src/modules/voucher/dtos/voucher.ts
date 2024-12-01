import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Voucher } from 'src/database/entities/voucher.entity';

export class CreateVoucherDto extends PartialType(OmitType(Voucher, ['lastModifiedOnDate', 'createdOnDate', 'user', 'userId', 'id', 'deletedAt', 'store', 'code'])) {
}

export class UpdateVoucherDto extends PartialType(OmitType(CreateVoucherDto, ['storeId'])) {}

export class ActivateVoucherDto {
    @ApiProperty({ name: 'code', type: String })
    @IsNotEmpty()
    @Transform(({ value }) => value?.toString())
    code: string;
}


export class RecallVoucherDto {
    @ApiProperty({ name: 'userId', type: String })
    @IsNotEmpty()
    @Transform(({ value }) => value?.toString())
    userId: string;
}

