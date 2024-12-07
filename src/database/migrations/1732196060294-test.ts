import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1732196060294 implements MigrationInterface {
  name = 'Test1732196060294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_asset\` DROP FOREIGN KEY \`FK_5888ac17b317b93378494a10620\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_asset\` ADD CONSTRAINT \`FK_5888ac17b317b93378494a10620\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_asset\` DROP FOREIGN KEY \`FK_5888ac17b317b93378494a10620\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_asset\` ADD CONSTRAINT \`FK_5888ac17b317b93378494a10620\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
