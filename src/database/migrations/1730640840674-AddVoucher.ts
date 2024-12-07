import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVoucher1730640840674 implements MigrationInterface {
  name = 'AddVoucher1730640840674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`voucher\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`description\` text NULL, \`expired\` datetime NULL, \`isEnable\` tinyint NOT NULL DEFAULT 1, \`discount\` int NULL, \`maxDiscount\` int NULL, \`minInvoice\` int NULL, \`quantity\` int NULL DEFAULT '99', \`userId\` varchar(255) NULL, INDEX \`voucher_idx_code\` (\`code\`), UNIQUE INDEX \`IDX_73e3d2a7719851716e94083698\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`voucher\` ADD CONSTRAINT \`FK_80a57d757e0be8225f261c7994f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_80a57d757e0be8225f261c7994f\``,
    );
    await queryRunner.query(`DROP INDEX \`IDX_73e3d2a7719851716e94083698\` ON \`voucher\``);
    await queryRunner.query(`DROP INDEX \`voucher_idx_code\` ON \`voucher\``);
    await queryRunner.query(`DROP TABLE \`voucher\``);
  }
}
