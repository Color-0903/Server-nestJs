import { Column, DeepPartial, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Product } from './products.entity';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';

@Entity('color')
export class Color extends AbstractEntity {
  constructor(input?: DeepPartial<Color>) {
    super(input);
  }

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Product, (p) => p.colors, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'product_color' })
  products: Product[];
}
