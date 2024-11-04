import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStoreAddColumn1730725997280 implements MigrationInterface {
    name = 'AlterStoreAddColumn1730725997280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`phone\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`evaluate\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE INDEX \`store_idx_name\` ON \`store\` (\`name\`)`);
        await queryRunner.query(`CREATE INDEX \`store_idx_type\` ON \`store\` (\`type\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`store_idx_type\` ON \`store\``);
        await queryRunner.query(`DROP INDEX \`store_idx_name\` ON \`store\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`evaluate\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`phone\``);
    }

}
