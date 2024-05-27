import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cadastral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, length: 10 })
  phoneCode: string;

  @Column({ nullable: true, length: 10 })
  @Index('Cadastral_idx_type')
  type: string;

  @Column({ nullable: true, length: 36 })
  @Index('Cadastral_idx_base_code')
  baseCode: string;

  @Column({ nullable: true, length: 36 })
  @Index('Cadastral_idx_city_code')
  cityCode: string;

  @Column({ nullable: true, length: 36 })
  @Index('Cadastral_idx_district_code')
  districtCode: string;
}
