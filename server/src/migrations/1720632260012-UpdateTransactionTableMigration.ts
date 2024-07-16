import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTransactionTableMigration1720632260012 implements MigrationInterface {
  name = 'UpdateTransactionTableMigration1720632260012'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" ADD "userId" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "userId"')
  }

}
