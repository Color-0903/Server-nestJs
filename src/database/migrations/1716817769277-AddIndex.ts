import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1716817769277 implements MigrationInterface {
    name = 'AddIndex1716817769277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`Cadastral_idx_type\` ON \`cadastral\` (\`type\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`Cadastral_idx_type\` ON \`cadastral\``);
    }

}
