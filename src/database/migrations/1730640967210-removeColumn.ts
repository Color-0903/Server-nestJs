import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumn1730640967210 implements MigrationInterface {
    name = 'RemoveColumn1730640967210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`color\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`color\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`size\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`size\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`asset\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`asset\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`lastModifiedByUserId\``);
        await queryRunner.query(`ALTER TABLE \`otp\` DROP COLUMN \`createdByUserId\``);
        await queryRunner.query(`ALTER TABLE \`otp\` DROP COLUMN \`lastModifiedByUserId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`asset\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`asset\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`size\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`size\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD \`createdByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`lastModifiedByUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`createdByUserId\` varchar(255) NULL`);
    }

}
