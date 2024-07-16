import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTransactionProductTableMigration1720716836406 implements MigrationInterface {
  name = 'UpdateTransactionProductTableMigration1720716836406'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "variantIndex" integer')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "variantIndex"')
  }

}
