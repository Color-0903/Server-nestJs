import { MigrationInterface, QueryRunner } from 'typeorm';

export class Revert1732197382819 implements MigrationInterface {
  name = 'Revert1732197382819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`userId\` varchar(255) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`voucher\` ADD CONSTRAINT \`FK_80a57d757e0be8225f261c7994f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_80a57d757e0be8225f261c7994f\``,
    );
    await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`userId\``);
  }
}
