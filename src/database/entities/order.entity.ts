import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, DeepPartial, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Order_detail } from './order-detail.entity';

@Entity('order')
export class Order extends AbstractEntity {
  constructor(input?: DeepPartial<Order>) {
    super(input);
  }

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  asset: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true, length: 11 })
  phone: string;

  @Column({ length: 36 })
  userId: string;

  @OneToMany(() => Order_detail, (p) => p.order, {
    cascade: true,
  })
  order_detail: Order_detail[];

  @ManyToOne(() => User, (p) => p.order)
  @JoinColumn({ name: 'userId' })
  user: User;
}
