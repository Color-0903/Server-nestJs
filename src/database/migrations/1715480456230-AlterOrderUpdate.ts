import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderUpdate1715480456230 implements MigrationInterface {
  name = 'AlterOrderUpdate1715480456230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
