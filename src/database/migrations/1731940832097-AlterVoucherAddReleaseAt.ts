import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterVoucherAddReleaseAt1731940832097 implements MigrationInterface {
    name = 'AlterVoucherAddReleaseAt1731940832097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`releaseAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`qrCode\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`qrCode\``);
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`releaseAt\``);
    }

}
