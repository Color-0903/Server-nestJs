import { AssetType } from 'src/common/constants/enum';
import {
  Column,
  DeepPartial,
  Entity,
  Tree
} from 'typeorm';
import { AbstractEntity } from '../../common/abstract/abstract.entity';

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

  // @Column({ nullable: true }) preview: string;

  // @Column('simple-json', { nullable: true })
  // focalPoint?: { x: number; y: number };

  // @Column({ nullable: true })
  // parentId: number;

  // @TreeChildren()
  // children: Asset[];

  // @TreeParent()
  // parent: Asset;
}
