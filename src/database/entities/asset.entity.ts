import { AssetType } from 'src/common/constants/enum';
import { Column, DeepPartial, Entity, ManyToMany, Tree } from 'typeorm';
import { AbstractEntity } from '../../common/abstract/abstract.entity';
import { Product } from './products.entity';

@Entity()
export class Asset extends AbstractEntity {
  constructor(input?: DeepPartial<Asset>) {
    super(input);
  }

  @Column({ nullable: true }) name: string;

  @Column('varchar') type: string;

  @Column({ nullable: true, select: false }) mimeType: string;

  @Column({ default: 0, select: false }) width: number;

  @Column({ default: 0, select: false }) height: number;

  @Column({ nullable: true, select: false }) fileSize: number;

  @Column({ nullable: true }) source: string;

  // @ManyToMany(() => Product, (p) => p.assets)
  // products: Product[];
}
