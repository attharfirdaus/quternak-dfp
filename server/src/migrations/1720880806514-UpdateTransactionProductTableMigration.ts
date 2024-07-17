import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTransactionProductTableMigration1720880806514 implements MigrationInterface {
  name = 'UpdateTransactionProductTableMigration1720880806514'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "quantity"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionToken"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "price"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "variantIndex"')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionId" integer')
    await queryRunner.query('ALTER TABLE "transaction" ADD "quantity" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD "price" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD "variantIndex" integer')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "variantIndex"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "price"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "quantity"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionId"')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "variantIndex" integer')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "price" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionToken" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "quantity" integer NOT NULL')
  }

}
