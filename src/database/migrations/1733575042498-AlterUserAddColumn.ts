import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserAddColumn1733575042498 implements MigrationInterface {
  name = 'AlterUserAddColumn1733575042498';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`address\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`address_detail\``);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`authMethod\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`authMethod\``);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`address_detail\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`address\` varchar(255) NULL`);
  }
}
