import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, DeepPartial, Entity } from 'typeorm';

@Entity('otp')
export class Otp extends AbstractEntity {
  constructor(input?: DeepPartial<Otp>) {
    super(input);
  }

  @Column({ nullable: true })
  identifier: string;

  @Column({ length: 6, nullable: true })
  code: string;

  @Column({ default: false })
  used: boolean;

  @Column({ nullable: true })
  expired: Date;
}
