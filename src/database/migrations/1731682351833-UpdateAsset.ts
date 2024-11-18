import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAsset1731682351833 implements MigrationInterface {
    name = 'UpdateAsset1731682351833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0d7b9943779f419350d4040ac5\` ON \`store\``);
        await queryRunner.query(`ALTER TABLE \`store\` CHANGE \`assetId\` \`assetId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_0d7b9943779f419350d4040ac51\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_0d7b9943779f419350d4040ac51\``);
        await queryRunner.query(`ALTER TABLE \`store\` CHANGE \`assetId\` \`assetId\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0d7b9943779f419350d4040ac5\` ON \`store\` (\`assetId\`)`);
    }

}
