import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, DeepPartial, Entity, JoinTable, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'user_role' })
  users?: User[];

  @Column('simple-array')
  permissions: string[];
}
