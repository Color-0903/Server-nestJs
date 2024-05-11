import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderAdd1715439268049 implements MigrationInterface {
    name = 'AlterOrderAdd1715439268049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`size\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD \`size\` int NULL`);
    }

}
