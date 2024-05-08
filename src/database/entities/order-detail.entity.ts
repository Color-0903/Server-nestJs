import { Column, DeepPartial, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Asset } from './asset.entity';

@Entity('order_detail')
export class Order_detail extends AbstractEntity {
  constructor(input?: DeepPartial<Order_detail>) {
    super(input);
  }
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  size: string;

  @Column()
  quantity: string;

  @Column()
  price: string;

  @Column({ length: 36 })
  orderId: string;

  @Column({ length: 36 })
  assetId: string;

  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'orderId' })
  order?: Order;

  @ManyToOne(() => Asset, { nullable: true })
  @JoinColumn({ name: 'assetId' })
  Asset?: Asset;
}
