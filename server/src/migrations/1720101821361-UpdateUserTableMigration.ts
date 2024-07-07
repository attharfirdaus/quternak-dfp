import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUserTableMigration1720101821361 implements MigrationInterface {
  name = 'UpdateUserTableMigration1720101821361'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "profilePictureUrl" character varying')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "profilePictureUrl"')
  }

}
