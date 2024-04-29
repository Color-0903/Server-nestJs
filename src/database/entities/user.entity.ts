import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  DeepPartial,
  Unique,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Asset } from './asset.entity';
import { USER_TYPE } from 'src/common/constants/enum';

@Entity('users')
@Unique(['identifier', 'type', 'deletedAt'])
export class User extends AbstractEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }
  @Column()
  @Index('Users_idx_identifier')
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
