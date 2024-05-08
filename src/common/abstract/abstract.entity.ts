import {
  Column,
  CreateDateColumn,
  DeepPartial,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  protected constructor(input?: DeepPartial<AbstractEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdOnDate: Date;

  @Column({ nullable: true })
  createdByUserId: string;

  @UpdateDateColumn()
  lastModifiedOnDate: Date;

  @Column({ nullable: true })
  lastModifiedByUserId: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
