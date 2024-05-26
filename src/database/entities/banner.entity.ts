import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity('banner')
export class Banner extends AbstractEntity {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column({ nullable: true })
  title: string;

  @Column()
  index: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true, length: 36 })
  assetId: string;

  @OneToOne(() => Asset, {
    nullable: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;
}
