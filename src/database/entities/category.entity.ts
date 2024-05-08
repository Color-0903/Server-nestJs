import { Column, DeepPartial, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Product } from './products.entity';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';

@Entity('category')
export class Category extends AbstractEntity {
  constructor(input?: DeepPartial<Category>) {
    super(input);
  }

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  
  @ManyToMany(() => Product, (p) => p.categories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'product_category' })
  products: Product[];

  
}
