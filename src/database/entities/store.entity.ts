import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { STORE_STATUS, STORE_TYPE } from 'src/common/constants/enum';
import { OpenTime } from 'src/modules/store/dtos/store';
import {
  Column,
  DeepPartial,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Asset } from './asset.entity';
import { Cadastral } from './cadastral.entity';
import { User } from './user.entity';
import { Voucher } from './voucher.entity';

@Entity('store')
export class Store extends AbstractEntity {
  constructor(input?: DeepPartial<Store>) {
    super(input);
  }

  @Column({ nullable: true })
  @Index('store_idx_name')
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: false, default: STORE_TYPE.COFFE })
  @Index('store_idx_type')
  type: STORE_TYPE;

  @Column({ nullable: true, length: 11 })
  phone: string;

  @Column({ nullable: true, default: 0 })
  evaluate: number;

  @Column({ nullable: true, type: 'json' })
  openTime: OpenTime;

  @Column({ nullable: true })
  provinceId: string;

  @Column({ nullable: true })
  districtId: string;

  @Column({ nullable: true })
  wardId: string;

  @Column({ nullable: true, type: 'text' })
  detail: string;

  @Column({ nullable: true, enum: STORE_STATUS, default: STORE_STATUS.PENDING, type: 'enum' })
  status: STORE_STATUS;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: true })
  assetId: string;

  @ManyToOne(() => User, (p) => p.store)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Cadastral)
  @JoinColumn({ name: 'provinceId' })
  province: Cadastral;

  @ManyToOne(() => Cadastral)
  @JoinColumn({ name: 'districtId' })
  district: Cadastral;

  @ManyToOne(() => Cadastral)
  @JoinColumn({ name: 'wardId' })
  ward: Cadastral;

  @OneToMany(() => Voucher, (p) => p.store, {
    onDelete: 'CASCADE',
  })
  voucher: Voucher[];

  @OneToOne(() => Asset, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;

  @ManyToMany(() => Asset, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'store_asset' })
  assets: Asset[];
}
