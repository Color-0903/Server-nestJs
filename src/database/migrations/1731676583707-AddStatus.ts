import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatus1731676583707 implements MigrationInterface {
  name = 'AddStatus1731676583707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store\` ADD \`status\` enum ('PENDING', 'ACCEPT', 'BLOCK', 'CLOSE') NULL DEFAULT 'PENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`status\``);
  }
}
