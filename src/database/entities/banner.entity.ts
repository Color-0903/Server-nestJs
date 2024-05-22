import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity('banner')
export class Banner extends AbstractEntity {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true, length: 36 })
  assetId: string;

  @OneToOne(() => Asset, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;
}
