import { float } from 'aws-sdk/clients/cloudfront';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import {
  Column,
  DeepPartial,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';

@Entity('voucher')
export class Voucher extends AbstractEntity {
  constructor(input?: DeepPartial<Voucher>) {
    super(input);
  }

  @Column({ nullable: false, unique: true })
  @Index('voucher_idx_code')
  code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  releaseAt: Date;

  @Column({ nullable: true, default: null })
  qrCode: string;

  @Column({ nullable: true, default: null })
  expired: Date;

  @Column({ default: true })
  isEnable: boolean;

  @Column({ nullable: true })
  discount: float;

  @Column({ nullable: true })
  maxDiscount: float;

  @Column({ nullable: true })
  minInvoice: float;

  @Column({ nullable: true, default: 99 })
  quantity: number;

  @Column({ nullable: true, default: 0 })
  used: number;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: false })
  storeId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Store, (s) => s.voucher)
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
