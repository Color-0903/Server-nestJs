import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAssetUpdate1715099149150 implements MigrationInterface {
    name = 'AlterTableAssetUpdate1715099149150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asset\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asset\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
