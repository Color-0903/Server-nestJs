import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, DeepPartial, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('order')
export class Order extends AbstractEntity  {
  constructor(input?: DeepPartial<Order>) {
    super(input);
  }

  @Column()
  status: string;
  
  @Column({ length: 36 })
  userId: string;
  
  @OneToOne(() => User, (p) => p.order)
  @JoinColumn({ name: 'userId' })
  user: User;
}
