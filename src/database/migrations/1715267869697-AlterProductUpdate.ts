import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProductUpdate1715267869697 implements MigrationInterface {
    name = 'AlterProductUpdate1715267869697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`asset\` DROP COLUMN \`mpath\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price_in\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price_out\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`sale_off\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sale_off\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price_out\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price_in\``);
        await queryRunner.query(`ALTER TABLE \`asset\` ADD \`mpath\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` float NOT NULL`);
    }

}
