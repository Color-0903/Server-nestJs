import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStore1730643032207 implements MigrationInterface {
    name = 'AddStore1730643032207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`store\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NULL, \`description\` text NULL, \`type\` int NOT NULL DEFAULT '1', \`openTime\` json NOT NULL, \`provinceId\` varchar(255) NULL, \`districtId\` varchar(255) NULL, \`wardId\` varchar(255) NULL, \`detail\` text NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`storeId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_3f82dbf41ae837b8aa0a27d29c3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_2dea3b5a3f835981b73f155af83\` FOREIGN KEY (\`provinceId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_2dea3b5a3f835981b73f155af84\` FOREIGN KEY (\`provinceId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_2dea3b5a3f835981b73f155af85\` FOREIGN KEY (\`provinceId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD CONSTRAINT \`FK_225591a8f647c953baf6bf19a7c\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_225591a8f647c953baf6bf19a7c\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_2dea3b5a3f835981b73f155af83\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_2dea3b5a3f835981b73f155af84\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_2dea3b5a3f835981b73f155af85\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_3f82dbf41ae837b8aa0a27d29c3\``);
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`storeId\``);
        await queryRunner.query(`DROP TABLE \`store\``);
    }

}
