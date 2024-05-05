import { AssetType } from 'src/common/constants/enum';
import {
  Column,
  DeepPartial,
  Entity,
  ManyToMany,
  Tree
} from 'typeorm';
import { AbstractEntity } from '../../common/abstract/abstract.entity';
import { Product } from './products.entity';

@Entity()
@Tree('materialized-path')
export class Asset extends AbstractEntity {
  constructor(input?: DeepPartial<Asset>) {
    super(input);
  }

  @Column() name: string;

  @Column('varchar') type: AssetType;

  @Column({ nullable: true }) mimeType: string;

  @Column({ default: 0 }) width: number;

  @Column({ default: 0 }) height: number;

  @Column({ nullable: true }) fileSize: number;

  @Column({ nullable: true }) source: string;

  @ManyToMany(() => Product, (p) => p.assets)
  products: Product[];
}
