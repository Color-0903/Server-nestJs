import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699191290415 implements MigrationInterface {
    name = 'Init1699191290415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`isHidden\` tinyint NOT NULL DEFAULT 0, \`code\` varchar(255) NULL, \`permissions\` text NOT NULL, UNIQUE INDEX \`IDX_f6d54f95c31b73fb1bdd8e91d0\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`identifier\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`verified\` tinyint NOT NULL DEFAULT 0, \`lastLogin\` datetime NULL, \`passwordHash\` varchar(255) NOT NULL, INDEX \`Users_idx_identifier\` (\`identifier\`), UNIQUE INDEX \`IDX_469423900eab828faaa72f425c\` (\`identifier\`, \`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`authenticate-method\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`email\` varchar(255) NULL, \`phoneNumber\` varchar(255) NULL, \`otpCode\` varchar(255) NULL, \`isUsed\` tinyint NOT NULL DEFAULT 0, \`expiredTime\` datetime NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`rolesId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_5d19ca4692b21d67f692bb837d\` (\`rolesId\`), INDEX \`IDX_0d65428bf51c2ce567216427d4\` (\`usersId\`), PRIMARY KEY (\`rolesId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`authenticate-method\` ADD CONSTRAINT \`FK_a6a7ededea05383f008e1ecb2db\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_5d19ca4692b21d67f692bb837df\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_0d65428bf51c2ce567216427d46\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_0d65428bf51c2ce567216427d46\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_5d19ca4692b21d67f692bb837df\``);
        await queryRunner.query(`ALTER TABLE \`authenticate-method\` DROP FOREIGN KEY \`FK_a6a7ededea05383f008e1ecb2db\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d65428bf51c2ce567216427d4\` ON \`user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d19ca4692b21d67f692bb837d\` ON \`user_role\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP TABLE \`authenticate-method\``);
        await queryRunner.query(`DROP INDEX \`IDX_469423900eab828faaa72f425c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`Users_idx_identifier\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_f6d54f95c31b73fb1bdd8e91d0\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
