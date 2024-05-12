import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, DeepPartial, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { String } from 'aws-sdk/clients/acm';

@Entity('order_detail')
export class Order_detail extends AbstractEntity {
  constructor(input?: DeepPartial<Order_detail>) {
    super(input);
  }
  @Column({ nullable: true })
  size: String;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true, length: 20 })
  color: string;

  @Column({ nullable: true })
  price: number;

  @Column({ length: 36 })
  orderId: string;

  @ManyToOne(() => Order, {
    nullable: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'orderId' })
  order?: Order;
}
