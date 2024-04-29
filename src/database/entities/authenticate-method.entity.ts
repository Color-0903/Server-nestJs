import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Entity, Column, DeepPartial, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('authenticate-method')
export class AuthenticatedMethod extends AbstractEntity {
  constructor(input?: DeepPartial<AuthenticatedMethod>) {
    super(input);
  }

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: true })
  expiredTime: Date;

  @Column({ nullable: true, default: null, length: 36 })
  userId: string;

  @ManyToOne(() => User, (User) => User.id, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
