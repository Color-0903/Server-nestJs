import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBanner1716691410548 implements MigrationInterface {
  name = 'AddBanner1716691410548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`banner\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NULL, \`index\` int NOT NULL, \`content\` text NULL, \`assetId\` varchar(36) NULL, UNIQUE INDEX \`REL_bb294ebcd39320c4f12d09f754\` (\`assetId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banner\` ADD CONSTRAINT \`FK_bb294ebcd39320c4f12d09f7543\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`banner\` DROP FOREIGN KEY \`FK_bb294ebcd39320c4f12d09f7543\``,
    );
    await queryRunner.query(`DROP INDEX \`REL_bb294ebcd39320c4f12d09f754\` ON \`banner\``);
    await queryRunner.query(`DROP TABLE \`banner\``);
  }
}
