import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVoucherHistories1733016620105 implements MigrationInterface {
  name = 'AddVoucherHistories1733016620105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`voucher_histories\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`voucherId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`voucher_histories\` ADD CONSTRAINT \`FK_a07f64a66a4efc20e8305994eaa\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`voucher_histories\` DROP FOREIGN KEY \`FK_a07f64a66a4efc20e8305994eaa\``,
    );
    await queryRunner.query(`DROP TABLE \`voucher_histories\``);
  }
}
