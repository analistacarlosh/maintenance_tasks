import { UserMockData } from '../utils/mockData/mockData';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UserSeed1677439315043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of UserMockData) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(user.password, salt);
      await queryRunner.query(
        `INSERT INTO user ` +
          ` (username, password, role)` +
          ` VALUES ('${user.username}','${encryptedPassword}', '${user.role}') `,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of UserMockData) {
      await queryRunner.query(
        `DELETE FROM user ` + ` WHERE username = '${user.username}' `,
      );
    }
  }
}
