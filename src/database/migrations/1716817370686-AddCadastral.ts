import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCadastral1716817370686 implements MigrationInterface {
    name = 'AddCadastral1716817370686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cadastral\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NULL, \`phoneCode\` varchar(10) NULL, \`type\` varchar(10) NULL, \`baseCode\` varchar(36) NULL, \`cityCode\` varchar(36) NULL, \`districtCode\` varchar(36) NULL, INDEX \`Cadastral_idx_base_code\` (\`baseCode\`), INDEX \`Cadastral_idx_city_code\` (\`cityCode\`), INDEX \`Cadastral_idx_district_code\` (\`districtCode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`Cadastral_idx_district_code\` ON \`cadastral\``);
        await queryRunner.query(`DROP INDEX \`Cadastral_idx_city_code\` ON \`cadastral\``);
        await queryRunner.query(`DROP INDEX \`Cadastral_idx_base_code\` ON \`cadastral\``);
        await queryRunner.query(`DROP TABLE \`cadastral\``);
    }

}
