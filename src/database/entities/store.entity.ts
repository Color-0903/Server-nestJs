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
import { Cadastral } from './cadastral.entity';
import { Voucher } from './voucher.entity';
import { STORE_TYPE } from 'src/common/constants/enum';
import { OpenTime } from 'src/modules/store/dtos/store';


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

  @Column( { nullable: true, type: 'json' } )
  openTime: OpenTime;

  @Column({ nullable: true })
  provinceId: string;

  @Column({ nullable: true })
  districtId: string;

  @Column({ nullable: true })
  wardId: string;

  @Column({ nullable: true, type: 'text' })
  detail: string;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (p) => p.store)
  @JoinColumn({ name: 'userId' })
  user: User;
  
  @ManyToOne(() => Cadastral)
  @JoinColumn({ name: 'provinceId' })
  province: Cadastral;

  @ManyToOne(() => Cadastral)
  @JoinColumn({ name: 'provinceId' })
  district: Cadastral;

  @ManyToOne(() => Cadastral)
  @JoinColumn({ name: 'provinceId' })
  ward: Cadastral;

  @OneToMany(() => Voucher, (p) => p.store, {
    onDelete: 'CASCADE',
  })
  voucher: Voucher[];
}
