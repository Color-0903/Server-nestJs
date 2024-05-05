import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714874054387 implements MigrationInterface {
    name = 'Init1714874054387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`asset\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NULL, \`width\` int NOT NULL DEFAULT '0', \`height\` int NOT NULL DEFAULT '0', \`fileSize\` int NULL, \`source\` varchar(255) NULL, \`mpath\` varchar(255) NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`isHidden\` tinyint NOT NULL DEFAULT 0, \`permissions\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`identifier\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL DEFAULT 0, \`passwordHash\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`verified\` tinyint NOT NULL DEFAULT 0, \`assetId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`rolesId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_5d19ca4692b21d67f692bb837d\` (\`rolesId\`), INDEX \`IDX_0d65428bf51c2ce567216427d4\` (\`usersId\`), PRIMARY KEY (\`rolesId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_35a8e04493f7a95e9f46e0e29ee\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_5d19ca4692b21d67f692bb837df\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_0d65428bf51c2ce567216427d46\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_0d65428bf51c2ce567216427d46\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_5d19ca4692b21d67f692bb837df\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_35a8e04493f7a95e9f46e0e29ee\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d65428bf51c2ce567216427d4\` ON \`user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d19ca4692b21d67f692bb837d\` ON \`user_role\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`asset\``);
    }

}
