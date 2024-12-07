import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderAddTotal1715437432862 implements MigrationInterface {
  name = 'AlterOrderAddTotal1715437432862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`total\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`total\``);
  }
}
