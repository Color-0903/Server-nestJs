import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { NOTIFY_TYPE } from 'src/common/constants/enum';
import { Column, DeepPartial, Entity } from 'typeorm';

@Entity('notify')
export class Notify extends AbstractEntity {
  constructor(input?: DeepPartial<Notify>) {
    super(input);
  }

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true, type: 'enum', enum: NOTIFY_TYPE })
  type: NOTIFY_TYPE;

  @Column({ nullable: true })
  userId: string;
}
