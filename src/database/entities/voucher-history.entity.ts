import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Voucher } from './voucher.entity';

@Entity('voucher_histories')
export class VoucherHistory extends AbstractEntity {
  constructor(input?: DeepPartial<VoucherHistory>) {
    super(input);
  }

  @Column({ nullable: true })
  voucherId: string;

  @ManyToOne(() => Voucher, { nullable: false })
  @JoinColumn({ name: 'voucherId' })
  voucher?: Voucher;
}
