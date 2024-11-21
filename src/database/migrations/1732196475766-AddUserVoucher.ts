import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserVoucher1732196475766 implements MigrationInterface {
    name = 'AddUserVoucher1732196475766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_80a57d757e0be8225f261c7994f\``);
        await queryRunner.query(`CREATE TABLE \`user_voucher\` (\`usersId\` varchar(36) NOT NULL, \`voucherId\` varchar(36) NOT NULL, INDEX \`IDX_d55a38d58d564e0020f132652f\` (\`usersId\`), INDEX \`IDX_2c5a646ceaec5f623dcc50099e\` (\`voucherId\`), PRIMARY KEY (\`usersId\`, \`voucherId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user_voucher\` ADD CONSTRAINT \`FK_d55a38d58d564e0020f132652f9\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_voucher\` ADD CONSTRAINT \`FK_2c5a646ceaec5f623dcc50099ee\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_voucher\` DROP FOREIGN KEY \`FK_2c5a646ceaec5f623dcc50099ee\``);
        await queryRunner.query(`ALTER TABLE \`user_voucher\` DROP FOREIGN KEY \`FK_d55a38d58d564e0020f132652f9\``);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_2c5a646ceaec5f623dcc50099e\` ON \`user_voucher\``);
        await queryRunner.query(`DROP INDEX \`IDX_d55a38d58d564e0020f132652f\` ON \`user_voucher\``);
        await queryRunner.query(`DROP TABLE \`user_voucher\``);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD CONSTRAINT \`FK_80a57d757e0be8225f261c7994f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
