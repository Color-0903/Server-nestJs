import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderAddAddressPhone1715486278013 implements MigrationInterface {
  name = 'AlterOrderAddAddressPhone1715486278013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`address\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`phone\` varchar(11) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`phone\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`address\``);
  }
}
