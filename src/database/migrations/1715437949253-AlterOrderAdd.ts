import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderAdd1715437949253 implements MigrationInterface {
  name = 'AlterOrderAdd1715437949253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`asset\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`note\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`asset\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`color\` varchar(20) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`color\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`asset\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`note\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`description\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`asset\` varchar(255) NULL`);
  }
}
