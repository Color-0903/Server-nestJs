import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1732196620990 implements MigrationInterface {
  name = 'Test1732196620990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP INDEX \`FK_2dea3b5a3f835981b73f155af85\` ON \`store\``);
    await queryRunner.query(
      `ALTER TABLE \`store\` ADD CONSTRAINT \`FK_6195b1e3927a44e966a8e6a4ce6\` FOREIGN KEY (\`districtId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`store\` ADD CONSTRAINT \`FK_b6b25dd5e311fd10f6af4f84dd0\` FOREIGN KEY (\`wardId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_b6b25dd5e311fd10f6af4f84dd0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_6195b1e3927a44e966a8e6a4ce6\``,
    );
    // await queryRunner.query(`CREATE INDEX \`FK_2dea3b5a3f835981b73f155af85\` ON \`store\` (\`provinceId\`)`);
  }
}
