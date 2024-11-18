import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import {
  Column,
  DeepPartial,
  Entity,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Asset } from './asset.entity';
import { Category } from './category.entity';
import { Color } from './color.entity';
import { Size } from './size.entity';

@Entity('product')
export class Product extends AbstractEntity {
  constructor(input?: DeepPartial<Product>) {
    super(input);
  }

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 1 })
  status: boolean;

  @Column({ type: 'float' })
  price_in: number;

  @Column({ type: 'float' })
  price_out: number;

  @Column({ type: 'float' })
  price_view: number;

  @Column({ default: 0 })
  sale_off: number;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  sold: number;

  @Column({ default: false })
  isHidden: boolean;

  @ManyToMany(() => Size, (p) => p.products, {
    onDelete: 'CASCADE',
  })
  sizes: Size[];

  @ManyToMany(() => Category, (p) => p.products, {
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @ManyToMany(() => Color, (p) => p.products, {
    onDelete: 'CASCADE',
  })
  colors: Color[];

  @ManyToMany(() => Asset, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'product_asset' })
  assets: Asset[];
}
