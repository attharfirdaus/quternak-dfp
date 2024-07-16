import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTransactionTableMigration1720624733349 implements MigrationInterface {
  name = 'AddTransactionTableMigration1720624733349'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "status" character varying NOT NULL DEFAULT \'pending\', "customerName" character varying NOT NULL, "customerPhoneNumber" character varying NOT NULL, "customerAddress" character varying NOT NULL, "snapToken" character varying, "snapRedirectUrl" character varying, "paymentMethod" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "transaction"')
  }

}
