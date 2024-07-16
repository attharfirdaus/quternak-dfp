import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTransactionProductTableMigration1720677865457 implements MigrationInterface {
  name = 'UpdateTransactionProductTableMigration1720677865457'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionProductId"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionId"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "customerAddress"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "customerPhoneNumber"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "customerName"')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionToken" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "price" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD "transactionToken" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"')
    await queryRunner.query('ALTER TABLE "transaction_product" ALTER COLUMN "productId" SET NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"')
    await queryRunner.query('ALTER TABLE "transaction_product" ALTER COLUMN "productId" DROP NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionToken"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "price"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionToken"')
    await queryRunner.query('ALTER TABLE "transaction" ADD "customerName" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD "customerPhoneNumber" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD "customerAddress" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction" ADD "transactionId" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionProductId" character varying NOT NULL')
  }

}
