import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1677330185437 implements MigrationInterface {
  name = 'migration1677330185437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD \`title\` varchar(200) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`title\``);
  }
}
