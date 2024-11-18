import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStoreAsset1731421710811 implements MigrationInterface {
    name = 'AddStoreAsset1731421710811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`store_asset\` (\`storeId\` varchar(36) NOT NULL, \`assetId\` varchar(36) NOT NULL, INDEX \`IDX_51065c1f337504258be48ae462\` (\`storeId\`), INDEX \`IDX_3a2330fb5687cfbe499ab0aa29\` (\`assetId\`), PRIMARY KEY (\`storeId\`, \`assetId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`assetId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD UNIQUE INDEX \`IDX_0d7b9943779f419350d4040ac5\` (\`assetId\`)`);
        await queryRunner.query(`DROP INDEX \`store_idx_type\` ON \`store\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`type\` varchar(255) NOT NULL DEFAULT 'COFFE'`);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`phone\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` CHANGE \`evaluate\` \`evaluate\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`store\` CHANGE \`openTime\` \`openTime\` json NULL`);
        await queryRunner.query(`CREATE INDEX \`store_idx_type\` ON \`store\` (\`type\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0d7b9943779f419350d4040ac5\` ON \`store\` (\`assetId\`)`);
        await queryRunner.query(`ALTER TABLE \`store_asset\` ADD CONSTRAINT \`FK_51065c1f337504258be48ae4629\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`store_asset\` ADD CONSTRAINT \`FK_3a2330fb5687cfbe499ab0aa29c\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_asset\` DROP FOREIGN KEY \`FK_3a2330fb5687cfbe499ab0aa29c\``);
        await queryRunner.query(`ALTER TABLE \`store_asset\` DROP FOREIGN KEY \`FK_51065c1f337504258be48ae4629\``);
        await queryRunner.query(`DROP INDEX \`REL_0d7b9943779f419350d4040ac5\` ON \`store\``);
        await queryRunner.query(`DROP INDEX \`store_idx_type\` ON \`store\``);
        await queryRunner.query(`ALTER TABLE \`store\` CHANGE \`openTime\` \`openTime\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` CHANGE \`evaluate\` \`evaluate\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`type\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`CREATE INDEX \`store_idx_type\` ON \`store\` (\`type\`)`);
        await queryRunner.query(`ALTER TABLE \`store\` DROP INDEX \`IDX_0d7b9943779f419350d4040ac5\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`assetId\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a2330fb5687cfbe499ab0aa29\` ON \`store_asset\``);
        await queryRunner.query(`DROP INDEX \`IDX_51065c1f337504258be48ae462\` ON \`store_asset\``);
        await queryRunner.query(`DROP TABLE \`store_asset\``);
    }

}
