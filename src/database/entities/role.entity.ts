import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Entity, Column, BeforeInsert, ManyToMany, JoinTable, DeepPartial } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  constructor(input?: DeepPartial<Role>) {
    super(input);
  }
  @Column()
  name: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ nullable: true, unique: true })
  code?: string;

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'user_role' })
  users?: User[];

  @Column('simple-array')
  permissions: string[];
}
