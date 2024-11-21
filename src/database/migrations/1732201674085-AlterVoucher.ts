import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterVoucher1732201674085 implements MigrationInterface {
    name = 'AlterVoucher1732201674085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`used\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`used\``);
    }

}
