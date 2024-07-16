import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTransactionProductTableMigration1720628524009 implements MigrationInterface {
  name = 'AddTransactionProductTableMigration1720628524009'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "transaction_product" ("id" SERIAL NOT NULL, "transactionProductId" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionId" integer, "productId" integer, CONSTRAINT "PK_1801daeaeaaaef2aeb63ae80a67" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "transaction" ADD "transactionId" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"')
    await queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionId"')
    await queryRunner.query('DROP TABLE "transaction_product"')
  }

}
