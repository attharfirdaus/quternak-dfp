import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddProductTableMigration1719929975279 implements MigrationInterface {
  name = 'AddProductTableMigration1719929975279'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" text NOT NULL, "variant" text, "type" character varying, "description" character varying NOT NULL, "location" character varying NOT NULL, "pictureUrl" text, "status" character varying NOT NULL DEFAULT \'not sold\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"')
    await queryRunner.query('DROP TABLE "product"')
  }

}
