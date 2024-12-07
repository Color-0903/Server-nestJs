import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderUpdateRelation1715436142904 implements MigrationInterface {
  name = 'AlterOrderUpdateRelation1715436142904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`size\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`size\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`quantity\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`quantity\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`price\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`price\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`quantity\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`quantity\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`size\``);
    await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`size\` varchar(255) NULL`);
  }
}
