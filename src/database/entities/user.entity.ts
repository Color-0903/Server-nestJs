import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { USER_TYPE } from 'src/common/constants/enum';
import {
  Column,
  DeepPartial,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  Unique
} from 'typeorm';
import { Asset } from './asset.entity';
import { Role } from './role.entity';

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

  @Column({ type: Date, nullable: true })
  lastLogin: Date | null;

  @Column({ nullable: true })
  assetId: boolean;

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  roles: Role[];

  @ManyToOne(() => Asset, { nullable: true })
  @JoinColumn({ name: 'assetId' })
  Asset?: Asset;
}
