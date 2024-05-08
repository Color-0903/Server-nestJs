import { Column, DeepPartial, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Product } from './products.entity';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';

@Entity('size')
export class Size  extends AbstractEntity {
  constructor(input?: DeepPartial<Size>) {
    super(input);
  }

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  
  @ManyToMany(() => Product, (p) => p.sizes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'product_size' })
  products: Product[];
}
