import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { USER_TYPE } from 'src/common/constants/enum';
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne
} from 'typeorm';
import { Asset } from './asset.entity';
import { Role } from './role.entity';
import { Order } from './order.entity';
import { Voucher } from './voucher.entity';
import { Store } from './store.entity';

@Entity('users')
export class User extends AbstractEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Column({ nullable: false })
  identifier: string;
  
  @Column({ default: false })
  type: USER_TYPE;

  @Column({ select: false })
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  verified: boolean;

  // @Column({ type: Date, nullable: true })
  // lastLogin: Date | null;

  @Column({ nullable: true })
  displayName: string;
  
  @Column({ nullable: true })
  dob: Date;
  
  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  address_detail: string;

  // @Column({ nullable: true, default: 1 })
  // level: number;

  @Column({ nullable: true })
  assetId: boolean;

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  roles: Role[];

  @ManyToOne(() => Asset, { nullable: true })
  @JoinColumn({ name: 'assetId' })
  asset?: Asset;

  @OneToMany(() => Order, (p) => p.user, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @OneToMany(() => Voucher, (p) => p.user, {
    onDelete: 'CASCADE',
  })
  voucher: Voucher[];

  @OneToMany(() => Store, (p) => p.user, {
    onDelete: 'CASCADE',
  })
  store: Store[];
}
