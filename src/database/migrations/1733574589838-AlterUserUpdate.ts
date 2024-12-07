import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserUpdate1733574589838 implements MigrationInterface {
  name = 'AlterUserUpdate1733574589838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_2dea3b5a3f835981b73f155af84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_2dea3b5a3f835981b73f155af85\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store\` ADD CONSTRAINT \`FK_2dea3b5a3f835981b73f155af85\` FOREIGN KEY (\`provinceId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`store\` ADD CONSTRAINT \`FK_2dea3b5a3f835981b73f155af84\` FOREIGN KEY (\`provinceId\`) REFERENCES \`cadastral\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
