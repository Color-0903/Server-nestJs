import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOtp1715779691998 implements MigrationInterface {
    name = 'AddOtp1715779691998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`otp\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`identifier\` varchar(255) NULL, \`code\` varchar(6) NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`expired\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`otp\``);
    }

}
